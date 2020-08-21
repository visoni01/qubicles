import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash, faPlus, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { deleteCategory, addNewChannel, updateCategory } from '../../../redux-saga/redux/actions'
import AddNewChannel from '../channel/ChannelModal'
import AddUpdateGroupModal from './GroupModal'
import ConfirmationModal from '../../CommonModal/ConfirmationModal'

const GroupActions = ({
  id, title, owner, isPublic,
}) => {
  const dispatch = useDispatch()

  const { userDetails } = useSelector((state) => state.login)
  const [ openNewChannelModal, setOpenChannelModal ] = useState(false)
  const [ openGroupModal, setOpenGroupModal ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ open, setOpen ] = useState(false)

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget)
  }
  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  // Delete Dialog methods
  const handleDialogOpen = () => {
    setOpen(true)
  }
  const handleDialogClose = () => {
    setOpen(false)
    setAnchorEl(null)
  }

  /* Edit Group Action methods */
  const handleEditButtonClick = useCallback(() => {
    setOpenGroupModal(true)
  }, [ setOpenGroupModal ])

  const handleEditChannelCancel = useCallback(() => {
    handleMenuClose()
    setOpenGroupModal(false)
  })

  const handleEditGroupSubmit = useCallback((data) => {
    handleMenuClose()
    dispatch(updateCategory({ title: data.title, is_public: data.isPublic, categoryId: id }))
    setOpenGroupModal(false)
  }, [ id, setOpenGroupModal, dispatch ])

  /* Remove Group Action methods */
  const handleDelete = useCallback(() => {
    setAnchorEl(null)
    setOpen(false)
    dispatch(deleteCategory({ categoryId: id, title }))
  }, [ id, dispatch, title ])

  const handleNewChannelCancel = () => {
    handleMenuClose()
    setOpenChannelModal(false)
  }
  const handleAddChannelButtonClick = useCallback(() => {
    setOpenChannelModal(true)
  }, [ setOpenChannelModal ])

  const handleNewChannelSubmit = useCallback((data) => {
    handleMenuClose()
    dispatch(addNewChannel({ ...data, id, userId: userDetails.user_id }))
    setOpenChannelModal(false)
  }, [ setOpenChannelModal, dispatch, id, userDetails.user_id ])

  return (
    <>
      <div className='dropdown is-right dropdown-trigger styled-dropdown is-round is-active'>
        {(owner === userDetails.user_id) && (
          <IconButton onClick={ handleMenuIconClick }>
            <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
          </IconButton>
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
            onClose={ handleMenuClose }
          >
            {/* Add Group Channel */}
            <MenuItem onClick={ handleAddChannelButtonClick }>
              <FontAwesomeIcon icon={ faPlus } />
              <span className='menu-item'>
                Add Channel
              </span>
            </MenuItem>
            {/* Edit Forum Group  */}
            <MenuItem onClick={ handleEditButtonClick }>
              <FontAwesomeIcon icon={ faPencilAlt } />
              <span className='menu-item'>
                Edit
              </span>
            </MenuItem>
            {/* Remove Forum Group */}
            <MenuItem onClick={ handleDialogOpen }>
              <FontAwesomeIcon icon={ faTrash } />
              <span className='menu-item'>
                Remove
              </span>
            </MenuItem>
          </Menu>
        </div>
      </div>
      <ConfirmationModal
        open={ open }
        handleClose={ handleDialogClose }
        handleConfirm={ handleDelete }
        message={ `Are you sure want to delete "${ title }" group?` }
      />
      <AddUpdateGroupModal
        open={ openGroupModal }
        handleClose={ handleEditChannelCancel }
        onSubmit={ handleEditGroupSubmit }
        modalFields={
           {
             title,
             isPublic,
           }
         }
        isUpdate
      />
      <AddNewChannel
        open={ openNewChannelModal }
        handleClose={ handleNewChannelCancel }
        onSubmit={ handleNewChannelSubmit }
      />
    </>
  )
}

GroupActions.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.number.isRequired,
  isPublic: PropTypes.bool.isRequired,
}

export default GroupActions
