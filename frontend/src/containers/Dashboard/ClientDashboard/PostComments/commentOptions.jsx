import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import ConfirmationModal from '../../../../components/CommonModal/confirmationModal'
import { deletePostComment } from '../../../../redux-saga/redux/actions'

const CommentOptions = ({
  postId, commentId, setIsEditing,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)

  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenOptions(false)
    setAnchorEl(null)
  }

  const handlePostoOptionsClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmDelete(false)
    setIsEditing(false)
  }, [ setIsEditing ])

  const handleEditComment = useCallback(() => {
    setIsEditing(true)
  }, [ setIsEditing ])

  const handleConfirmDeletePost = useCallback(() => {
    dispatch(deletePostComment({
      commentId,
      postId,
    }))
  }, [ postId, commentId, dispatch ])

  return (
    <>
      <IconButton
        onClick={ handlePostoOptionsClick }
        className={ openOptions ? 'comment-option-button-visible' : 'comment-option-button-hidden' }
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-sm dark' />
      </IconButton>
      <Popover
        open={ openOptions }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 0 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
      >
        <div className='comment-options border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faPen } className='custom-fa-icon dark mr-5' /> }
            onClick={ handleEditComment }
          >
            <p className='para'> Edit </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ () => setOpenConfirmDelete(true) }
            startIcon={ <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon dark mr-5' /> }
          >
            <p className='para red'> Delete </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmDeleteModal }
        handleClose={ handleCancelActivity }
        message='Are you sure you want to delete this comment ?'
        confirmButtonText='Delete'
        handleConfirm={ handleConfirmDeletePost }
      />
    </>
  )
}

CommentOptions.propTypes = {
  commentId: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  setIsEditing: PropTypes.func.isRequired,
}

export default CommentOptions
