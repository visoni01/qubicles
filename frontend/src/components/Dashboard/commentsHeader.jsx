import React, { useCallback, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart, faComment, faClock } from '@fortawesome/free-solid-svg-icons'
import PropTypes from 'prop-types'
import Avatar from '@material-ui/core/Avatar'
import { useDispatch, useSelector } from 'react-redux'
import LinearProgress from '@material-ui/core/LinearProgress'
import { fetchCommentsStart, unlikePostStatus, likePostStatus } from '../../redux-saga/redux/actions'
import './style.scss'

const useReducerStateSelector = (userActivityId) => {
  const { posts } = useSelector((state) => state.statusPosts)
  const currentPostData = posts.find((post) => post.user_activity_id === userActivityId)
  return {
    likesCount: currentPostData ? currentPostData.likesCount : 0,
    commentsCount: currentPostData ? currentPostData.commentsCount : 0,
    isPostLiked: !!(currentPostData && currentPostData.isPostLiked),
  }
}

const CommentsHeader = ({
  owner, createdAt, limit, offset, userActivityId,
}) => {
  const [ offsetCount, changeOffsetCount ] = useState(offset)

  const dispatch = useDispatch()
  const loadMoreCommentsCB = useCallback(() => {
    const updatedCount = offsetCount + limit
    // eslint-disable-next-line no-shadow
    changeOffsetCount((offsetCount) => offsetCount + limit)
    dispatch(fetchCommentsStart({ limit, offset: updatedCount, userActivityId }))
  }, [ offsetCount, changeOffsetCount, limit, userActivityId ])

  const { isLoading, data } = useSelector((state) => state.comments)
  const { likesCount, commentsCount, isPostLiked } = useReducerStateSelector(userActivityId)
  const className = isPostLiked ? 'like-icon-custom liked' : 'like-icon-custom'

  const changePostLikeStatus = useCallback(() => {
    if (isPostLiked) {
      dispatch(unlikePostStatus({ data: { userActivityId } }))
    } else {
      dispatch(likePostStatus({ data: { userActivityId } }))
    }
  }, [ isPostLiked ])

  return (
    <>
      <div className='header'>
        <Avatar className='avatar'>
          {owner && owner[ 0 ].toUpperCase()}
        </Avatar>
        <div className='item-title title-bar-style'>
          <div className='post-by'>
            Posted by
            <span>
              {owner}
            </span>
          </div>
          <div className='feed-time-small'>
            <span className='fa-clock-style'>
              <FontAwesomeIcon icon={ faClock } />
            </span>
            {createdAt}
          </div>
        </div>
      </div>
      <div className='like-comment-section'>
        <div className='icons'>
          <FontAwesomeIcon className={ className } icon={ faHeart } onClick={ changePostLikeStatus } />
          <span className='count'>{likesCount}</span>
          <FontAwesomeIcon className='like-comment-icon' icon={ faComment } />
          <span className='count'>{commentsCount}</span>
        </div>
        <div className='comments'>
          {commentsCount}
          &nbsp;
          comments
        </div>
        <div className='line' />
        <div className='action-header'>
          {
            data.comments.length !== data.count
            && (
            <span
              className={ isLoading ? 'disable-event' : '' }
              onClick={ loadMoreCommentsCB }
            >
              Load more comments
            </span>
            )
          }
          <FontAwesomeIcon className='like-comment-icon' icon={ faComment } />
          <span>Comments</span>
        </div>
        <div className='line' />
        { isLoading && <LinearProgress />}
      </div>
    </>
  )
}

CommentsHeader.propTypes = {
  owner: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  userActivityId: PropTypes.string.isRequired,
}

export default CommentsHeader
