/* eslint-disable complexity */
import React, {
  useCallback, useEffect, useRef, useState,
} from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Divider } from '@material-ui/core'
import UserMessage from './userMessage'
import { formatDate, formatDateTime } from '../../../utils/common'
import { chatDataRequestStart } from '../../../redux-saga/redux/chat'
import UserNotification from './userNotification'
import { ThreeDotLoader } from '../../loaders'
import { NoMessagesIcon } from '../../../assets/images/chat'
import { activeUsersPropTypes, chatsPropTypes, groupMembersPropTypes } from '../propTypes'
import { REQUEST_TYPES } from '../../../utils/constants'
import { CHAT_MESSAGES } from '../../../redux-saga/redux/constants'

const ChatView = ({
  conversationId, chats, more, offset, isLoading, candidatesInfo, activeUsers,
}) => {
  const [ hasIntersect, setHasIntersect ] = useState(false)
  const messagesEndRef = useRef(null)
  const observer = useRef()

  const dispatch = useDispatch()

  useEffect(() => {
    if (!hasIntersect) {
      messagesEndRef.current.scrollIntoView()
    }
  }, [ hasIntersect, chats ])

  const handleObserver = useCallback((entries) => {
    const target = entries[ 0 ]
    if (!hasIntersect && target?.isIntersecting) {
      setHasIntersect(true)
    }
    if (hasIntersect && target?.isIntersecting && more) {
      dispatch(chatDataRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: CHAT_MESSAGES,
        conversationId,
        offset: offset + 10,
      }))
    }
  }, [ dispatch, hasIntersect, conversationId, more, offset ])

  const startRef = useCallback((node) => {
    const option = {
      root: null,
      rootMargin: '0px',
      threshold: 1,
    }
    if (observer.current) observer.current.disconnect()
    observer.current = new IntersectionObserver(handleObserver, option)
    if (node) observer.current.observe(node)
  }, [ handleObserver ])

  const getTypingMessage = useCallback(() => {
    let message = activeUsers[ 0 ].name

    if (activeUsers.length === 1) {
      message += ' is typing'
    } else if (activeUsers.length === 2) {
      message += ` and ${ activeUsers[ 1 ].name } are typing`
    } else {
      message += `, ${ activeUsers[ 1 ].name } and others are typing`
    }

    return message
  }, [ activeUsers ])

  return (
    <>
      <div>
        {!isLoading && chats && chats.length === 0 && (
          <div className='no-messages'>
            <NoMessagesIcon />
            <h2 className='h2 text-center'>No messages yet</h2>
          </div>
        )}

        {isLoading && more && <ThreeDotLoader />}

        {chats && chats.map((item, index) => (
          <div key={ item.messageId } ref={ !index ? startRef : null }>
            {index > 0 && chats[ index - 1 ] && chats[ index - 1 ].isRead && item && !item.isRead && (
              <div className='new-message-separator'>
                <Divider className='new-message-divider' />
                <p className='para light sz-sm text-center new-message-box'>New Messages</p>
              </div>
            )}

            {(index === 0 || (item && chats[ index - 1 ]
              && formatDate(item.sentAt, 'L') !== formatDate(chats[ index - 1 ].sentAt, 'L')))
              ? (<p className='para light text-center mb-20'>{ item.sentAt && formatDateTime(item.sentAt) }</p>)
              : ''}

            {(item.isNotification)
              ? (<UserNotification message={ item.text } />)
              : (
                <UserMessage
                  conversationId={ conversationId }
                  messageId={ item.messageId }
                  senderId={ item.senderId }
                  clientId={ item.clientId }
                  message={ item.text }
                  profilePic={ item.profilePic }
                  senderName={ item.senderName }
                  imageUrl={ item.imageUrl }
                  sentAt={ item.sentAt }
                  error={ item.error }
                  candidatesInfo={ candidatesInfo }
                />
              )}
          </div>
        ))}

        <div ref={ messagesEndRef } />
      </div>

      {activeUsers && activeUsers.length > 0 && (
        <div className='is-flex'>
          <ThreeDotLoader isSmall />
          <p className='para italic'>{ getTypingMessage() }</p>
        </div>
      )}
    </>
  )
}

ChatView.defaultProps = {
  chats: null,
  conversationId: null,
  more: false,
  offset: 0,
  isLoading: false,
  candidatesInfo: [],
  activeUsers: [],
}

ChatView.propTypes = {
  chats: chatsPropTypes,
  conversationId: PropTypes.number,
  more: PropTypes.bool,
  offset: PropTypes.number,
  isLoading: PropTypes.bool,
  candidatesInfo: groupMembersPropTypes,
  activeUsers: activeUsersPropTypes,
}

export default ChatView
