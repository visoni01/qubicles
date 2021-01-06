import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deletePostStatus } from '../../../redux-saga/redux/actions'
import ConfirmationModal from '../../../components/CommonModal/ConfirmationModal'
import EditPostModal from './EditPostModal'

const PostOptions = ({
  postId, postText, postImage, permission, owner, createdAt,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)
  const [ openEditPostModal, setOpenEditPostModal ] = useState(false)

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
    setOpenEditPostModal(false)
  }, [])

  const handleConfirmDeletePost = useCallback(() => {
    dispatch(deletePostStatus({
      userActivityId: postId,
    }))
  }, [ postId, dispatch ])

  return (
    <>
      <IconButton
        onClick={ handlePostoOptionsClick }
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-md dark' />
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
        <div className='post-options border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faPen } className='custom-fa-icon dark mr-5' /> }
            onClick={ () => setOpenEditPostModal(true) }
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
        message='Are you sure you want to delete this post ?'
        confirmButtonText='Delete'
        handleConfirm={ handleConfirmDeletePost }
      />
      <EditPostModal
        open={ openEditPostModal }
        handleClose={ handleCancelActivity }
        owner={ owner }
        createdAt={ createdAt }
        postId={ postId }
        postText={ postText }
        postImage={ postImage }
        permission={ permission }
      />
    </>
  )
}

PostOptions.propTypes = {
  owner: PropTypes.shape({
    fullName: PropTypes.string.isRequired,
    userId: PropTypes.number.isRequired,
  }).isRequired,
  createdAt: PropTypes.string.isRequired,
  postId: PropTypes.number.isRequired,
  postText: PropTypes.string.isRequired,
  postImage: PropTypes.string.isRequired,
  permission: PropTypes.bool.isRequired,
}

export default PostOptions
