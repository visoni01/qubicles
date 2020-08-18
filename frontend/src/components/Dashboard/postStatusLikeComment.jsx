import React, { useCallback } from 'react'
import { useDispatch } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import PropTypes from 'prop-types'
import { unlikePostStatus, likePostStatus } from '../../redux-saga/redux/actions'

const PostStatusLikeComment = ({
  userActivityId, isPostLiked, likesCount, commentsCount,
}) => {
  const className = isPostLiked ? 'like-icon-custom liked' : 'like-icon-custom'
  const dispatch = useDispatch()
  const data = {
    userActivityId,
  }
  const changePostLikeStatus = useCallback(() => {
    if (isPostLiked) {
      dispatch(unlikePostStatus({ data }))
    } else {
      dispatch(likePostStatus({ data }))
    }
  }, [ isPostLiked ])

  return (
    <div className='like-comment-section columns'>
      <div className='like-section'>
        <FontAwesomeIcon
          icon={ faHeart }
          onClick={ changePostLikeStatus }
          className={ className }
        />
        <span className='likes-count'>
          &nbsp;
          {likesCount}
          &nbsp;
        </span>
      </div>
      <div className='comment-section'>
        <FontAwesomeIcon
          icon={ faComment }
          className='comment-icon-custom'
        />
        <span className='comments-count'>
          &nbsp;
          {commentsCount}
          &nbsp;
        </span>
      </div>
    </div>
  )
}

PostStatusLikeComment.propTypes = {
  userActivityId: PropTypes.number.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
}

export default PostStatusLikeComment
