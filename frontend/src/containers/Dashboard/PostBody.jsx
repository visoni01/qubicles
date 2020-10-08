import React, { useState, useCallback, useMemo } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import PostStatusLikeComment from './PostLikeComment'
import PostComments from './PostComments'
import PostCommentSection from './PostCommentSection'
import config from '../../utils/config'
import { addCommentToPost, fetchCommentForPost, setIsCommentLoading } from '../../redux-saga/redux/actions'

const PostBody = ({
  userActivityId, activityValue, activityCustom, isPostLiked, likesCount, commentsCount, comments, commentLoading,
}) => {
  const dispatch = useDispatch()
  const [ showComments, setShowComments ] = useState(false)
  const [ loadInitialComments, setLoadInitalComments ] = useState(false)

  // Fetch Comments for post
  const [ limit, setLimit ] = useState(1) // Initial Limit of 1 comment
  const [ offsetCount, changeOffsetCount ] = useState(0)

  const setIsLoading = () => {
    // Set comment is loading
    dispatch(setIsCommentLoading({
      isLoading: true,
      userActivityId,
    }))
  }

  // View More Comments
  const loadMoreCommentsCB = useCallback(() => {
    // Check for another comment Activity
    if (!commentLoading) {
      setIsLoading()
      dispatch(fetchCommentForPost({ limit, offset: offsetCount, userActivityId }))
      changeOffsetCount((c) => c + limit)
    }
  }, [ offsetCount, changeOffsetCount, limit, userActivityId, comments ])

  // Add New Comment
  const postComment = (commentText) => {
    if (!(commentText && commentText.trim())) {
      return
    }

    // Check for another comment Activity
    if (!commentLoading) {
      setIsLoading()
      const commentData = {
        comment: commentText,
        userActivityId,
      }
      dispatch(addCommentToPost({ commentData }))
      changeOffsetCount((c) => c + 1)
    }
  }

  // Toggle Show Comments section
  const toggleShowComments = useCallback(() => {
    if (!loadInitialComments) {
      if (commentsCount !== 0) {
        setIsLoading()
        dispatch(fetchCommentForPost({ limit, offset: offsetCount, userActivityId }))

        // Change offset and limit after inital load
        changeOffsetCount((c) => c + limit)
        setLimit(config.COMMENTS_LIMIT)

        // Set Initial loaded to true
        setLoadInitalComments(true)
      }
    }

    setShowComments(!showComments)
  }, [ commentLoading, showComments ])

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
            isCommentLoading={ commentLoading }
          />

          <PostCommentSection
            postComment={ postComment }
            isCommentLoading={ commentLoading }
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
  commentLoading: PropTypes.bool.isRequired,
}

export default PostBody
