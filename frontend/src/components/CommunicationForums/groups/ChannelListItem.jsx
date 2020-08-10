import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import ActionDropdown from './ChannelActions'

const ChannelListItem = ({
  notifications, title, description, noOfTopics, id, categoryId, ownerId,
}) => (
  <div className='forum-channel'>
    <Link to={ `/group/channels/${ id }` } className='channel-link'>
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
      <div className='channel-topics pl-10'>
        <span>Topics</span>
        <span>{noOfTopics}</span>
      </div>
    </Link>
    <ActionDropdown categoryId={ categoryId } channelId={ id } title={ title } ownerId={ ownerId } />
  </div>
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
  categoryId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
}

export default ChannelListItem
