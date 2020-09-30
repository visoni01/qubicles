import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import RenderPostComments from './RenderPostComments'
import { fetchCommentsStart } from '../../redux-saga/redux/actions'

const PostComments = ({
  limit, offset, userActivityId,
}) => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(fetchCommentsStart({ limit, offset, userActivityId }))
  }, [ dispatch, limit, offset, userActivityId ])

  const { isLoading, data } = useSelector((state) => state.comments)

  return (data.comments.map((comment) => (
    <RenderPostComments
      key={ comment.user_activity_id }
      commentText={ comment.activity_value }
      ownerName={ comment.owner }
      ownerId={ comment.owner_id }
      createdAt={ comment.createdAt }
      userActivityId={ comment.user_activity_id }
    />
  )))
}

PostComments.propTypes = {
  limit: PropTypes.number.isRequired,
  offset: PropTypes.number.isRequired,
  userActivityId: PropTypes.string.isRequired,
}
export default PostComments
