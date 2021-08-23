import React from 'react'
import { useSelector } from 'react-redux'
import ChatPopup from './chatPopup'
import '../styles.scss'

const ChatPopupWrapper = () => {
  const { conversations, chatPopupIds } = useSelector((state) => state.chatData)

  const openedPopups = conversations && conversations.filter((item) => chatPopupIds.includes(item.data.conversationId))

  return (
    <div className='chat-popup-root'>
      {openedPopups && openedPopups.map((item) => (
        <ChatPopup key={ item.data.conversationId } conversationData={ item.data } />
      ))}
    </div>
  )
}

export default ChatPopupWrapper
