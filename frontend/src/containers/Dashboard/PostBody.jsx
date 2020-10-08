import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import PostStatusLikeComment from './PostLikeComment'
import PostComments from './PostComments'
import PostCommentSection from './PostCommentSection'
import config from '../../utils/config'
import { addCommentToPost, fetchCommentForPost } from '../../redux-saga/redux/actions'

const PostBody = ({
  userActivityId, activityValue, activityCustom, isPostLiked, likesCount, commentsCount, comments,
}) => {
  const dispatch = useDispatch()
  const [ currentCommentsLength, setCurrentCommentsLength ] = useState(comments.length)
  const [ showComments, setShowComments ] = useState(false)
  const [ loadInitialComments, setLoadInitalComments ] = useState(false)

  const isCommentLoading = () => {
    if (commentsCount !== comments.length) {
      return (currentCommentsLength !== comments.length)
    }
    return false
  }

  // Fetch Comments for post
  const [ limit, setLimit ] = useState(1) // Initial Limit of 1 comment
  const [ offsetCount, changeOffsetCount ] = useState(0)

  //  Load more comments
  const loadMoreCommentsCB = useCallback(() => {
    if (!isCommentLoading()) {
      dispatch(fetchCommentForPost({ limit, offset: offsetCount, userActivityId }))
      changeOffsetCount((count) => count + limit)
      setCurrentCommentsLength((c) => c + limit)
    }
  }, [ offsetCount, changeOffsetCount, limit, userActivityId, comments ])

  // Add New Comment
  const postComment = (commentText) => {
    if (!isCommentLoading()) {
      if (!(commentText && commentText.trim())) {
        return
      }
      const commentData = {
        comment: commentText,
        userActivityId,
      }
      dispatch(addCommentToPost({ commentData }))
      changeOffsetCount((count) => count + 1)
      setCurrentCommentsLength((c) => c + 1)
    }
  }

  const toggleShowComments = () => {
    if (!loadInitialComments) {
      dispatch(fetchCommentForPost({ limit, offset: offsetCount, userActivityId }))
      changeOffsetCount((count) => count + limit)
      setCurrentCommentsLength((c) => c + limit)

      // Set Limit for loading more comments
      setLimit(config.COMMENTS_LIMIT)
      setLoadInitalComments(true)
    }
    setShowComments(!showComments)
  }

  return (
    <div className='post-content'>
      <p className='post-text'>
        { activityValue}
      </p>
      {activityCustom && <img className='post-image' src={ activityCustom } alt='Helen' />}

      {/* Post Like and comment */}

      <PostStatusLikeComment
        userActivityId={ userActivityId }
        isPostLiked={ isPostLiked }
        likesCount={ likesCount }
        commentsCount={ commentsCount }
        toggleShowComments={ toggleShowComments }
      />

      {showComments && (
        <>
          <PostComments
            loadMoreCommentsCB={ loadMoreCommentsCB }
            userActivityId={ userActivityId }
            comments={ comments }
            commentsCount={ commentsCount }
          />

          <PostCommentSection
            postComment={ postComment }
            isCommentLoading={ isCommentLoading() }
          />
        </>
      )}

    </div>
  )
}

PostBody.defaultProps = {
  activityCustom: '',
}

PostBody.propTypes = {
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  activityValue: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
}

export default PostBody
