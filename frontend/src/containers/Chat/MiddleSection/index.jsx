import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import ChatView from './chatView'
import '../styles.scss'
import ChatControls from './chatControls'
import { currentChatRequestStart, resetCurrentChatReducer } from '../../../redux-saga/redux/chat'

const MiddleCard = ({ conversationId }) => {
  const { chat } = useSelector((state) => state.currentChat)
  const dispatch = useDispatch()

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
        />
      </div>

      {/* Chat Controls */}
      <div className='mb-5'>
        <Divider className='divider is-fullwidth no-margin-top' />
        <ChatControls />
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
