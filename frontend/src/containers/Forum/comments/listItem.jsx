import React, { useCallback, useState } from 'react'
import {
  Avatar,
} from '@material-ui/core'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import EditComment from './postComment'
import { deleteTopicComment } from '../../../redux-saga/redux/actions'
import MenuOptions from '../../Shared/menuOptions'
import { DeleteIcon } from '../../../assets/images/training'
import { EditIcon } from '../../../assets/images/common'

const Comment = ({ comment }) => {
  const [ openEditComment, setOpenEditComment ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const handleEditCommentModal = useCallback(() => setOpenEditComment((state) => !state), [ setOpenEditComment ])

  const handleConfirmModal = useCallback(() => {
    dispatch(deleteTopicComment({
      topicId: comment && comment.topicId,
      activityId: comment && comment.id,
      ownerId: comment && comment.ownerId,
    }))
  }, [ dispatch, comment ])

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
        <Avatar className='mr-10' src={ comment.profilePic } />
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
            <MenuOptions
              handleFirstOptionClick={ handleEditCommentModal }
              handleConfirmModal={ handleConfirmModal }
              confirmButtonText='Delete'
              firstOption='Edit'
              secondOption='Delete'
              FirstIcon={ EditIcon }
              SecondIcon={ DeleteIcon }
              message='Are you sure you want to delete this comment ?'
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
    profilePic: PropTypes.string,
  }),
}

export default Comment
