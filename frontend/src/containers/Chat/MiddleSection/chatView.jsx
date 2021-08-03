/* eslint-disable no-nested-ternary */
import React from 'react'
import PropTypes from 'prop-types'
import UserMessage from './userMessage'
import { formatDate, formatDateTime } from '../../../utils/common'

const ChatView = ({ chats }) => (
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
  </>
)

ChatView.defaultProps = {
  chats: {},
}

ChatView.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  chats: PropTypes.any,
}

export default ChatView
