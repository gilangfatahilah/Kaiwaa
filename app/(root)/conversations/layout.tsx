'use client'

import DMConversationItem from '@/components/layout/conversation/DMConversationItem'
import ItemList from '@/components/layout/item-list/ItemList'
import { api } from '@/convex/_generated/api'
import { useQuery } from 'convex/react'
import { Loader2 } from 'lucide-react'
import React from 'react'

type Props = React.PropsWithChildren<{}>

const ConversationsLayout = ({ children }: Props) => {
  const conversations = useQuery(api.conversations.get);

  return (
    <>
      <ItemList title='Conversations'>
        {
          conversations
            ? !conversations.length
              ? (
                <p className='w-full h-full flex items-center justify-center'>
                  No conversations found
                </p>
              )
              : (
                conversations.map((conversation) => {
                  return conversation.conversation.isGroup
                    ? null
                    : (
                      <DMConversationItem
                        key={conversation.conversation._id}
                        id={conversation.conversation._id}
                        username={conversation.otherMember?.username ?? ""}
                        imageUrl={conversation.otherMember?.imageUrl ?? ""}
                      />
                    )
                })
              )
            : (<Loader2 className='w-8 h-8 animate-spin duration-500' />)
        }
        Conversations
      </ItemList>
      {children}
    </>
  )
}

export default ConversationsLayout