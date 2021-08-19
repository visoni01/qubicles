/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import { groupChatIcon } from '../../../assets/images/chat'
import { formatDate, formatDateTime } from '../../../utils/common'
import { currentChatRequestStart } from '../../../redux-saga/redux/chat'

const UserCard = ({
  id, name, imageUrl, allRead, latestMessage, dateTime, setConversationId, isGroup, selectedConversationId,
}) => {
  const dispatch = useDispatch()

  const handleOpenChat = useCallback(() => {
    if (id !== selectedConversationId) {
      setConversationId(id)
      dispatch(currentChatRequestStart({
        requestType: 'FETCH',
        dataType: 'current-chat',
        conversationId: id,
      }))
    }
  }, [ dispatch, id, selectedConversationId, setConversationId ])

  return (
    <div
      className={ `is-flex user-card-item ${ selectedConversationId === id ? 'selected' : '' }` }
      onClick={ handleOpenChat }
    >
      <Avatar className='profile-pic' alt={ name } src={ isGroup ? groupChatIcon : imageUrl } />

      <div className='is-fullwidth'>
        <div className='is-flex is-between'>
          <span className='h4 short-message conversation-title'>{name}</span>
          <p className='para light'>
            {dateTime
            && (formatDate(dateTime, _.isEqual(formatDateTime(dateTime), 'Today') ? 'hh:mm a' : 'L'))}
          </p>
        </div>

        <div className='is-flex is-between align-items-flex-end'>
          <p className={ `para short-message text-message ${ allRead ? 'light' : '' }` }>
            {latestMessage || 'Start a conversation...'}
          </p>
          {!allRead ? (
            <div>
              <FontAwesomeIcon icon={ faCircle } className='custom-fa-icon sz-xs' />
            </div>
          ) : ''}
        </div>
      </div>
    </div>
  )
}

UserCard.defaultProps = {
  id: null,
  name: '',
  imageUrl: '',
  allRead: '',
  latestMessage: '',
  dateTime: '',
  setConversationId: () => {},
  isGroup: false,
  selectedConversationId: null,
}

UserCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  allRead: PropTypes.bool,
  latestMessage: PropTypes.string,
  dateTime: PropTypes.string,
  setConversationId: PropTypes.func,
  isGroup: PropTypes.bool,
  selectedConversationId: PropTypes.number,
}

export default UserCard
