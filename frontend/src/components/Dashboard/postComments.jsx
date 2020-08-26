import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { fetchCommentsStart } from '../../redux-saga/redux/actions'
import CommentDetails from './commentDetails'
import CommentSkeleton from './commentSkeleton'
import './style.scss'

const PostComments = ({
  limit, offset, userActivityId,
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCommentsStart({ limit, offset, userActivityId }))
  }, [ dispatch, limit, offset, userActivityId ])

  const { isLoading, data } = useSelector((state) => state.comments)
  const isCommentDataPresent = !_.isEmpty(data.comments)

  return (
    <div className='comments-container'>
      <div className='comments-list slim-scroll'>
        {/* Display skeleton loader on inital render */}
        {(isLoading && !isCommentDataPresent) && <CommentSkeleton />}

        {/* Display no comment message */}
        {
          !isCommentDataPresent
          && !isLoading
          && (
          <div className='no-comment-msg'>
            <span>No Comments found.. </span>
          </div>
          )
        }

        {(isCommentDataPresent) && (
          data.comments.map((comment) => (
            <CommentDetails
              key={ comment.user_activity_id }
              owner={ comment.owner }
              content={ comment.activity_value }
              createdAt={ comment.createdAt }
              userActivityId={ comment.user_activity_id }
              postUserActivityId={ userActivityId }
              ownerId={ comment.owner_id }
            />
          ))
        )}
      </div>
    </div>
  )
}

PostComments.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  userActivityId: PropTypes.string.isRequired,
}

export default PostComments
