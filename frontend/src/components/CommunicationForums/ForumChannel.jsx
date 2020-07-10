import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell } from '@fortawesome/free-solid-svg-icons'
import { Redirect, useHistory, Link } from 'react-router-dom'

const Channel = ({
  notifications, title, description, noOfTopics, id,
}) => {
  return (
    <a href={ `/group/channels/${ id }` }>
      <div className='forum-channel'>
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
        {/* TODO: Contributors functionality not ready at backend yet */}
        {/* <div className='top-contributors'>
        {contributors.map(({ img }) => (
          <img src='https://via.placeholder.com/150x150' alt='' data-demo-src={ img } key={ img } />
        ))}
      </div> */}
      </div>
    </a>
  )
}

Channel.defaultProps = {
  notifications: 3,
  noOfTopics: 0,
}

Channel.propTypes = {
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noOfTopics: PropTypes.number,
}

export default Channel
