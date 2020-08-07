import React, { useState, useCallback } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button,
} from '@material-ui/core'
import { useDispatch } from 'react-redux'
import { jobSubDetailsValidator } from '../peopleValidator'
import { deleteJob } from '../../../redux-saga/redux/actions'
import { isUserOwner } from '../../../utils/common'

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
  }, [ categoryId, jobId, title ])

  return (
    <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
      {isUserOwner(ownerId) && (
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
            <span className='remove'>
              Remove
            </span>
          </MenuItem>
        </Menu>
        <Dialog
          open={ open }
          onClose={ handleDialogClose }
          aria-labelledby='delete-dialog-title'
        >
          <DialogTitle id='delete-dialog-title'>Are you sure you want to delete?</DialogTitle>
          <DialogActions>
            <Button onClick={ handleDialogClose } color='primary'>
              Cancel
            </Button>
            <Button onClick={ handleDelete } color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

JobsActions.propTypes = jobSubDetailsValidator

export default JobsActions
