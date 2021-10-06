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
import { updateChatPopups, updateConversations } from '../../../redux-saga/redux/chat'
import { groupChatIcon, MaximizeIcon } from '../../../assets/images/chat'
import { chatDataPropTypes } from '../propTypes'
import MiddleSectionChatSkeletons from '../../../components/Chat/Skeletons/middleSectionChatSkeletons'

// eslint-disable-next-line complexity
const ChatPopup = ({ conversationData, isLoading }) => {
  const [ popupOpen, setPopupOpen ] = useState(false)
  const [ messageText, setMessageText ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const dispatch = useDispatch()

  const members = conversationData?.candidatesInfo
  const isGroup = conversationData?.isGroup
  const otherUser = members && members.length > 0 && members[ 0 ]

  const togglePopup = useCallback(() => {
    setPopupOpen((state) => !state)
  }, [])

  const closePopup = useCallback((event) => {
    event.stopPropagation()
    dispatch(updateChatPopups({
      requestType: 'DELETE',
      conversationId: conversationData && conversationData.conversationId,
    }))
    dispatch(updateConversations({
      requestType: 'DELETE',
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
        avatar={ (
          <Avatar
            src={ isGroup ? groupChatIcon : otherUser?.profilePic }
            alt={ isGroup ? conversationData?.groupName : otherUser?.name }
            className='header-avatar'
          />
        ) }
        title={ isGroup
          ? conversationData?.groupName || members.map((member) => member.name).join(', ')
          : otherUser?.name }
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
              {/* eslint-disable-next-line no-constant-condition */}
              {false && isLoading // WIP - check after integrating WebSockets
                ? <MiddleSectionChatSkeletons />
                : (
                  <ChatView
                    conversationId={ conversationData?.conversationId }
                    allRead={ conversationData?.allRead }
                    chats={ conversationData?.chatData?.chats }
                    more={ conversationData?.chatData?.more }
                    offset={ conversationData?.chatData?.offset }
                    isLoading={ isLoading }
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
                <ChatControls
                  conversationId={ conversationData?.conversationId }
                  messageText={ messageText }
                  setMessageText={ setMessageText }
                  imageUrl={ imageUrl }
                  setImageUrl={ setImageUrl }
                  isLoading={ isLoading }
                />
              )}
          </div>
        </CardContent>
      </Collapse>
    </Card>
  )
}

ChatPopup.defaultProps = {
  isLoading: false,
}

ChatPopup.propTypes = {
  conversationData: PropTypes.shape({
    conversationId: PropTypes.number,
    groupName: PropTypes.string,
    profilePic: PropTypes.string,
    isGroup: PropTypes.bool,
    allRead: PropTypes.bool,
    chatData: chatDataPropTypes,
  }).isRequired,
  isLoading: PropTypes.bool,
}

export default ChatPopup
