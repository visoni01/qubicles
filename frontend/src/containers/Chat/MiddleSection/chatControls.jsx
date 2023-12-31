/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button, CircularProgress, debounce, IconButton, TextField,
} from '@material-ui/core'
import { ImageIcon } from '../../../assets/images/common'
import { showErrorMessage } from '../../../redux-saga/redux/utils'
import { formatConversationRoomId, getUniqueId } from '../../../utils/common'
import { acceptedImageFormats, maxImageFileSize } from '../../People/ContactCenter/constants'
import ImagePreview from '../../../components/CommonModal/imagePreview'
import {
  chatDataRequestStart, resetPopupFlags, updateAllChats, updateConversations,
} from '../../../redux-saga/redux/chat'
import WebSocket from '../../../socket'
import Forum from '../../../redux-saga/service/forum'
import { CHAT_ROUTE } from '../../../routes/routesPath'
import { MESSAGES, REQUEST_TYPES, USERS } from '../../../utils/constants'
import { CHANGE_CURRENT_MESSAGE, MARK_AS_READ, NEW_MESSAGE } from '../../../redux-saga/redux/constants'

const ChatControls = ({
  conversationId, messageText, setMessageText, imageUrl, setImageUrl, isLoading, candidatesInfo, isImageUploading,
  messageToBeSent, allRead,
}) => {
  const [ openImagePreview, setOpenImagePreview ] = useState(false)
  const [ isTyping, setIsTyping ] = useState(false)

  const { userDetails } = useSelector((state) => state.login)
  const { settings: clientSettings } = useSelector((state) => state.clientDetails)
  const { settings: agentSettings } = useSelector((state) => state.agentDetails)
  const { chatsList } = useSelector((state) => state.allChats)

  const dispatch = useDispatch()

  const currentChat = _.find(chatsList, { id: conversationId })

  /* eslint-disable camelcase */
  const handleStopTyping = useCallback(debounce(() => {
    const userId = userDetails?.user_id
    setIsTyping(false)
    WebSocket.stopTyping({
      to: formatConversationRoomId(conversationId),
      payload: {
        userIds: candidatesInfo?.filter((user) => user.id !== userId)?.map((user) => user.id.toString()),
        removedUserId: userId,
      },
    })
  }, 1000), [ conversationId, userDetails, candidatesInfo ])

  const handleOnChange = useCallback((event) => {
    setMessageText(event.target.value)

    if (!isTyping) {
      const userId = userDetails?.user_id
      const userIds = candidatesInfo?.filter((user) => user.id !== userId)?.map((user) => user.id.toString())

      if (userIds?.length) {
        setIsTyping(true)
        WebSocket.startTyping({
          to: formatConversationRoomId(conversationId),
          payload: {
            userIds,
            newActiveUser: {
              id: userId,
              name: userDetails?.full_name.split(' ')[0],
            },
          },
        })
      }
    }
  }, [ isTyping, conversationId, candidatesInfo, userDetails, setMessageText ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      if (file.size > maxImageFileSize) {
        dispatch(showErrorMessage({ msg: MESSAGES.INVALID_IMAGE_FILE_SIZE }))
        return
      }

      const imageUrlValue = URL.createObjectURL(file)

      reader.onloadend = () => {
        setImageUrl(imageUrlValue)
      }

      if (event.target.files[ 0 ]) {
        reader.readAsDataURL(file)
      }

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }, [ dispatch, setImageUrl ])

  const sendMessage = useCallback((newImageUrl) => {
    const userId = userDetails?.user_id
    const newMessage = {
      messageId: getUniqueId(),
      senderId: userId,
      profilePic: userDetails && _.isEqual(userDetails.user_code, USERS.AGENT)
        ? agentSettings.profilePic
        : clientSettings.profilePic,
      senderName: userDetails?.full_name,
      text: messageText && messageText.trim(),
      imageUrl: newImageUrl,
      isNotification: false,
      sentAt: Date.now(),
      isRead: true,
    }

    dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: NEW_MESSAGE,
      conversationId,
      newMessage,
    }))

    if (window.location.pathname === CHAT_ROUTE) {
      dispatch(updateAllChats({
        dataType: NEW_MESSAGE,
        conversationId,
        latestMessage: newMessage.text || 'Sent an image',
        isNotification: false,
        dateTime: newMessage.sentAt,
      }))
    } else {
      dispatch(chatDataRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: MARK_AS_READ,
        conversationId,
      }))
    }

    if (window.location.pathname !== CHAT_ROUTE) {
      dispatch(resetPopupFlags({ conversationId }))
    }

    WebSocket.sendMessage({
      to: formatConversationRoomId(conversationId),
      from: userId,
      messages: [ { ...newMessage, isRead: false } ],
      dataType: NEW_MESSAGE,
      payload: {
        userIds: candidatesInfo?.map((user) => user.id)?.filter((id) => id !== userId),
      },
    })

    if (!allRead || (currentChat && !currentChat.allRead)) {
      dispatch(chatDataRequestStart({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: MARK_AS_READ,
        conversationId,
      }))
    }

    setMessageText('')
    setImageUrl('')
  }, [ messageText, userDetails, agentSettings, clientSettings, setImageUrl, setMessageText,
    conversationId, currentChat, dispatch, candidatesInfo, allRead ])

  const handleSendClick = useCallback(() => {
    if (imageUrl) {
      fetch(imageUrl)
        .then((r) => r.blob()).then((file) => {
          dispatch(updateConversations({
            requestType: REQUEST_TYPES.UPDATE,
            dataType: CHANGE_CURRENT_MESSAGE,
            conversationId,
            isImageUploading: true,
            messageToBeSent: {
              messageText,
              imageUrl,
            },
          }))

          const formData = new FormData()
          formData.append('file', file)

          Forum.imageUpload({ data: formData })
            .then((response) => sendMessage(response?.data?.url))
            .catch(() => dispatch(showErrorMessage({ msg: 'Error while uploading an image!' })))
            .finally(() => dispatch(updateConversations({
              requestType: REQUEST_TYPES.UPDATE,
              dataType: CHANGE_CURRENT_MESSAGE,
              conversationId,
              isImageUploading: false,
            })))
        })
        .catch(() => dispatch(showErrorMessage({ msg: 'Something went wrong!' })))
    } else {
      sendMessage()
    }
  }, [ imageUrl, conversationId, messageText, dispatch, sendMessage ])

  return (
    <div className='is-flex is-between align-items-start chat-section-footer'>
      <IconButton
        className='no-padding image-icon'
        onClick={ !isImageUploading ? () => document.getElementById(conversationId).click() : null }
      >
        <ImageIcon />
      </IconButton>

      <div className='is-fullwidth message-field'>
        <TextField
          className='is-fullwidth'
          value={ isImageUploading ? messageToBeSent.messageText : messageText }
          onChange={ handleOnChange }
          onKeyUpCapture={ handleStopTyping }
          placeholder='Write a message...'
          multiline
          margin='dense'
          variant='outlined'
          rowsMax={ 4 }
          disabled={ isLoading }
          InputProps={ {
            endAdornment: (
              <>
                {isImageUploading && (
                  <div className='static-small-loader text-field-loader'>
                    <CircularProgress size={ 15 } />
                  </div>
                )}
              </>
            ),
          } }
        />

        {((isImageUploading && messageToBeSent.imageUrl) || imageUrl) && (
          <div className='image-preview'>
            {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
            <img
              alt='preview'
              src={ isImageUploading ? messageToBeSent.imageUrl : imageUrl }
              onClick={ !isImageUploading ? () => setOpenImagePreview(true) : null }
            />

            {!isImageUploading && (
              <IconButton
                className='cross-button'
                onClick={ () => setImageUrl('') }
              >
                <FontAwesomeIcon className='custom-fa-icon pointer sz-xl' icon={ faTimesCircle } />
              </IconButton>
            )}
          </div>
        )}
      </div>

      <Button
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        disabled={ !((messageText && messageText.trim()) || imageUrl) || isLoading || isImageUploading }
        onClick={ handleSendClick }
      >
        Send
      </Button>

      <input
        type='file'
        id={ conversationId }
        accept={ acceptedImageFormats.join(',') }
        onChange={ handleFileInputChange }
        style={ { display: 'none' } }
        disabled={ isLoading }
      />

      {openImagePreview && (
        <ImagePreview
          open={ openImagePreview }
          handleClose={ () => setOpenImagePreview(false) }
          imageUrl={ imageUrl }
        />
      )}
    </div>
  )
}

ChatControls.defaultProps = {
  conversationId: null,
  messageText: '',
  imageUrl: '',
  isLoading: false,
  allRead: true,
  candidatesInfo: [],
  isImageUploading: false,
  messageToBeSent: null,
}

ChatControls.propTypes = {
  conversationId: PropTypes.number,
  messageText: PropTypes.string,
  imageUrl: PropTypes.string,
  setMessageText: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  allRead: PropTypes.bool,
  candidatesInfo: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number,
  })),
  isImageUploading: PropTypes.bool,
  messageToBeSent: PropTypes.shape({
    messageText: PropTypes.string,
    imageUrl: PropTypes.string,
  }),
}

export default ChatControls
