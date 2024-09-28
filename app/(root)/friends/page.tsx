import ConversationFallback from '@/components/layout/conversation/ConversationFallback'
import ItemList from '@/components/layout/item-list/ItemList'
import React from 'react'

type Props = {}

const FriendsPage = (props: Props) => {
  return (
    <>
      <ItemList title={'Friends'}>
        Friends
      </ItemList>
      <ConversationFallback />
    </>
  )
}

export default FriendsPage