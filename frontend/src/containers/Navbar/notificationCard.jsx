import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { faCircle, faTimes } from '@fortawesome/free-solid-svg-icons'
import { IconButton, Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { getTimeFromNow } from '../../utils/common'

const NotificationCard = ({
  id, message, isRead, createdAt, imageUrl, handleDelete,
}) => {
  const [ showCross, setShowCross ] = useState(false)

  return (
    // eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
    <div
      className='options'
      onMouseOver={ () => setShowCross(true) }
      onMouseEnter={ () => setShowCross(true) }
      onMouseLeave={ () => setShowCross(false) }
    >
      <Avatar
        src={ imageUrl }
        className='profile-picture'
      />

      {/* Message */}
      <div className='notification-message'>
        <div
          className='para'
        // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={ { __html: message } }
        />

        <div className='notification-time'>
          {getTimeFromNow(createdAt)}
        </div>
      </div>

      {/* Cross and Notification icons */}
      <div className='icons'>
        {showCross && (
          <IconButton className='no-padding' onClick={ () => handleDelete(id) }>
            <FontAwesomeIcon className='custom-fa-icon pointer sz-xl' icon={ faTimes } />
          </IconButton>
        )}
        {!isRead && (
          <div className='ml-15'>
            <FontAwesomeIcon icon={ faCircle } className='custom-fa-icon sz-xs' />
          </div>
        )}
      </div>

    </div>
  )
}

NotificationCard.defaultProps = {
  id: null,
  message: '',
  isRead: false,
  createdAt: '',
  imageUrl: '',
}

NotificationCard.propTypes = {
  id: PropTypes.number,
  message: PropTypes.string,
  isRead: PropTypes.bool,
  createdAt: PropTypes.string,
  imageUrl: PropTypes.string,
  handleDelete: PropTypes.func.isRequired,
}

export default NotificationCard
