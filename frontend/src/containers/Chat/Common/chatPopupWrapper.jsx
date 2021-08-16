import React from 'react'
import { useSelector } from 'react-redux'
import ChatPopup from './chatPopup'
import '../styles.scss'

const ChatPopupWrapper = () => {
  const { chatPopups } = useSelector((state) => state.chatPopups)

  return (
    <div className='chat-popup-root'>
      {chatPopups && chatPopups.map((item) => (
        <ChatPopup key={ item.data.conversationId } conversationData={ item.data } />
      ))}
    </div>
  )
}

export default ChatPopupWrapper
