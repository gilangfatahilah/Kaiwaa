'use client'

import { Button } from '@/components/ui/button'
import { api } from '@/convex/_generated/api'
import { useConversation } from '@/hooks/useConversation'
import { useMutationState } from '@/hooks/useMutationState'
import { useUser } from '@clerk/clerk-react'
import { Loader2 } from 'lucide-react'
import React from 'react'
import { toast } from 'sonner'
import { LiveKitRoom, VideoConference } from '@livekit/components-react';
import '@livekit/components-styles'

type Props = {
  video: boolean
  audio: boolean
  handleDisconnect: () => void
}

const CallRoom = ({ video, audio, handleDisconnect }: Props) => {
  const { user } = useUser();
  const { conversationId } = useConversation();
  const { mutate: createMessage, pending } = useMutationState(api.message.create)
  const [token, setToken] = React.useState<string>('');

  React.useEffect(() => {
    if (!user?.fullName) return;

    (async () => {
      try {
        const res = await fetch(`/api.livekit?room=${conversationId}&username=${user.fullName} (${Math.floor(Math.random() * 2000)})`);

        const data = await res.json();
        setToken(data.token)
      } catch (error) {
        toast.error('Could not join the call')
      }
    })
  }, [user?.fullName, conversationId]);

  if (token === '') {
    return (
      <div className='w-full h-full flex flex-col justify-center items-center'>
        <Loader2
          className='animate-spin h-16 w-16 text-foreground'
        />

        <p className='text-sm text-foreground'>
          Joining call...
        </p>

        <Button className='mt-4' variant={'destructive'} onClick={handleDisconnect}>
          Cancel
        </Button>
      </div>
    )
  }

  return (
    <div className='w-full h-full'>
      <LiveKitRoom
        data-lk-theme='default'
        serverUrl={process.env.NEXT_PUBLIC_LIVEKIT_URL}
        token={token}
        connect={true}
        video={video}
        audio={audio}
        onDisconnected={() => handleDisconnect()}
        onConnected={() => {
          createMessage({ conversationId, type: 'call', content: [] })
        }}
      >
        <VideoConference />
      </LiveKitRoom>
    </div>
  )
}

export default CallRoom