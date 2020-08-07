import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash, faPlus,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button,
} from '@material-ui/core'
import { deleteCategory, addNewChannel } from '../../../redux-saga/redux/actions'
import NewChannelModal from '../channel/NewChannel'

const GroupActions = ({
  id, title, owner,
}) => {
  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)
  const [ openNewChannelModal, setOpenNewChannelModal ] = useState(false)

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
    dispatch(deleteCategory({ categoryId: id, title }))
  }, [ id, dispatch, title ])

  const toggleNewChannelModal = useCallback(() => setOpenNewChannelModal(
    // eslint-disable-next-line
    (openNewChannelModal) => !openNewChannelModal,
  ), [ setOpenNewChannelModal ])

  const handleNewChannelSubmit = useCallback((data) => {
    setAnchorEl(null)
    dispatch(addNewChannel({ ...data, id, userId: userDetails.user_id }))
    setOpenNewChannelModal(false)
  }, [ setOpenNewChannelModal, dispatch, id, userDetails.user_id ])

  return (
    <>
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        {(owner === userDetails.user_id) && (
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
        <div className='category-dropdown'>
          <Menu
            classes={ {
              paper: 'category-dropdown-menu',
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
            <MenuItem
              onClick={ toggleNewChannelModal }
            >
              <FontAwesomeIcon icon={ faPlus } />
              <span className='remove'>
                Add Channel
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
      <NewChannelModal
        open={ openNewChannelModal }
        handleClose={ toggleNewChannelModal }
        onSubmit={ handleNewChannelSubmit }
      />
    </>
  )
}

GroupActions.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.number.isRequired,
}

export default GroupActions
