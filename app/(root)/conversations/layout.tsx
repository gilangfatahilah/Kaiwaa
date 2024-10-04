'use client'

import CreateGroupDialog from '@/components/layout/conversation/dialogs/CreateGroupDialog'
import DMConversationItem from '@/components/layout/conversation/DMConversationItem'
import GroupConversationItem from '@/components/layout/conversation/GroupConversationItem'
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
      <ItemList title='Conversations' action={<CreateGroupDialog />}>
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
                    ? (
                      <GroupConversationItem
                        key={conversation.conversation._id}
                        id={conversation.conversation._id}
                        name={conversation.conversation.name ?? "-"}
                        lastMessageContent={conversation.lastMessage?.content}
                        lastMessageSender={conversation.lastMessage?.sender}
                      />
                    )
                    : (
                      <DMConversationItem
                        key={conversation.conversation._id}
                        id={conversation.conversation._id}
                        username={conversation.otherMember?.username ?? ""}
                        imageUrl={conversation.otherMember?.imageUrl ?? ""}
                        lastMessageContent={conversation.lastMessage?.content}
                        lastMessageSender={conversation.lastMessage?.sender}
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