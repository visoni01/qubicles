import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPen } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { deleteTopicComment } from '../../../redux-saga/redux/actions'
import ConfirmationModal from '../../../components/CommonModal/confirmationModal'

const CommentOptions = ({
  topicId, activityId, ownerId, handleEdit,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDelete ] = useState(false)
  const dispatch = useDispatch()

  const handleClose = () => {
    setOpenOptions(false)
    setAnchorEl(null)
  }

  const handleGroupOptionClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmDelete(false)
  }, [])

  const handleConfirmTopicComment = useCallback(() => {
    setOpenConfirmDelete(false)
    setOpenOptions(false)
    setAnchorEl(null)
    dispatch(deleteTopicComment({
      topicId, activityId, ownerId,
    }))
  }, [ activityId, dispatch, topicId, ownerId ])

  const openConfirmationModal = useCallback(() => (setOpenConfirmDelete(true)), [ setOpenConfirmDelete ])

  return (
    <>
      <IconButton
        onClick={ handleGroupOptionClick }
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
        <div className='group-options border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ handleEdit }
            startIcon={ <FontAwesomeIcon icon={ faPen } className='custom-fa-icon dark mr-5' /> }
          >
            <p className='para'> Edit </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ openConfirmationModal }
            startIcon={ <FontAwesomeIcon icon={ faTrash } className='custom-fa-icon dark mr-5' /> }
          >
            <p className='para red'> Delete </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmDeleteModal }
        handleClose={ handleCancelActivity }
        message='Are you sure you want to delete this group ?'
        confirmButtonText='Delete'
        handleConfirm={ handleConfirmTopicComment }
      />
    </>
  )
}

CommentOptions.propTypes = {
  activityId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  topicId: PropTypes.number.isRequired,
  handleEdit: PropTypes.func.isRequired,
}

export default CommentOptions
