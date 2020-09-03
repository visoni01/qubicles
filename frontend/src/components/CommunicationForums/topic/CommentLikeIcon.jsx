import React, { useCallback, useState } from 'react'
import { IconButton } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import useStyles from './topicPageStyles'
import { likeTopicComment, unlikeTopicComment } from '../../../redux-saga/redux/actions'
import './style.scss'

const TopicLikeIcon = ({ postId, totalLikes, postLiked }) => {
  const dispatch = useDispatch()
  const [ isLikedComment, likeComment ] = useState(postLiked)
  const [ topicLikes, setTopicLikes ] = useState(totalLikes)
  const handleTopicLikeActivity = useCallback(() => {
    if (isLikedComment) {
      likeComment(!isLikedComment)
      dispatch(unlikeTopicComment({ postId }))
      setTopicLikes(topicLikes - 1)
    } else {
      likeComment(!isLikedComment)
      dispatch(likeTopicComment({ postId }))
      setTopicLikes(topicLikes + 1)
    }
  }, [ isLikedComment, topicLikes, postId, dispatch ])
  const classes = useStyles()
  return (
    <div className='stat-block'>
      {topicLikes > 0 && (
      <span>
        {' '}
        {topicLikes}
        {' '}
      </span>
      )}
      <IconButton
        aria-label='like topic'
        size='small'
        className={ isLikedComment ? classes.commentLikeIconOn : classes.commentLikeIconHover }
        onClick={ handleTopicLikeActivity }
      >
        <FontAwesomeIcon icon={ faHeart } className='comment-like-icon' />
      </IconButton>
    </div>
  )
}

TopicLikeIcon.propTypes = {
  postId: PropTypes.number.isRequired,
  totalLikes: PropTypes.number.isRequired,
  postLiked: PropTypes.bool.isRequired,
}

export default TopicLikeIcon
