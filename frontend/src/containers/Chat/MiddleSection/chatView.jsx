/* eslint-disable complexity */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import { Divider } from '@material-ui/core'
import UserMessage from './userMessage'
import { formatDate, formatDateTime } from '../../../utils/common'
import { allChatsRequestStart } from '../../../redux-saga/redux/chat'
import UserNotification from './userNotification'

const ChatView = ({ chats, conversationId, allRead }) => {
  const messagesEndRef = useRef(null)
  const dispatch = useDispatch()

  useEffect(() => {
    messagesEndRef.current.scrollIntoView()
  })

  useEffect(() => () => {
    if (!allRead) {
      dispatch(allChatsRequestStart({
        requestType: 'UPDATE',
        dataType: 'mark-as-read',
        conversationId,
      }))
    }
  }, [ allRead, conversationId, dispatch ])

  return (
    <>
      {chats && chats.map((item, index) => (
        <div key={ item.msgId }>
          {index > 0 && chats[ index - 1 ] && chats[ index - 1 ].isRead && item && !item.isRead && (
            <div className='new-message-separator'>
              <Divider className='new-message-divider' />
              <p className='para light sz-sm text-center new-message-box'>New Messages</p>
            </div>
          )}

          {(index === 0 || (item && chats[ index - 1 ]
          && formatDate(item.sentAt, 'd') !== formatDate(chats[ index - 1 ].sentAt, 'd')))
            ? (<p className='para light text-center mb-20'>{ item.sentAt && formatDateTime(item.sentAt) }</p>)
            : ''}

          {(item.isNotification)
            ? (<UserNotification message={ item.text } />)
            : (
              <UserMessage
                candidateId={ item.candidateId }
                message={ item.text }
                profilePic={ item.profilePic }
                imageUrl={ item.imageUrl }
                sentAt={ item.sentAt }
              />
            )}
        </div>
      ))}
      <div ref={ messagesEndRef } />
    </>
  )
}

ChatView.defaultProps = {
  chats: {},
  allRead: true,
}

ChatView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chats: PropTypes.any,
  conversationId: PropTypes.number.isRequired,
  allRead: PropTypes.bool,
}

export default ChatView
