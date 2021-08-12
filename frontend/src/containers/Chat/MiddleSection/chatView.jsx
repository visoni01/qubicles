/* eslint-disable no-nested-ternary */
import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import UserMessage from './userMessage'
import { formatDate, formatDateTime } from '../../../utils/common'
import { allChatsRequestStart } from '../../../redux-saga/redux/chat'

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
          {(index === 0 || (chats[ index ] && chats[ index - 1 ]
          && formatDate(chats[ index ].sentAt, 'd') !== formatDate(chats[ index - 1 ].sentAt, 'd')))
            ? (<p className='para light text-center mb-20'>{ item.sentAt && formatDateTime(item.sentAt) }</p>)
            : ''}

          {(item.isNotification)
            ? (
              <div
                className='para text-center mt-10 mb-20'
              // eslint-disable-next-line react/no-danger
                dangerouslySetInnerHTML={ { __html: item.text } }
              />
            )
            : (
              <UserMessage
                candidateId={ item.candidateId }
                message={ item.text }
                profilePic={ item.profilePic }
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
