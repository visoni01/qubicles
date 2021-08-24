import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import { Box } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import PostHead from './postHead'
import PostBody from './postBody'
import { commentsArrayValidator } from '../postValidators'
import MenuOptions from '../../../Shared/menuOptions'
import { DeleteIcon } from '../../../../assets/images/training'
import { deletePostStatus } from '../../../../redux-saga/redux/actions'
import EditPostModal from './editPostModal'
import { EditIcon } from '../../../../assets/images/common'

const PostWrap = ({
  userActivityId, activityValue, activityCustom,
  createdAt, updatedAt, owner, userId, isPostLiked,
  likesCount, commentsCount, comments, commentLoading, permission,
}) => {
  const { userDetails } = useSelector((state) => state.login)
  const [ openEditPostModal, setOpenEditPostModal ] = useState(false)

  const dispatch = useDispatch()

  const handleConfirmModal = useCallback(() => {
    dispatch(deletePostStatus({
      userActivityId,
    }))
  }, [ dispatch, userActivityId ])

  return (
    <Box className='custom-box mb-25'>
      <div className='display-inline-flex justify-between is-fullwidth align-items-start'>
        <PostHead
          owner={ owner }
          createdAt={ createdAt }
          updatedAt={ updatedAt }
        />
        {owner.userId === userDetails.user_id
        && (
          <MenuOptions
            handleFirstOptionClick={ () => setOpenEditPostModal(true) }
            handleConfirmModal={ handleConfirmModal }
            confirmButtonText='Delete'
            firstOption='Edit'
            secondOption='Delete'
            FirstIcon={ EditIcon }
            SecondIcon={ DeleteIcon }
            message='Are you sure you want to delete this post ?'
          />
        )}
      </div>

      <PostBody
        userActivityId={ userActivityId }
        activityValue={ activityValue }
        activityCustom={ activityCustom }
        userId={ userId }
        isPostLiked={ isPostLiked }
        likesCount={ likesCount }
        commentsCount={ commentsCount }
        comments={ comments }
        commentLoading={ commentLoading }
      />

      {openEditPostModal && (
        <EditPostModal
          open={ openEditPostModal }
          handleClose={ () => setOpenEditPostModal(false) }
          owner={ owner }
          createdAt={ createdAt }
          postId={ userActivityId }
          postText={ activityValue }
          postImage={ activityCustom }
          permission={ permission }
        />
      )}
    </Box>
  )
}

PostWrap.defaultProps = {
  activityCustom: null,
  commentLoading: false,
}

PostWrap.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  activityCustom: PropTypes.string,
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  activityValue: PropTypes.string.isRequired,
  createdAt: PropTypes.string.isRequired,
  updatedAt: PropTypes.string.isRequired,
  likesCount: PropTypes.number.isRequired,
  isPostLiked: PropTypes.bool.isRequired,
  commentsCount: PropTypes.number.isRequired,
  comments: commentsArrayValidator.isRequired,
  commentLoading: PropTypes.bool,
  permission: PropTypes.string.isRequired,
}

export default React.memo(PostWrap)
