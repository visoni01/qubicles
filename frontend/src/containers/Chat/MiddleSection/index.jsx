/* eslint-disable complexity */
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Box, Divider } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import ChatView from './chatView'
import ChatControls from './chatControls'
import { chatDataRequestStart } from '../../../redux-saga/redux/chat'
import MiddleSectionChatSkeletons from '../../../components/Chat/Skeletons/middleSectionChatSkeletons'
import '../styles.scss'
import { REQUEST_TYPES } from '../../../utils/constants'
import { CURRENT_CHAT } from '../../../redux-saga/redux/constants'

const MiddleCard = ({
  conversationId, messageText, setMessageText, imageUrl, setImageUrl, isLoading,
}) => {
  const { conversations, currentChatId } = useSelector((state) => state.chatData)
  const { initialFetchDone } = useSelector((state) => state.allChats)

  const dispatch = useDispatch()

  const currentConversation = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
  const conversationData = currentConversation?.data

  useEffect(() => {
    if (currentChatId && !conversationData) {
      dispatch(chatDataRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: CURRENT_CHAT,
        conversationId,
      }))
    }
  }, [ dispatch, conversationId, conversationData, currentChatId ])

  return (
    <Box className='custom-box no-padding chat-section'>

      {/* Chat Body */}
      <div className='chat-section-body pb-10 padding-20'>
        {!initialFetchDone
        || (currentConversation?.isLoading && _.isEqual(currentConversation?.dataType, CURRENT_CHAT))
          ? <MiddleSectionChatSkeletons />
          : (
            <ChatView
              conversationId={ conversationData?.conversationId }
              chats={ conversationData?.chatData?.chats }
              more={ conversationData?.chatData?.more }
              offset={ conversationData?.chatData?.offset }
              candidatesInfo={ conversationData?.candidatesInfo }
              activeUsers={ conversationData?.activeUsers }
              isLoading={ currentConversation?.isLoading }
            />
          )}
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
              isLoading={ isLoading || currentConversation?.isLoading }
              candidatesInfo={ conversationData?.candidatesInfo }
              isImageUploading={ conversationData?.isImageUploading }
              messageToBeSent={ conversationData?.messageToBeSent }
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
  isLoading: true,
}

MiddleCard.propTypes = {
  conversationId: PropTypes.number,
  messageText: PropTypes.string,
  imageUrl: PropTypes.string,
  setMessageText: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default MiddleCard
