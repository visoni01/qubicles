import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle, faExclamation } from '@fortawesome/free-solid-svg-icons'
import { useSelector } from 'react-redux'
import _ from 'lodash'
import { groupChatIcon } from '../../../assets/images/chat'
import { formatDate, formatDateTime } from '../../../utils/common'

const UserCard = ({
  id, name, imageUrl, allRead, latestMessage, dateTime, selectedConversationId,
  isGroup, isRemoved, isNotification, isImage, handleOpenChat, error,
}) => {
  const { userDetails } = useSelector((state) => state.login)

  const getNotificationMessage = useCallback((htmlElement) => {
    const elements = htmlElement.getElementsByClassName(userDetails && userDetails.user_id)
    if (elements.length > 0) {
      Array.from(elements).forEach((item) => {
        // eslint-disable-next-line no-param-reassign
        item.innerHTML = 'You'
      })
    }
  }, [ userDetails ])

  // To convert HTML text to normal text
  const stripHtml = useCallback((html) => {
    const temporalDivElement = document.createElement('div')
    temporalDivElement.innerHTML = html
    getNotificationMessage(temporalDivElement)
    return temporalDivElement.textContent || temporalDivElement.innerText || ''
  }, [ getNotificationMessage ])

  const getLatestMessage = useCallback(() => {
    let message = latestMessage
    let className = 'italic'

    if (isRemoved) {
      message = 'You are no longer a participant'
    } else if (isNotification) {
      message = stripHtml(latestMessage)
    } else if (isImage && !latestMessage) {
      message = 'Sent an image'
    } else if (!latestMessage) {
      message = 'Start a conversation...'
    } else {
      className = ''
    }

    return (
      <p className={ `para short-message text-message ${ allRead ? 'light' : '' } ${ className }` }>
        {message}
      </p>
    )
  }, [ isNotification, isRemoved, isImage, latestMessage, stripHtml, allRead ])

  return (
    // eslint-disable-next-line jsx-a11y/click-events-have-key-events, jsx-a11y/no-static-element-interactions
    <div
      className={ `is-flex user-card-item ${ selectedConversationId === id ? 'selected' : '' }` }
      onClick={ () => handleOpenChat(id) }
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
          <div className='is-flex'>
            {getLatestMessage()}
            {error && <FontAwesomeIcon className='custom-fa-icon sz-sm error-symbol' icon={ faExclamation } />}
          </div>

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
  isGroup: false,
  isRemoved: false,
  isNotification: false,
  isImage: false,
  selectedConversationId: null,
  error: false,
}

UserCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  allRead: PropTypes.bool,
  latestMessage: PropTypes.string,
  dateTime: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.number,
  ]),
  isGroup: PropTypes.bool,
  isRemoved: PropTypes.bool,
  isNotification: PropTypes.bool,
  isImage: PropTypes.bool,
  selectedConversationId: PropTypes.number,
  handleOpenChat: PropTypes.func.isRequired,
  error: PropTypes.bool,
}

export default UserCard
