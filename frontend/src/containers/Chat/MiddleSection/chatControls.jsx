/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { faTimesCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  Button, IconButton, TextField,
} from '@material-ui/core'
import { ImageIcon } from '../../../assets/images/common'
import { showErrorMessage } from '../../../redux-saga/redux/utils'
import { getUniqueId } from '../../../utils/common'
import { acceptedImageFormats, maxImageFileSize } from '../../People/ContactCenter/constants'
import ImagePreview from '../../../components/CommonModal/imagePreview'
import { chatDataRequestStart, updateAllChats, updateConversations } from '../../../redux-saga/redux/chat'

const ChatControls = ({
  conversationId, messageText, setMessageText, imageUrl, setImageUrl, isLoading,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const { settings: clientSettings } = useSelector((state) => state.clientDetails)
  const { settings: agentSettings } = useSelector((state) => state.agentDetails)
  const { chatsList } = useSelector((state) => state.allChats)

  const currentChat = _.find(chatsList, { id: conversationId })

  const [ openImagePreview, setOpenImagePreview ] = useState(false)

  const dispatch = useDispatch()

  const handleOnChange = useCallback((event) => {
    setMessageText(event.target.value)
  }, [ setMessageText ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      if (file.size > maxImageFileSize) {
        dispatch(showErrorMessage({ msg: 'File size should not be greater than 1 MB!' }))
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

  const handleSendClick = useCallback(() => {
    const newMessage = {
      messageId: getUniqueId(),
      senderId: userDetails && userDetails.user_id,
      profilePic: userDetails && _.isEqual(userDetails.user_code, 'agent')
        ? agentSettings.profilePic
        : clientSettings.profilePic,
      text: messageText && messageText.trim(),
      imageUrl,
      isNotification: false,
      sentAt: Date.now(),
      isRead: true,
    }

    dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'new-message',
      conversationId,
      newMessage,
    }))

    dispatch(updateAllChats({
      dataType: 'new-message',
      latestMessage: newMessage.text || 'Sent an image',
      dateTime: Date.now(),
      conversationId,
    }))

    if (currentChat && !currentChat.allRead) {
      dispatch(chatDataRequestStart({
        requestType: 'UPDATE',
        dataType: 'mark-as-read',
        conversationId,
      }))
    }

    setMessageText('')
    setImageUrl('')
  }, [ messageText, userDetails, agentSettings, clientSettings, imageUrl, setImageUrl, setMessageText,
    conversationId, currentChat, dispatch ])

  return (
    <div className='is-flex is-between align-items-start chat-section-footer'>
      <IconButton
        className='no-padding image-icon'
        onClick={ () => document.getElementById(conversationId).click() }
      >
        <ImageIcon />
      </IconButton>

      <div className='is-fullwidth message-field'>
        <TextField
          className='is-fullwidth'
          value={ messageText }
          onChange={ handleOnChange }
          placeholder='Write a message...'
          multiline
          margin='dense'
          variant='outlined'
          rowsMax={ 4 }
          disabled={ isLoading }
        />

        {imageUrl && (
          <div className='image-preview'>
            <img
              alt='preview'
              src={ imageUrl }
              onClick={ () => setOpenImagePreview(true) }
            />
            <IconButton
              className='cross-button'
              onClick={ () => setImageUrl('') }
            >
              <FontAwesomeIcon className='custom-fa-icon pointer sz-xl' icon={ faTimesCircle } />
            </IconButton>
          </div>
        )}
      </div>

      <Button
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        disabled={ !((messageText && messageText.trim()) || imageUrl) || isLoading }
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
}

ChatControls.propTypes = {
  conversationId: PropTypes.number,
  messageText: PropTypes.string,
  imageUrl: PropTypes.string,
  setMessageText: PropTypes.func.isRequired,
  setImageUrl: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
}

export default ChatControls
