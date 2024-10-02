'use client';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useMutationState } from '@/hooks/useMutationState';
import { ConvexError } from 'convex/values';
import { Check, User, X } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

type Props = {
  id: Id<'requests'>;
  imageUrl: string;
  username: string;
  email: string;
}

function checkNullWords(input: string): string {
  return input.replace(/\bnull\b/g, '').trim().replace(/\s+/g, ' ');
}

const Request = ({ id, imageUrl, username, email }: Props) => {
  const formattedUsername = checkNullWords(username);
  const { mutate: acceptRequest, pending: acceptPending } = useMutationState(api.request.accept)
  const { mutate: denyRequest, pending: denyPending } = useMutationState(api.request.deny)

  const handleAccepted = async () => {
    await acceptRequest({ id })
      .then(() => {
        toast.success('Friend request accepted')
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError
          ? error.data
          : "Unexpected error occurred")
      });
  }

  const handleDenied = async () => {
    await denyRequest({ id })
      .then(() => {
        toast.success('Friend request denied');
      })
      .catch((error) => {
        toast.error(error instanceof ConvexError
          ? error.data
          : "Unexpected error occurred")
      });
  }
  return (
    <Card className='w-full p-2 flex flex-row items-center justify-between gap-2'>
      <div className='flex items-center gap-4 truncate'>
        <Avatar>
          <AvatarImage src={imageUrl} />
          <AvatarFallback>
            <User />
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col truncate">
          <h4 className="truncate">
            {formattedUsername}
          </h4>
          <p className="text-xs text-muted-foreground truncate">
            {email}
          </p>
        </div>

      </div>
      <div className='flex items-center gap-2'>
        <Button
          size={'icon'}
          onClick={handleAccepted}
          disabled={denyPending || acceptPending}
        >
          <Check />
        </Button>
        <Button
          size={'icon'}
          variant={'destructive'}
          onClick={handleDenied}
          disabled={denyPending || acceptPending}
        >
          <X className='h-5 w-5' />
        </Button>
      </div>
    </Card>
  )
}

export default Request