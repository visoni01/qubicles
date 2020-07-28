import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'

const ChannelListItem = ({
  notifications, title, description, noOfTopics, id,
}) => (
  <Link to={ `/group/channels/${ id }` } className='forum-channel'>
    <div className='channel-icon'>
      <FontAwesomeIcon icon={ faBell } />
      {/* New Topics */}
      <div className='new-indicator'>
        <span>{notifications}</span>
      </div>
    </div>
    <div className='channel-meta'>
      <span>{title}</span>
      <span>{description}</span>
    </div>
    <div className='channel-topics'>
      <span>Topics</span>
      <span>{noOfTopics}</span>
    </div>
  </Link>
)

ChannelListItem.defaultProps = {
  notifications: 3,
  noOfTopics: 0,
  description: '',
}

ChannelListItem.propTypes = {
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  noOfTopics: PropTypes.number,
  id: PropTypes.number.isRequired,
}

export default ChannelListItem
