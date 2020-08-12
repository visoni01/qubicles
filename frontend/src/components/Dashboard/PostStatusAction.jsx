import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button,
} from '@material-ui/core'
import { deletePostStatus } from '../../redux-saga/redux/actions'

const PostStatusAction = ({
  userId, userActivityId,
}) => {
  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)

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
    dispatch(deletePostStatus({ userActivityId }))
  }, [ userActivityId, dispatch ])

  return (
    <>
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        {(userId === userDetails.user_id) && (
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
              onClick={ handleDialogOpen }
            >
              <FontAwesomeIcon icon={ faTrash } />
              <span className='remove'>
                Remove
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <Dialog
        open={ open }
        onClose={ handleDialogClose }
        aria-labelledby='delete-dialog-title'
      >
        <DialogTitle id='delete-dialog-title'>Are you sure you want to delete this status?</DialogTitle>
        <DialogActions>
          <Button onClick={ handleDialogClose } color='primary'>
            Cancel
          </Button>
          <Button onClick={ handleDelete } color='primary' autoFocus>
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </>
  )
}

PostStatusAction.propTypes = {
  userId: PropTypes.number.isRequired,
  userActivityId: PropTypes.number.isRequired,
}

export default PostStatusAction
