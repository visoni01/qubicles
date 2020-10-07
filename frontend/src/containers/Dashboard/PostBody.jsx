import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import PostStatusLikeComment from './PostLikeComment'
import PostComments from './PostComments'
import PostCommentSection from './PostCommentSection'
import config from '../../utils/config'
import { addCommentToPost } from '../../redux-saga/redux/actions'

const PostBody = ({
  userActivityId, activityValue, activityCustom, isPostLiked, likesCount, commentsCount, comments,
}) => {
  const dispatch = useDispatch()
  const [ showComments, setShowComments ] = useState(false)
  const [ showCommentSection, setShowCommentSection ] = useState(true)
  const toggleCommentSection = () => {
    setShowCommentSection(!showCommentSection)
  }
  const toggleShowComments = () => {
    setShowComments(!showComments)
  }

  const postComment = (commentText) => {
    const commentData = {
      comment: commentText,
      userActivityId,
    }

    dispatch(addCommentToPost({ commentData }))
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
        toggleCommentSection={ toggleCommentSection }
      />

      {showComments && (
      <PostComments
        limit={ config.COMMENTS_LIMIT }
        offset={ 0 }
        userActivityId={ userActivityId }
        comments={ comments }
      />
      )}

      {/* <PostComments /> */}
      {showCommentSection && (
      <PostCommentSection
        postComment={ postComment }
      />
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
