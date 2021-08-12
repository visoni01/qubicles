import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ChatView from './chatView'
import '../styles.scss'
import ChatControls from './chatControls'
import { currentChatRequestStart, resetCurrentChatReducer } from '../../../redux-saga/redux/chat'

const MiddleCard = ({ conversationId }) => {
  const { chat } = useSelector((state) => state.currentChat)
  const { chatsList } = useSelector((state) => state.allChats)
  const dispatch = useDispatch()
  const currentChat = _.find(chatsList, { id: chat.conversationId })

  useEffect(() => {
    if (conversationId) {
      dispatch(currentChatRequestStart({
        requestType: 'FETCH',
        dataType: 'current-chat',
        conversationId,
      }))
    }
  }, [ conversationId, dispatch ])

  useEffect(() => () => dispatch(resetCurrentChatReducer()), [ dispatch ])

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
        />
      </div>
    </Box>
  )
}

MiddleCard.defaultProps = {
  conversationId: null,
}

MiddleCard.propTypes = {
  conversationId: PropTypes.number,
}

export default MiddleCard
