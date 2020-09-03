import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash, faComment, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
} from '@material-ui/core'
import { deletePostStatus, updatePostStatus } from '../../redux-saga/redux/actions'
import ConfirmationModal from '../CommonModal/ConfirmationModal'
import PostEditModal from './PostEditModal'

const PostStatusAction = ({
  userId, userActivityId, showComments, activityValue, activityCustom,
}) => {
  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const [ open, setOpen ] = useState(false)
  const [ openEditModal, setOpenEditModal ] = useState(false)

  const handleClose = () => {
    // eslint-disable-next-line
    setAnchorEl(null)
  }

  const handleDialogOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const deletePostHandler = useCallback(() => {
    setAnchorEl(null)
    setOpen(false)
    dispatch(deletePostStatus({ userActivityId }))
  }, [ userActivityId, dispatch ])

  const showCommentsCB = useCallback(() => {
    showComments()
    setAnchorEl(null)
  }, [ setAnchorEl, showComments ])

  const toggleEditModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenEditModal((openEditModal) => !openEditModal)
    handleClose()
    // eslint-disable-next-line
  }, [ openEditModal ])

  const submitEditedPost = useCallback((editedPost) => {
    dispatch(updatePostStatus(editedPost))
  }, [ dispatch ])

  return (
    <>
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        <div className='button'>
          <i className='dropdown-icon'>
            <FontAwesomeIcon
              icon={ faEllipsisV }
              aria-controls='menu'
              aria-haspopup='true'
              onClick={ handleClick }
            />
          </i>
        </div>
        <div className='post-status-dropdown'>
          <Menu
            classes={ {
              paper: 'post-status-dropdown-menu',
            } }
            id='menu'
            anchorEl={ anchorEl }
            keepMounted
            open={ Boolean(anchorEl) }
            onClose={ handleClose }
          >
            <MenuItem
              onClick={ showCommentsCB }
            >
              <FontAwesomeIcon icon={ faComment } />
              <span className='remove'>
                Show comments
              </span>
            </MenuItem>
            {(userId === userDetails.user_id) && (
            <MenuItem
              onClick={ handleDialogOpen }
            >
              <FontAwesomeIcon icon={ faTrash } />
              <span className='remove'>
                Remove
              </span>
            </MenuItem>
            )}
            {(userId === userDetails.user_id) && (
            <MenuItem onClick={ toggleEditModal }>
              <FontAwesomeIcon icon={ faPencilAlt } />
              <span className='menu-item'>
                Edit
              </span>
            </MenuItem>
            )}
          </Menu>
        </div>
      </div>
      <PostEditModal
        open={ openEditModal }
        handleClose={ toggleEditModal }
        onSubmit={ submitEditedPost }
        userActivityId={ userActivityId }
        postDescription={ activityValue }
        activityCustom={ activityCustom }
      />
      <ConfirmationModal
        open={ open }
        handleClose={ handleDialogClose }
        handleConfirm={ deletePostHandler }
        message='Are you sure want to delete this posted status?'
      />
    </>
  )
}

PostStatusAction.defaultProps = {
  activityCustom: null,
}

PostStatusAction.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
  showComments: PropTypes.func.isRequired,
  activityValue: PropTypes.string.isRequired,
  activityCustom: PropTypes.string,
}

export default PostStatusAction
