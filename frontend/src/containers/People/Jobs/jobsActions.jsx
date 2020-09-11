import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem, IconButton,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { jobSubDetailsValidator } from '../../../components/People/peopleValidator'
import { deleteJob } from '../../../redux-saga/redux/actions'
import { isUserOwner } from '../../../utils/common'
import UpdateJobModal from './jobModal'
import ConfirmationModal from '../../../components/CommonModal/ConfirmationModal'

const JobsActions = ({
  categoryId, title, jobId, ownerId,
}) => {
  const dispatch = useDispatch()

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const [ openEditJobModal, setOpenEditJobModal ] = useState(false)

  const toggleEditJobModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenEditJobModal((openEditJobModal) => !openEditJobModal)
  }, [ setOpenEditJobModal ])

  const [ open, setOpen ] = useState(false)

  const handleDialogOpen = () => {
    setOpen(true)
  }

  const handleDialogClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  const handleDelete = useCallback(() => {
    setAnchorEl(null)
    setOpen(false)
    dispatch(deleteJob({ categoryId, jobId, title }))
  }, [ dispatch, categoryId, jobId, title ])

  const closeEditJobModal = useCallback(() => {
    toggleEditJobModal()
    handleClose()
    // eslint-disable-next-line
  }, [ setOpenEditJobModal ])

  return (
    <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
      {isUserOwner(ownerId) && (
        <IconButton onClick={ handleClick }>
          <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
        </IconButton>
      )}
      <div className='job-dropdown'>
        <Menu
          classes={ {
            paper: 'job-dropdown-menu',
          } }
          id='menu'
          anchorEl={ anchorEl }
          keepMounted
          open={ Boolean(anchorEl) }
          onClose={ handleClose }
        >
          <MenuItem
            onClick={ handleDialogOpen }
          >
            <FontAwesomeIcon icon={ faTrash } />
            <span className='remove ml-10'>
              Remove
            </span>
          </MenuItem>
          <MenuItem
            onClick={ toggleEditJobModal }
          >
            <FontAwesomeIcon icon={ faPencilAlt } />
            <span className='remove ml-10'>
              Edit
            </span>
          </MenuItem>
        </Menu>
        <UpdateJobModal open={ openEditJobModal } handleClose={ closeEditJobModal } isEdit jobId={ jobId } />
        <ConfirmationModal
          open={ open }
          handleClose={ handleDialogClose }
          handleConfirm={ handleDelete }
          message='Are you sure want to delete this job?'
        />
      </div>
    </div>
  )
}

JobsActions.propTypes = jobSubDetailsValidator

export default JobsActions
