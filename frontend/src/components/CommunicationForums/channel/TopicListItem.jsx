import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLightbulb, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { getTimeFromNow } from '../../../utils/common'
import { ownerDetails } from '../forumValidators'
import { USER_ROUTE, GROUP_TOPIC } from '../../../routes/routesPath'
import { deleteTopic } from '../../../redux-saga/redux/actions'
import './style.scss'

const TopicListItem = ({
  topicTitle, tags, dateCreatedOn, topicOwner, totalReplies, dateLastReplied, topicId,
}) => {
  const dispatch = useDispatch()
  const deleteTopicHandler = useCallback(() => {
    dispatch(deleteTopic({ topicId, topicTitle }))
  }, [ topicId, topicTitle, dispatch ])

  return (
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
        <div className='topic-remove'>
          <i className='material-icons'>
            <FontAwesomeIcon icon={ faTrash } onClick={ deleteTopicHandler } />
          </i>
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
      </div>
    </div>
  )
}

TopicListItem.propTypes = {
  topicId: PropTypes.number.isRequired,
  topicTitle: PropTypes.string.isRequired,
  tags: PropTypes.arrayOf(PropTypes.string).isRequired,
  dateCreatedOn: PropTypes.string.isRequired,
  topicOwner: ownerDetails.isRequired,
  totalReplies: PropTypes.number.isRequired,
  dateLastReplied: PropTypes.string.isRequired,
}

export default TopicListItem
