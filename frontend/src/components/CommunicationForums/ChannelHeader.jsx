import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faHome, faArrowLeft, faPlus, faUsers, faCommentDots,
} from '@fortawesome/free-solid-svg-icons'

const ChannelHeader = ({
  channelTitle, channelDescription, totalMembers, totalReplies,
}) => (
  <div>
    <div className='forum-title-wrapper is-mobile'>
      <img className='forum-image' src='https://via.placeholder.com/150x150' alt='' />
      <div className='inner-wrap'>
        <h3 className='forum-title'>{channelTitle}</h3>
        <div className='title-meta'>
          {/* {Total Members} */}
          <div className='meta'>
            <FontAwesomeIcon icon={ faUsers } />
            <span>{totalMembers}</span>
          </div>
          {/* {Total Replies} */}
          <div className='meta'>
            <FontAwesomeIcon icon={ faCommentDots } />
            <span>{totalReplies}</span>
          </div>
        </div>
      </div>
      {/* {Channel Search Bar} */}
      <div className='control forum-search'>
        <input type='text' className='input is-rounded' placeholder='Search Channel...' />
        <div className='search-icon'>
          <i className='sl sl-icon-magnifier' />
        </div>
      </div>
      <div className='actions'>
        <div className='forum-back'>
          <i><FontAwesomeIcon icon={ faHome } /></i>
          <i><FontAwesomeIcon icon={ faArrowLeft } /></i>
        </div>
        {/* Forum main dropdown */}
        <a className='button btn-dash secondary-btn btn-dash raised ripple has-icon' data-ripple-color>
          <i><FontAwesomeIcon icon={ faPlus } /></i>
          New Topic
        </a>
      </div>
    </div>
    <span className='channel-description'>{channelDescription}</span>
  </div>
)

ChannelHeader.propTypes = {
  channelTitle: PropTypes.string.isRequired,
  channelDescription: PropTypes.string.isRequired,
  totalMembers: PropTypes.number.isRequired,
  totalReplies: PropTypes.number.isRequired,
}

export default ChannelHeader
