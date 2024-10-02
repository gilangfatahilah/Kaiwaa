'use client';

import ConversationBody from '@/components/layout/conversation/Body';
import ChatInput from '@/components/layout/conversation/ChatInput';
import ConversationContainer from '@/components/layout/conversation/ConversationContainer'
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
            <Header
              name={
                (isGroup
                  ? conversation.name
                  : conversation.otherMember.username)
                || ""
              }
              imageUrl={
                isGroup ? undefined : conversation.otherMember.imageUrl
              }
            />

            <ConversationBody />
            <ChatInput />
          </ConversationContainer>
        )
  )
}

export default ConversationPage