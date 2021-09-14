/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import ChatView from './chatView'
import ChatControls from './chatControls'
import { chatDataRequestStart } from '../../../redux-saga/redux/chat'
import '../styles.scss'

const MiddleCard = ({
  conversationId, messageText, setMessageText, imageUrl, setImageUrl,
}) => {
  const { conversations, currentChatId } = useSelector((state) => state.chatData)
  const dispatch = useDispatch()

  const currentConversation = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
  const conversationData = currentConversation?.data

  useEffect(() => {
    if (currentChatId && !conversationData) {
      dispatch(chatDataRequestStart({
        requestType: 'FETCH',
        dataType: 'current-chat',
        conversationId,
      }))
    }
  }, [ dispatch, conversationId, conversationData, currentChatId ])

  return (
    <Box className='custom-box no-padding chat-section'>

      {/* Chat Body */}
      <div className='chat-section-body padding-20'>
        <ChatView
          conversationId={ conversationData?.conversationId }
          chats={ (conversationData?.chatData?.chats) || [] }
          more={ conversationData?.chatData?.more }
          offset={ conversationData?.chatData?.offset }
          isLoading={ currentConversation?.isLoading }
        />
      </div>

      {/* Chat Controls */}
      {conversationData?.isRemoved
        ? (
          <p className='para text-center removed-message'>
            You can't send messages to this group because you're no longer a participant.
          </p>
        )
        : (
          <div className='mb-5'>
            <Divider className='divider is-fullwidth no-margin-top' />
            <ChatControls
              conversationId={ conversationData?.conversationId }
              messageText={ messageText }
              setMessageText={ setMessageText }
              imageUrl={ imageUrl }
              setImageUrl={ setImageUrl }
            />
          </div>
        )}
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
