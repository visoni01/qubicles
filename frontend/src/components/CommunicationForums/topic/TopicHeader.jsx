import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import {
  faAngleRight, faHome, faArrowLeft,
} from '@fortawesome/free-solid-svg-icons'

const TopicHeader = ({ topicTitle }) => (
  <div className='forum-title-wrapper is-mobile'>
    <img className='forum-image' src='https://via.placeholder.com/150x150' alt='' />
    <div className='inner-wrap'>
      <h3 className='forum-title is-topic-title'>{ topicTitle }</h3>
      <div className='title-meta'>
        <div className='meta'>
          <Link to='/group'>Home</Link>
          <i className='material-icons is-breadcrumb angle-right'><FontAwesomeIcon icon={ faAngleRight } /></i>
        </div>
        <div className='meta'>
          <span>Company Annoucements</span>
          <i className='material-icons is-breadcrumb angle-right'><FontAwesomeIcon icon={ faAngleRight } /></i>
        </div>
        <div className='meta'>
          <span>{topicTitle}</span>
        </div>
      </div>
    </div>
    {/* Filter input */}
    <div className='actions channel-actions'>
      <div className='forum-back home-button'>
        <i><FontAwesomeIcon icon={ faHome } /></i>
        <i><FontAwesomeIcon icon={ faArrowLeft } /></i>
      </div>
      {/* Forum main dropdown */}
      <div className='button secondary-btn btn-dash raised ripple' data-ripple-color>
        Reply
      </div>
    </div>
  </div>
)

TopicHeader.propTypes = {
  topicTitle: PropTypes.string.isRequired,
}

export default TopicHeader
