import React, { useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import _ from 'lodash'
import PropTypes from 'prop-types'
import ChatView from './chatView'
import ChatControls from './chatControls'
import {
  currentChatRequestStart, resetCurrentChatReducer, updateAllChats, updateCurrentChat,
} from '../../../redux-saga/redux/chat'
import '../styles.scss'

const MiddleCard = ({ conversationId }) => {
  const { chat } = useSelector((state) => state.currentChat)
  const { chatsList } = useSelector((state) => state.allChats)
  const dispatch = useDispatch()
  const currentChat = _.find(chatsList, { id: chat.conversationId })

  useEffect(() => () => dispatch(resetCurrentChatReducer()), [ dispatch ])

  const handleSend = useCallback(({ newMessage }) => {
    dispatch(updateCurrentChat({
      dataType: 'new-message',
      newMessage,
    }))

    dispatch(updateAllChats({
      dataType: 'new-message',
      latestMessage: newMessage.text,
      time: Date.now(),
      conversationId,
    }))

    if (currentChat && !currentChat.allRead) {
      dispatch(currentChatRequestStart({
        requestType: 'UPDATE',
        dataType: 'mark-as-read',
        conversationId,
      }))
    }
  }, [ dispatch, conversationId, currentChat ])

  return (
    <Box className='custom-box no-padding chat-section'>

      {/* Chat Body */}
      <div className='chat-section-body padding-20'>
        <ChatView
          chats={ (chat && chat.data) || [] }
          conversationId={ chat && chat.conversationId }
          allRead={ currentChat && currentChat.allRead }
        />
      </div>

      {/* Chat Controls */}
      <div className='mb-5'>
        <Divider className='divider is-fullwidth no-margin-top' />
        <ChatControls
          conversationId={ chat && chat.conversationId }
          handleSend={ handleSend }
        />
      </div>
    </Box>
  )
}

export default MiddleCard

MiddleCard.defaultProps = {
  conversationId: null,
}

MiddleCard.propTypes = {
  conversationId: PropTypes.number,
}
