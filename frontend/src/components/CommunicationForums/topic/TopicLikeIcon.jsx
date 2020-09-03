import React, { useCallback, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './topicPageStyles'
import { likeForumTopic, unlikeForumTopic } from '../../../redux-saga/redux/actions'

const TopicLikeIcon = ({ topicId, totalLikes, topicLiked }) => {
  const dispatch = useDispatch()
  const [ isLikedTopic, likeTopic ] = useState(topicLiked)
  const [ topicLikes, setTopicLikes ] = useState(totalLikes)
  const handleTopicLikeActivity = useCallback(() => {
    const payload = {
      data: {
        topicId,
      },
    }
    if (isLikedTopic) {
      likeTopic(!isLikedTopic)
      dispatch(unlikeForumTopic({ payload, activityType: 'unlike' }))
      setTopicLikes(topicLikes - 1)
    } else {
      likeTopic(!isLikedTopic)
      dispatch(likeForumTopic({ payload, activityType: 'like' }))
      setTopicLikes(topicLikes + 1)
    }
  }, [ isLikedTopic, topicLikes, topicId, dispatch ])
  const classes = useStyles()
  return (
    <div className='stat-block'>
      <IconButton
        aria-label='like topic'
        className={ isLikedTopic ? classes.topicLikeIconOn : classes.topicLikeIconHover }
        onClick={ handleTopicLikeActivity }
      >
        <FontAwesomeIcon icon={ faHeart } className='comment-like-icon' />
      </IconButton>
      <div className='stat-meta'>
        <span>Likes</span>
        <span>{topicLikes}</span>
      </div>
    </div>
  )
}

TopicLikeIcon.propTypes = {
  topicId: PropTypes.number.isRequired,
  totalLikes: PropTypes.number.isRequired,
  topicLiked: PropTypes.bool.isRequired,
}

export default TopicLikeIcon
