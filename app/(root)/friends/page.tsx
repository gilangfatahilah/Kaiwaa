'use client';

import ConversationFallback from '@/components/layout/conversation/ConversationFallback'
import AddFriendDialog from '@/components/layout/friend/AddFriendDialog'
import ItemList from '@/components/layout/item-list/ItemList'
import Request from '@/components/layout/friend/Request';
import { api } from '@/convex/_generated/api';
import { useQuery } from 'convex/react';
import { Loader2 } from 'lucide-react';
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  const requests = useQuery(api.requests.get)

  return (
    <>
      <ItemList title={'Friends'} action={<AddFriendDialog />}>
        {
          requests ? (
            !requests.length ? (
              <p className='w-full h-full flex items-center justify-center'>
                No friend requests found
              </p>
            ) : (
              requests.map((r) => {
                return (
                  <Request
                    key={r.request._id}
                    id={r.request._id}
                    imageUrl={r.sender.imageUrl}
                    username={r.sender.username}
                    email={r.sender.email}
                  />
                )
              })
            )
          )
            : (
              <Loader2 className='h-8 w-8 animate-spin duration-500' />
            )
        }
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage