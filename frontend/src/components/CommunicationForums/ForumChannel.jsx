import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

const Channel = ({
  icon, notifications, title, description, noOfTopics, contributors,
}) => (
  <div className='forum-channel'>
    <div className='channel-icon'>
      <FontAwesomeIcon icon={ icon } />
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
    <div className='top-contributors'>
      {contributors.map(({ img }) => (
        <img src='https://via.placeholder.com/150x150' alt='' data-demo-src={ img } key={ img } />
      ))}
    </div>
  </div>
)

Channel.defaultProps = {
  notifications: 0,
  noOfTopics: 0,
  contributors: [],
}

Channel.propTypes = {
  icon: PropTypes.string.isRequired,
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noOfTopics: PropTypes.number,
  contributors: PropTypes.arrayOf,
}

export default Channel
