import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Avatar, Card, CardContent, CardHeader, IconButton, Collapse,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faTimes, faWindowMaximize, faMinus,
} from '@fortawesome/free-solid-svg-icons'
import ChatView from '../MiddleSection/chatView'
import ChatControls from '../MiddleSection/chatControls'
import { chats } from '../testData'

const ChatPopup = ({ chat }) => {
  const [ popupOpen, setPopupOpen ] = useState(false)

  const togglePopup = useCallback(() => {
    setPopupOpen((state) => !state)
  }, [])

  return (
    <Card className='chat-popup-card' variant='outlined'>
      <CardHeader
        className='header'
        classes={ {
          action: 'header-action',
          title: 'header-title',
        } }
        avatar={
          <Avatar src={ chat.profilePic } alt={ chat.name } />
        }
        title={ chat.name }
        titleTypographyProps={ { variant: 'h6' } }
        action={ (
          <>
            <IconButton onClick={ togglePopup }>
              <FontAwesomeIcon
                className='custom-fa-icon white pointer'
                icon={ popupOpen ? faMinus : faWindowMaximize }
              />
            </IconButton>
            <IconButton>
              <FontAwesomeIcon className='custom-fa-icon white pointer' icon={ faTimes } />
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
                chats={ chats && chats.data }
              />
            </div>

            {/* Chat Controls */}
            <ChatControls />
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
  }).isRequired,
}

export default ChatPopup
