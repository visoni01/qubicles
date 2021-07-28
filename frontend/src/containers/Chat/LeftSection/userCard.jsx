import React from 'react'
import PropTypes from 'prop-types'
import { Avatar } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircle } from '@fortawesome/free-solid-svg-icons'

const UserCard = ({
  name, imageUrl, allRead, latestMessage, time,
}) => (
  <div className='is-flex user-card-item'>
    <Avatar className='profile-pic' alt={ name } src={ imageUrl } />

    <div className='is-fullwidth'>
      <div className='is-flex is-between'>
        <span className='h4'>{name}</span>
        <p className='para light'>{time}</p>
      </div>

      <div className='is-flex is-between align-items-flex-end'>
        <p className={ `para text-message ${ allRead ? 'light' : '' }` }>
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

UserCard.defaultProps = {
  name: '',
  imageUrl: '',
  allRead: '',
  latestMessage: '',
  time: '',
}

UserCard.propTypes = {
  name: PropTypes.string,
  imageUrl: PropTypes.string,
  allRead: PropTypes.bool,
  latestMessage: PropTypes.string,
  time: PropTypes.string,
}

export default UserCard
