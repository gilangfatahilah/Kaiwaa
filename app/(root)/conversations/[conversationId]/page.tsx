'use client';

import ConversationBody from '@/components/layout/conversation/Body';
import ChatInput from '@/components/layout/conversation/ChatInput';
import ConversationContainer from '@/components/layout/conversation/ConversationContainer'
import LeaveGroupDialog from '@/components/layout/conversation/dialogs/LeaveGroupDialog';
import RemoveFriendDialog from '@/components/layout/conversation/dialogs/RemoveFriendDialog';
import RemoveGroupDialog from '@/components/layout/conversation/dialogs/RemoveGroupDialog';
import Header from '@/components/layout/conversation/Header';
import { api } from '@/convex/_generated/api';
import { Id } from '@/convex/_generated/dataModel'
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React from 'react'

type Props = {
  params: {
    conversationId: Id<'conversations'>
  }
}

const ConversationPage = ({ params: { conversationId } }: Props) => {
  const conversation = useQuery(api.conversation.get, { id: conversationId })
  const isGroup = conversation?.isGroup;

  const [removeFriendDialogOpen, setRemoveFriendDialogOpen] = React.useState<boolean>(false);
  const [removeGroupDialogOpen, setRemoveGroupDialogOpen] = React.useState<boolean>(false);
  const [leaveGroupDialogOpen, setLeaveGroupDialogOpen] = React.useState<boolean>(false);
  const [callType, setCallType] = React.useState<'audio' | 'video' | null>(null);

  return (
    conversation === undefined
      ? (
        <div className='w-full h-full flex items-center justify-center'>
          <Loader2 className='w-8 h-8 animate-spin duration-500' />
        </div>
      )
      : conversation === null
        ? (
          <p className='w-full h-full flex items-center justify-center'>
            Conversation not found
          </p>
        )
        : (
          <ConversationContainer>
            <RemoveFriendDialog
              conversationId={conversationId}
              open={removeFriendDialogOpen}
              setOpen={setRemoveFriendDialogOpen}
            />

            <RemoveGroupDialog
              conversationId={conversationId}
              open={removeGroupDialogOpen}
              setOpen={setRemoveGroupDialogOpen}
            />

            <LeaveGroupDialog
              conversationId={conversationId}
              open={leaveGroupDialogOpen}
              setOpen={setLeaveGroupDialogOpen}
            />

            <Header
              name={
                (isGroup
                  ? conversation.name
                  : conversation.otherMember?.username)
                || ""
              }
              imageUrl={
                isGroup ? undefined : conversation.otherMember?.imageUrl
              }
              options={conversation.isGroup
                ? [
                  {
                    label: 'Leave group',
                    destructive: false,
                    onClick: () => setLeaveGroupDialogOpen(true)
                  },
                  {
                    label: 'Remove group',
                    destructive: true,
                    onClick: () => setRemoveGroupDialogOpen(true)
                  },
                ]
                : [
                  {
                    label: 'Remove friend',
                    destructive: true,
                    onClick: () => setRemoveFriendDialogOpen(true)
                  },
                ]
              }
              setCallType={setCallType}
            />

            <ConversationBody members={
              conversation.isGroup
                ? conversation.otherMembers
                  ? conversation.otherMembers : []
                : conversation.otherMember
                  ? [conversation.otherMember]
                  : []
            }
              callType={callType}
              setCallType={setCallType}
            />
            <ChatInput />
          </ConversationContainer>
        )
  )
}

export default ConversationPage