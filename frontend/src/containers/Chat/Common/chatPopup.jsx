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
import {
  changePopupOpenState, chatDataRequestStart, resetPopupFlags, updateChatPopups, updateConversations,
} from '../../../redux-saga/redux/chat'
import { groupChatIcon, MaximizeIcon } from '../../../assets/images/chat'
import { activeUsersPropTypes, chatDataPropTypes } from '../propTypes'
import MiddleSectionChatSkeletons from '../../../components/Chat/Skeletons/middleSectionChatSkeletons'

// eslint-disable-next-line complexity
const ChatPopup = ({
  conversationData, isLoading, newNotification, isMaximized,
}) => {
  const [ messageText, setMessageText ] = useState('')
  const [ imageUrl, setImageUrl ] = useState('')

  const dispatch = useDispatch()

  const members = conversationData?.candidatesInfo
  const isGroup = conversationData?.isGroup
  const otherUser = members && members.length > 0 && members[ 0 ]

  const togglePopup = useCallback(() => {
    dispatch(changePopupOpenState({ conversationId: conversationData?.conversationId }))
    dispatch(resetPopupFlags({ conversationId: conversationData?.conversationId }))
  }, [ conversationData, dispatch ])

  const closePopup = useCallback((event) => {
    event.stopPropagation()
    if (conversationData && !conversationData.allRead) {
      dispatch(chatDataRequestStart({
        requestType: 'UPDATE',
        dataType: 'mark-as-read',
        conversationId: conversationData?.conversationId,
      }))
    }
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
    <Card className={ `chat-popup-card ${ newNotification ? 'new-notification' : '' }` } variant='outlined'>
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
              {isMaximized ? (
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

      <Collapse in={ isMaximized }>
        <CardContent className='message-section no-padding'>
          <div className='is-fullheight chat-section'>
            {/* Chat Body */}
            <div className='chat-section-body padding-10'>
              {/* eslint-disable-next-line no-constant-condition */}
              {isLoading
                ? <MiddleSectionChatSkeletons />
                : (
                  <ChatView
                    conversationId={ conversationData?.conversationId }
                    allRead={ conversationData?.allRead }
                    chats={ conversationData?.chatData?.chats }
                    more={ conversationData?.chatData?.more }
                    offset={ conversationData?.chatData?.offset }
                    activeUsers={ conversationData?.activeUsers }
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
                  isImageUploading={ conversationData?.isImageUploading }
                  messageToBeSent={ conversationData?.messageToBeSent }
                  allRead={ conversationData?.allRead }
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
  newNotification: false,
  isMaximized: false,
}

ChatPopup.propTypes = {
  conversationData: PropTypes.shape({
    conversationId: PropTypes.number,
    groupName: PropTypes.string,
    profilePic: PropTypes.string,
    isGroup: PropTypes.bool,
    allRead: PropTypes.bool,
    chatData: chatDataPropTypes,
    isImageUploading: PropTypes.bool,
    messageToBeSent: PropTypes.shape({
      messageText: PropTypes.string,
      imageUrl: PropTypes.string,
    }),
    activeUsers: activeUsersPropTypes,
  }).isRequired,
  isLoading: PropTypes.bool,
  newNotification: PropTypes.bool,
  isMaximized: PropTypes.bool,
}

export default ChatPopup
