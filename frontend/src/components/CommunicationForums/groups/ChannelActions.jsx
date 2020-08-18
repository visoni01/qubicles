import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faEllipsisV, faTrash, faPenAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel, updateChannel } from '../../../redux-saga/redux/forum/actions'
import AddUpdateChannelModal from '../channel/ChannelModal'
import ConfirmationModal from '../../CommonModal/ConfirmationModal'

const ChannelActions = ({
  categoryId, channelId, title, ownerId, description, isPublic, isCompanyAnn,
}) => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openEditChannelModal, setOpenEditChannelModal ] = useState(false)
  const [ openConfirmationModal, setOpenConfirmationModal ] = useState(false)

  const toggleConfirmationModal = useCallback(
    // eslint-disable-next-line
    () => setOpenConfirmationModal((openConfirmationModal) => !openConfirmationModal), [ setOpenConfirmationModal ],
  )

  const handleMenuIconClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
  }

  const handelRemoveChannel = () => {
    dispatch(deleteChannel({ categoryId, channelId, title }))
    toggleConfirmationModal()
    handleMenuClose()
  }

  /* Edit Channel Action methods */
  const handleEditButtonClick = useCallback(() => {
    setOpenEditChannelModal(true)
  }, [ setOpenEditChannelModal ])

  const handleEditGroupCancel = useCallback(() => {
    handleMenuClose()
    setOpenEditChannelModal(false)
  })

  const handleEditChannelSubmit = useCallback((data) => {
    handleMenuClose()
    dispatch(updateChannel({
      channel_id: channelId,
      category_id: categoryId,
      channel_title: data.title,
      channel_description: data.description,
      is_public: data.isPublic,
      is_company_ann: data.isCompanyAnn,
    }))
    setOpenEditChannelModal(false)
  }, [ setOpenEditChannelModal, dispatch ])

  return (
    <>
      {(ownerId === userDetails.user_id) && (
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
          {/* Edit Button */}
          <MenuItem onClick={ handleEditButtonClick }>
            <FontAwesomeIcon icon={ faPencilAlt } />
            <span className='menu-item'>
              Edit
            </span>
          </MenuItem>
          {/* Remove Button */}
          <MenuItem onClick={ toggleConfirmationModal }>
            <FontAwesomeIcon icon={ faTrash } />
            <span className='menu-item'>
              Remove
            </span>
          </MenuItem>
        </Menu>
      </div>
      <AddUpdateChannelModal
        open={ openEditChannelModal }
        handleClose={ handleEditGroupCancel }
        onSubmit={ handleEditChannelSubmit }
        isEdit
        modalFields={
          {
            title,
            description,
            isPublic,
            isCompanyAnn,
          }
        }
      />
      <ConfirmationModal
        open={ openConfirmationModal }
        handleClose={ toggleConfirmationModal }
        handleConfirm={ handelRemoveChannel }
        message={ `Are you sure want to delete "${ title }" channel?` }
      />
    </>
  )
}

ChannelActions.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  channelId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
  isPublic: PropTypes.bool.isRequired,
  isCompanyAnn: PropTypes.bool.isRequired,
}

export default ChannelActions
