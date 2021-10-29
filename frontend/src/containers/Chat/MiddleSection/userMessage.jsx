/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Avatar, Button, IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faExclamation } from '@fortawesome/free-solid-svg-icons'
import { formatConversationRoomId, formatDate } from '../../../utils/common'
import ImagePreview from '../../../components/CommonModal/imagePreview'
import ProfilePreview from '../../../components/Chat/profilePreview'
import { updateAllChats, updateConversations } from '../../../redux-saga/redux/chat'
import { groupMembersPropTypes } from '../propTypes'
import WebSocket from '../../../socket'
import { REQUEST_TYPES } from '../../../utils/constants'
import {
  CANCEL_MESSAGE, NEW_MESSAGE, REMOVE_MESSAGE, UPDATE_ERROR_FLAG,
} from '../../../redux-saga/redux/constants'

const UserMessage = ({
  conversationId, messageId, senderId, clientId, message, profilePic, senderName, imageUrl, sentAt, error,
  candidatesInfo,
}) => {
  const [ openImagePreview, setOpenImagePreview ] = useState(false)
  const [ openProfilePreview, setOpenProfilePreview ] = useState(false)
  const [ isSelfMessage, setIsSelfMessage ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)

  const { userDetails } = useSelector((state) => state.login)
  const { conversations, currentChatId } = useSelector((state) => state.chatData)

  const dispatch = useDispatch()

  const handleOpen = useCallback((event, self) => {
    setOpenProfilePreview(true)
    setAnchorEl(event.currentTarget)
    setIsSelfMessage(!!self)
  }, [])

  const handleClose = useCallback(() => {
    setOpenProfilePreview(false)
    setAnchorEl(null)
  }, [])

  const handleRetry = useCallback(() => {
    const currentConversation = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
    const chats = currentConversation?.data?.chatData?.chats
    const latestMessage = chats?.length && chats[ chats.length - 1 ]
    const newSentAtTime = Date.now()

    dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: UPDATE_ERROR_FLAG,
      conversationId,
      messageId,
      error: false,
      sentAt: newSentAtTime,
    }))

    dispatch(updateAllChats({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: UPDATE_ERROR_FLAG,
      conversationId,
      error: false,
    }))

    WebSocket.sendMessage({
      to: formatConversationRoomId(conversationId),
      from: senderId,
      messages: [ {
        messageId,
        senderId,
        profilePic,
        senderName,
        text: message,
        imageUrl,
        isNotification: false,
        sentAt: newSentAtTime,
        isRead: false,
        error: false,
      } ],
      dataType: NEW_MESSAGE,
      payload: {
        userIds: candidatesInfo?.map((user) => user.id)?.filter((id) => id !== senderId),
        isLatestMessage: _.isEqual(latestMessage?.messageId, messageId),
        isLatestMessageError: latestMessage?.error,
      },
    })
  }, [ dispatch, conversationId, messageId, senderId, message, profilePic, senderName, imageUrl, candidatesInfo,
    conversations, currentChatId,
  ])

  const handleCancel = useCallback(() => {
    const currentConversation = conversations.find((conversation) => conversation.data.conversationId === currentChatId)
    const chats = currentConversation?.data?.chatData?.chats
    const latestConversationMessage = chats?.length && chats[ chats.length - 1 ]
    const newLatestConversationMessage = chats?.length && chats.length > 1 && chats[ chats.length - 2 ]

    dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: REMOVE_MESSAGE,
      conversationId,
      messageId,
    }))

    if (_.isEqual(messageId, latestConversationMessage?.messageId)) {
      dispatch(updateAllChats({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: CANCEL_MESSAGE,
        conversationId,
        latestMessage: newLatestConversationMessage?.text || '',
        isImage: !!newLatestConversationMessage?.imageUrl,
        isNotification: !!newLatestConversationMessage?.isNotification,
        dateTime: newLatestConversationMessage?.sentAt || Date.now(),
        error: !!newLatestConversationMessage.error,
      }))
    }
  }, [ dispatch, conversationId, messageId, conversations, currentChatId ])

  return (
    <>
      <div
        className={ `is-flex align-items-start
          ${ userDetails && _.isEqual(senderId, userDetails.user_id) && 'is-end' }` }
      >
        {/* Profile Picture for Other User Message */}
        {(userDetails && _.isEqual(senderId, userDetails.user_id)) || (
          <IconButton
            className='no-padding'
            onClick={ handleOpen }
          >
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
          </IconButton>
        )}

        {/* Message Body */}
        <div className='ml-15 mr-15 mb-15 text-message'>
          <div className='is-flex'>
            {error && <FontAwesomeIcon className='custom-fa-icon sz-sm error-symbol' icon={ faExclamation } />}

            <div
              className={ `${ _.isEmpty(message) ? 'image-body' : 'text-message-body' }
                ${ userDetails && _.isEqual(senderId, userDetails.user_id)
                ? `self-message ${ error ? '' : 'ml-auto' }` : 'other-user-message' }
                ${ error ? 'opacity-5' : '' }` }
            >
              {imageUrl && (
                // eslint-disable-next-line jsx-a11y/no-noninteractive-element-interactions, jsx-a11y/click-events-have-key-events
                <img
                  alt={ message }
                  src={ imageUrl }
                  onClick={ () => setOpenImagePreview(true) }
                />
              )}
              <p className='para'>{ message }</p>
            </div>
          </div>

          <p
            className={ `para light mt-5
              ${ (userDetails && _.isEqual(senderId, userDetails.user_id)) && 'text-align-end' }
              ${ error ? 'opacity-5' : '' }` }
          >
            { sentAt && formatDate(sentAt, 'hh:mm a') }
          </p>

          {/* Retry and Cancel Buttons */}
          {error && userDetails && _.isEqual(senderId, userDetails.user_id) && (
            <div className='is-flex is-between message-buttons'>
              <Button
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
                onClick={ handleRetry }
              >
                Retry
              </Button>
              <Button
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
                onClick={ handleCancel }
              >
                Cancel
              </Button>
            </div>
          )}
        </div>

        {/* Profile Picture for Self message */}
        {userDetails && _.isEqual(senderId, userDetails.user_id) && (
          <IconButton
            className={ `no-padding ${ error ? 'opacity-5' : '' }` }
            onClick={ (e) => handleOpen(e, true) }
          >
            <Avatar
              src={ profilePic }
              className='profile-picture'
            />
          </IconButton>
        )}
      </div>

      {openImagePreview && (
        <ImagePreview
          open={ openImagePreview }
          handleClose={ () => setOpenImagePreview(false) }
          imageUrl={ imageUrl }
        />
      )}

      {openProfilePreview && (
        <ProfilePreview
          open={ openProfilePreview }
          anchorEl={ anchorEl }
          handleClose={ handleClose }
          userId={ senderId }
          clientId={ clientId }
          profilePic={ profilePic }
          name={ senderName }
          selfMessage={ isSelfMessage }
        />
      )}
    </>
  )
}

UserMessage.defaultProps = {
  profilePic: '',
  clientId: null,
  imageUrl: '',
  error: false,
}

UserMessage.propTypes = {
  conversationId: PropTypes.number.isRequired,
  messageId: PropTypes.number.isRequired,
  senderId: PropTypes.number.isRequired,
  clientId: PropTypes.number,
  message: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  senderName: PropTypes.string.isRequired,
  imageUrl: PropTypes.string,
  sentAt: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]).isRequired,
  error: PropTypes.bool,
  candidatesInfo: groupMembersPropTypes.isRequired,
}

export default UserMessage
