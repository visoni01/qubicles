import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faSuitcase } from '@fortawesome/free-solid-svg-icons'

const Channel = ({
  notifications, title, description, noOfTopics, jobsWrap, noOfApplications,
}) => (
  <div className='forum-channel'>
    <div className='channel-icon'>
      <FontAwesomeIcon icon={ jobsWrap ? faSuitcase : faBell } />
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
      <span>{jobsWrap ? 'Applications' : 'Topics' }</span>
      <span>{jobsWrap ? noOfApplications : noOfTopics}</span>
    </div>
    {/* TODO: Contributors functionality not ready at backend yet */}
    {/* <div className='top-contributors'>
      {contributors.map(({ img }) => (
        <img src='https://via.placeholder.com/150x150' alt='' data-demo-src={ img } key={ img } />
      ))}
    </div> */}
  </div>
)

Channel.defaultProps = {
  notifications: 3,
  noOfTopics: 0,
  jobsWrap: false,
  noOfApplications: 0,
}

Channel.propTypes = {
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  noOfTopics: PropTypes.number,
  jobsWrap: PropTypes.bool,
  noOfApplications: PropTypes.number,
}

export default Channel
