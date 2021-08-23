import React, { useState, useCallback } from 'react'
import { Avatar } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import { getTimeFromNow } from '../../../../utils/common'
import EditComment from './editComment'
import { deletePostComment } from '../../../../redux-saga/redux/actions'
import MenuOptions from '../../../Shared/menuOptions'
import { DeleteIcon } from '../../../../assets/images/training'

const RenderPostComments = ({
  ownerId, postId, commentId, commentText, ownerName, profilePic, createdAt, updatedAt,
}) => {
  const [ isEditing, setIsEditing ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)

  const dispatch = useDispatch()

  const handleConfirmModal = useCallback(() => {
    dispatch(deletePostComment({
      commentId,
      postId,
    }))
  }, [ dispatch, commentId, postId ])

  return (
    <>
      {!isEditing && (
      <div className='comment-body'>
        <div className='profile-head-info'>
          <Avatar className='avatar' alt={ ownerName } src={ profilePic } />
          <div className='pt-5'>
            <div className='comment-box'>
              <h4 className='h4 sz-sm'>
                {ownerName}
              </h4>
              <p className='para mt-5'>
                {commentText}
              </p>
            </div>
            <div className='display-inline-flex pl-10'>
              <p className='para light sz-sm'>
                {getTimeFromNow(createdAt)}
              </p>
              <p className='para sz-sm light ml-5'>
                {updatedAt && updatedAt !== createdAt && '(edited)'}
              </p>
            </div>
          </div>
        </div>
        {userDetails.user_id === ownerId && (
          <MenuOptions
            handleFirstOptionClick={ () => setIsEditing(true) }
            handleConfirmModal={ handleConfirmModal }
            confirmButtonText='Delete'
            firstOption='Edit'
            secondOption='Delete'
            FirstIcon={ DeleteIcon } // Change this
            SecondIcon={ DeleteIcon }
            message='Are you sure you want to delete this comment ?'
          />
        )}
      </div>
      )}
      {isEditing && (
      <EditComment
        oldComment={ commentText }
        setIsEditing={ setIsEditing }
        postId={ postId }
        commentId={ commentId }
      />
      )}
    </>
  )
}

RenderPostComments.defaultProps = {
  updatedAt: null,
  profilePic: '',
}

RenderPostComments.propTypes = {
  postId: PropTypes.number.isRequired,
  commentId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  commentText: PropTypes.string.isRequired,
  ownerName: PropTypes.string.isRequired,
  profilePic: PropTypes.string,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string,
}

export default React.memo(RenderPostComments)
