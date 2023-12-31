import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import PostIconsTray from './postIconsTray'
import PostCommentsWrap from '../PostComments/postCommentsWrap'
import AddComment from '../PostComments/addComment'
import config from '../../../../utils/config'
import { addCommentToPost, fetchCommentForPost, updatePostData } from '../../../../redux-saga/redux/actions'
import { commentsArrayValidator } from '../postValidators'
import { SET_IS_COMMENT_LOADING } from '../../../../redux-saga/redux/constants'

const PostBody = ({
  userActivityId, activityValue, activityCustom, isPostLiked, likesCount, commentsCount, comments, commentLoading,
}) => {
  const [ showComments, setShowComments ] = useState(false)
  const [ loadInitialComments, setLoadInitalComments ] = useState(false)
  const [ limit, setLimit ] = useState(1) // Initial Limit of 1 comment
  const [ offsetCount, changeOffsetCount ] = useState(0)

  const dispatch = useDispatch()

  const setIsLoading = useCallback(() => {
    dispatch(updatePostData({
      type: SET_IS_COMMENT_LOADING,
      data: {
        isLoading: true,
        userActivityId,
      },
    }))
  }, [ dispatch, userActivityId ])

  // View More Comments
  const loadMoreCommentsCB = useCallback(() => {
    // Check for another comment Activity
    if (!commentLoading) {
      setIsLoading()
      dispatch(fetchCommentForPost({ limit, offset: offsetCount, userActivityId }))
      changeOffsetCount((c) => c + limit)
    }
  }, [ offsetCount, changeOffsetCount, limit, userActivityId, commentLoading, dispatch, setIsLoading ])

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
  }, [ showComments, commentsCount, dispatch, limit, loadInitialComments, offsetCount, setIsLoading, userActivityId ])

  return (
    // Post Body
    <div className='post-body'>
      <p className='para post-text'>{ activityValue}</p>
      {activityCustom && (
        <div className='render-post-image-container'>
          <img className='post-image' src={ activityCustom } alt='Helen' />
        </div>
      )}

      {/* Post Like and comment */}

      <PostIconsTray
        userActivityId={ userActivityId }
        isPostLiked={ isPostLiked }
        likesCount={ likesCount }
        commentsCount={ commentsCount }
        toggleShowComments={ toggleShowComments }
      />

      {showComments && (
        <>
          <PostCommentsWrap
            postId={ userActivityId }
            loadMoreCommentsCB={ loadMoreCommentsCB }
            userActivityId={ userActivityId }
            comments={ comments }
            commentsCount={ commentsCount }
            isCommentLoading={ commentLoading }
          />

          <AddComment
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
  comments: commentsArrayValidator.isRequired,
}

export default PostBody
