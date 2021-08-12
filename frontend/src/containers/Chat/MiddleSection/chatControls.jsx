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
import { currentChatRequestStart, updateCurrentChat } from '../../../redux-saga/redux/chat'

const ChatControls = ({ conversationId }) => {
  const { userDetails } = useSelector((state) => state.login)
  const { settings: clientSettings } = useSelector((state) => state.clientDetails)
  const { settings: agentSettings } = useSelector((state) => state.agentDetails)

  const [ messageText, setMessageText ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const dispatch = useDispatch()

  const handleOnChange = useCallback((event) => {
    setMessageText(event.target.value)
  }, [])

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
  }, [ dispatch ])

  const handleSend = useCallback(() => {
    // eslint-disable-next-line no-unused-vars
    const newMessage = {
      msgId: getUniqueId(),
      candidateId: userDetails && userDetails.user_id,
      profilePic: userDetails && _.isEqual(userDetails.user_code, 'agent')
        ? agentSettings.profilePic
        : clientSettings.profilePic,
      text: messageText,
      imageUrl,
      isNotification: false,
      sentAt: Date.now(),
      isRead: false,
    }

    // TODO Dispatch the action conditionally for currentChat and popupChat
    dispatch(updateCurrentChat({
      dataType: 'new-message',
      newMessage,
    }))

    dispatch(currentChatRequestStart({
      requestType: 'UPDATE',
      dataType: 'mark-as-read',
      conversationId,
    }))

    setMessageText('')
    setImageUrl('')
  }, [ messageText, userDetails, agentSettings, clientSettings, imageUrl, dispatch, conversationId ])

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
        />

        {imageUrl && (
          <div className='image-preview'>
            <img alt='Preview' src={ imageUrl } />
            <IconButton
              className='cross-button'
              onClick={ () => setImageUrl('') }
            >
              <FontAwesomeIcon className='custom-fa-icon dark pointer sz-xl' icon={ faTimesCircle } />
            </IconButton>
          </div>
        )}
      </div>

      <Button
        classes={ {
          root: 'button-primary-small',
          label: 'button-primary-small-label',
        } }
        onClick={ handleSend }
      >
        Send
      </Button>

      <input
        type='file'
        multiple
        id={ conversationId }
        accept={ acceptedImageFormats.join(',') }
        onChange={ handleFileInputChange }
        style={ { display: 'none' } }
      />
    </div>
  )
}

ChatControls.defaultProps = {
  conversationId: null,
}

ChatControls.propTypes = {
  conversationId: PropTypes.number,
}

export default ChatControls
