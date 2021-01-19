import React, { useCallback, useState } from 'react'
import {
  Avatar,
} from '@material-ui/core'
import moment from 'moment'
import { useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { carolin } from '../../../assets/images/avatar/index'
import CommentOptions from './commentOptions'
import EditComment from './postComment'

const Comment = ({ comment }) => {
  const [ openEditComment, setOpenEditComment ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)

  const handleEditCommentModal = useCallback(() => setOpenEditComment((state) => !state), [ setOpenEditComment ])

  if (openEditComment) {
    return (
      <EditComment
        isEdit={ openEditComment }
        commentDetails={ comment }
        closeEditModal={ handleEditCommentModal }
      />
    )
  }

  return (
    <div key={ comment.id } className='mt-20 mb-20'>
      <div className='display-inline-flex mb-10 is-fullwidth'>
        <Avatar className='mr-10' src={ carolin } />
        <div className='comment-action-button'>
          <p className='para bold sz-xs'>
            {comment.ownerName}
          </p>
          <p className='para light sz-xs'>
            {moment(comment.createdAt).format('MMMM DD YY hh:mm a')}
          </p>
        </div>
        <div>
          {userDetails.user_id === comment.ownerId && (
          <CommentOptions
            topicId={ comment.topicId }
            activityId={ comment.id }
            ownerId={ comment.ownerId }
            handleEdit={ handleEditCommentModal }
          />
          )}
        </div>
      </div>
      <p className='para'>
        {comment.comment}
      </p>
    </div>
  )
}

Comment.defaultProps = {
  comment: {
    id: '',
    ownerName: '',
    createdAt: '',
    ownerId: '',
    topicId: '',
    comment: '',
  },
}

Comment.propTypes = {
  comment: PropTypes.shape({
    id: PropTypes.number,
    ownerName: PropTypes.string,
    createdAt: PropTypes.string,
    ownerId: PropTypes.number,
    topicId: PropTypes.number,
    comment: PropTypes.string,
  }),
}

export default Comment
