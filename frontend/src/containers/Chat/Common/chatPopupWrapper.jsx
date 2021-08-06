import React from 'react'
import { useSelector } from 'react-redux'
import ChatPopup from './chatPopup'
import '../styles.scss'

const ChatPopupWrapper = () => {
  const { chatPopups } = useSelector((state) => state.currentChat)

  return (
    <div className='chat-popup-root'>
      {chatPopups && chatPopups.map((chat) => (
        <ChatPopup key={ chat.conversationId } chat={ chat } />
      ))}
    </div>
  )
}

export default ChatPopupWrapper
