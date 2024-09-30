import ConversationFallback from '@/components/layout/conversation/ConversationFallback'
import AddFriendDialog from '@/components/layout/friend/AddFriendDialog'
import ItemList from '@/components/layout/item-list/ItemList'
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title={'Friends'} action={<AddFriendDialog />}>
        Friends
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage