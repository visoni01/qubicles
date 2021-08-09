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
import { updateChatPopups } from '../../../redux-saga/redux/chat'
import { MaximizeIcon } from '../../../assets/images/chat'

const ChatPopup = ({ chat }) => {
  const [ popupOpen, setPopupOpen ] = useState(false)
  const dispatch = useDispatch()

  const togglePopup = useCallback(() => {
    setPopupOpen((state) => !state)
  }, [])

  const closePopup = useCallback((event) => {
    event.stopPropagation()
    dispatch(updateChatPopups({
      dataType: 'DELETE',
      conversationId: chat.conversationId,
    }))
  }, [ dispatch, chat.conversationId ])

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
          <Avatar src={ chat.profilePic } alt={ chat.name } className='header-avatar' />
        }
        title={ chat.name }
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
                chats={ (chat && chat.data) || [] }
              />
            </div>

            {/* Chat Controls */}
            <ChatControls
              conversationId={ chat && chat.conversationId }
            />
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

ChatPopup.propTypes = {
  chat: PropTypes.shape({
    conversationId: PropTypes.number,
    name: PropTypes.string,
    profilePic: PropTypes.string,
    isGroup: PropTypes.bool,
    data: PropTypes.arrayOf(PropTypes.shape({
      msgId: PropTypes.number,
      candidateId: PropTypes.number,
      profilePic: PropTypes.string,
      isNotification: PropTypes.bool,
      text: PropTypes.string,
      sentAt: PropTypes.string,
      isRead: PropTypes.bool,
    })),
  }).isRequired,
}

export default ChatPopup
