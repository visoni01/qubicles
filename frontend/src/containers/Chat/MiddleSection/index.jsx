import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import ChatView from './chatView'
import ChatControls from './chatControls'
import { chatDataRequestStart } from '../../../redux-saga/redux/chat'
import '../styles.scss'

const MiddleCard = ({
  conversationId, messageText, setMessageText, imageUrl, setImageUrl,
}) => {
  const { conversations, currentChatId } = useSelector((state) => state.chatData)
  const { chatsList } = useSelector((state) => state.allChats)
  const dispatch = useDispatch()

  const chatData = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
  const chat = chatData?.data
  const currentChat = chat && _.find(chatsList, { id: chat.conversationId })

  useEffect(() => {
    if (currentChatId && !chat) {
      dispatch(chatDataRequestStart({
        requestType: 'FETCH',
        dataType: 'current-chat',
        conversationId,
      }))
    }
  }, [ dispatch, conversationId, chat, currentChatId ])

  return (
    <Box className='custom-box no-padding chat-section'>

      {/* Chat Body */}
      <div className='chat-section-body padding-20'>
        <ChatView
          chats={ chat?.chats || [] }
          conversationId={ chat?.conversationId }
          allRead={ currentChat && currentChat.allRead }
        />
      </div>

      {/* Chat Controls */}
      <div className='mb-5'>
        <Divider className='divider is-fullwidth no-margin-top' />
        <ChatControls
          conversationId={ chat && chat.conversationId }
          messageText={ messageText }
          setMessageText={ setMessageText }
          imageUrl={ imageUrl }
          setImageUrl={ setImageUrl }
        />
      </div>
    </Box>
  )
}

MiddleCard.defaultProps = {
  conversationId: null,
  messageText: '',
  imageUrl: '',
}

MiddleCard.propTypes = {
  conversationId: PropTypes.number,
  messageText: PropTypes.string,
  imageUrl: PropTypes.string,
  setMessageText: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
}

export default MiddleCard
