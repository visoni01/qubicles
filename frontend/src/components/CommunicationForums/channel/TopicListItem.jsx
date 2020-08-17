import React from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getTimeFromNow } from '../../../utils/common'
import { ownerDetails } from '../forumValidators'
import { USER_ROUTE, GROUP_TOPIC } from '../../../routes/routesPath'

import './style.scss'
import TopicActions from './TopicActions'

const TopicListItem = ({
  topicTitle, tags, dateCreatedOn, topicOwner, totalReplies, dateLastReplied, topicId, topicDescription, isPublic,
}) => (
  <div className='topic-card is-sticky'>
    <div className='topic-owner'>
      <img className='avatar' src='https://via.placeholder.com/150x150' alt='' />
      <div className='badge'>
        <i className='material-icons'><FontAwesomeIcon icon={ faLightbulb } /></i>
      </div>
    </div>
    <div className='topic-meta'>
      <Link to={ `${ GROUP_TOPIC }${ topicId }` } className='topic-title'>{topicTitle}</Link>
      <div className='flex-block'>
        <span>
          {getTimeFromNow(dateCreatedOn)}
          {', by '}
          <Link to={ `${ USER_ROUTE }${ topicOwner.userId }` }>{topicOwner.userName}</Link>
        </span>
        <div className='tags'>
          {tags && tags.map((tag) => (
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
      {dateLastReplied !== '' && (
        <div className='last-reply'>
          <img src='https://via.placeholder.com/150x150' alt='' />
          <div className='last-reply-meta'>
            <span>Last reply</span>
            <span>{getTimeFromNow(dateLastReplied)}</span>
          </div>
        </div>
      )}
      <TopicActions
        topicTitle={ topicTitle }
        topicId={ topicId }
        topicOwner={ topicOwner }
        key={ topicId }
        topicDescription={ topicDescription }
        isPublic={ isPublic }
        tags={ tags }
      />
    </div>
  </div>
)

TopicListItem.defaultProps = {
  topicDescription: '',
  isPublic: false,
}

TopicListItem.propTypes = {
  topicId: PropTypes.number.isRequired,
  topicTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateCreatedOn: PropTypes.string.isRequired,
  topicOwner: ownerDetails.isRequired,
  totalReplies: PropTypes.number.isRequired,
  dateLastReplied: PropTypes.string.isRequired,
  topicDescription: PropTypes.string,
  isPublic: PropTypes.bool,

}

export default TopicListItem
