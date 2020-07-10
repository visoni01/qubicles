import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { getTimeFromNow } from '../../utils/common'

const Topic = ({
  topicTitle, tags, dateCreatedOn, topicOwner, totalReplies, dateLastReplied,
}) => (
  <div className='topic-card is-sticky'>
    <div className='topic-owner'>
      <img className='avatar' src='https://via.placeholder.com/150x150' alt='' />
      <div className='badge'>
        <i className='material-icons'><FontAwesomeIcon icon={ faLightbulb } /></i>
      </div>
    </div>
    <div className='topic-meta'>
      <a className='topic-title'>{topicTitle}</a>
      <div className='flex-block'>
        <span>{getTimeFromNow(dateCreatedOn)}{', by '}
          <a>{topicOwner}</a>
        </span>
        <div className='tags'>
          {tags.map((tag) => (
            <span className='tag' key={ tag }>{tag}</span>
          ))}
        </div>
      </div>
    </div>
    <div className='topic-actions'>
      <i className='im im-icon-Letter-Open' />
      <div className='topic-replies'>
        <span>Replies</span>
        <span>{totalReplies}</span>
      </div>
      <div className='last-reply'>
        <img src='https://via.placeholder.com/150x150' alt='' data-demo-src='assets/images/avatars/helen.jpg' />
        <div className='last-reply-meta'>
          <span>Last reply</span>
          <span>{getTimeFromNow(dateLastReplied)}</span>
        </div>
      </div>
    </div>
  </div>
)
Topic.propTypes = {
  topicTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateCreatedOn: PropTypes.string.isRequired,
  topicOwner: PropTypes.string.isRequired,
  totalReplies: PropTypes.number.isRequired,
  dateLastReplied: PropTypes.string.isRequired,
}

export default Topic
