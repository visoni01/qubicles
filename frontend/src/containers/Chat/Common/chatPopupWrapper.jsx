import React from 'react'
import PropTypes from 'prop-types'
import ChatPopup from './chatPopup'
import '../styles.scss'

const ChatPopupWrapper = ({ chats }) => (
  <div className='chat-popup-root'>
    {chats && chats.map((chat) => (
      <ChatPopup key={ chat.conversationId } chat={ chat } />
    ))}
  </div>
)

ChatPopupWrapper.propTypes = {
  chats: PropTypes.arrayOf(PropTypes.shape({
    conversationId: PropTypes.number,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    isGroup: PropTypes.bool,
  })).isRequired,
}

export default ChatPopupWrapper
