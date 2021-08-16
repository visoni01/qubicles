import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import {
  Avatar, Card, CardContent, CardHeader, IconButton, Collapse,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faMinus } from '@fortawesome/free-solid-svg-icons'
import ChatView from '../MiddleSection/chatView'
import ChatControls from '../MiddleSection/chatControls'
import { chatPopupsRequestStart, updateChatPopups } from '../../../redux-saga/redux/chat'
import { MaximizeIcon } from '../../../assets/images/chat'

const ChatPopup = ({ conversationData }) => {
  const [ popupOpen, setPopupOpen ] = useState(false)
  const dispatch = useDispatch()

  const togglePopup = useCallback(() => {
    setPopupOpen((state) => !state)
  }, [])

  const closePopup = useCallback((event) => {
    event.stopPropagation()
    dispatch(updateChatPopups({
      requestType: 'DELETE',
      conversationId: conversationData && conversationData.conversationId,
    }))
  }, [ dispatch, conversationData ])

  const handleSend = useCallback(({ newMessage }) => {
    dispatch(updateChatPopups({
      requestType: 'UPDATE',
      dataType: 'new-message',
      newMessage,
      conversationId: conversationData && conversationData.conversationId,
    }))

    dispatch(chatPopupsRequestStart({
      requestType: 'UPDATE',
      dataType: 'mark-as-read',
      conversationId: conversationData && conversationData.conversationId,
    }))
  }, [ dispatch, conversationData ])

  return (
    <Card className='chat-popup-card' variant='outlined'>
      <CardHeader
        onClick={ togglePopup }
        className='header'
        classes={ {
          action: 'header-action',
          title: 'header-title',
        } }
        avatar={
          <Avatar src={ conversationData.profilePic } alt={ conversationData.name } className='header-avatar' />
        }
        title={ conversationData.name }
        titleTypographyProps={ { variant: 'h6' } }
        action={ (
          <>
            <IconButton>
              {popupOpen ? (
                <FontAwesomeIcon
                  className='custom-fa-icon white'
                  icon={ faMinus }
                />
              ) : <MaximizeIcon className='custom-svg-icon color-white' />}
            </IconButton>
            <IconButton onClick={ closePopup }>
              <FontAwesomeIcon
                className='custom-fa-icon white'
                icon={ faTimes }

              />
            </IconButton>
          </>
        ) }
      />

      <Collapse in={ popupOpen }>
        <CardContent className='message-section no-padding'>
          <div className='is-fullheight chat-section'>
            {/* Chat Body */}
            <div className='chat-section-body padding-10'>
              <ChatView
                chats={ (conversationData && conversationData.chats) || [] }
              />
            </div>

            {/* Chat Controls */}
            <ChatControls
              conversationId={ conversationData && conversationData.conversationId }
              handleSend={ handleSend }
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

ChatPopup.propTypes = {
  conversationData: PropTypes.shape({
    conversationId: PropTypes.number,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    isGroup: PropTypes.bool,
    chats: PropTypes.arrayOf(PropTypes.shape({
      msgId: PropTypes.number,
      candidateId: PropTypes.number,
      profilePic: PropTypes.string,
      isNotification: PropTypes.bool,
      imageUrl: PropTypes.string,
      text: PropTypes.string,
      sentAt: PropTypes.string,
      isRead: PropTypes.bool,
    })),
  }).isRequired,
}

export default ChatPopup
