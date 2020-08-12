import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faBell, faEllipsisV, faTrash, faPenAlt, faPencilAlt,
} from '@fortawesome/free-solid-svg-icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel, updateChannel } from '../../../redux-saga/redux/forum/actions'
import NewChannel from '../channel/NewChannel'

const ChannelActions = ({
  categoryId, channelId, title, ownerId, description, isPublic, isCompanyAnn,
}) => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)

  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openEditChannelModal, setOpenEditChannelModal ] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handelRemoveChannel = () => {
    dispatch(deleteChannel({ categoryId, channelId, title }))
    handleClose()
  }

  const toggleEditChannelModal = useCallback(() => setOpenEditChannelModal(
    // eslint-disable-next-line
    (openEditChannelModal) => !openEditChannelModal,
  ), [ setOpenEditChannelModal ])

  const handleEditChannel = useCallback((data) => {
    setAnchorEl(null)
    dispatch(updateChannel({
      channel_id: channelId,
      category_id: categoryId,
      channel_title: data.title,
      channel_description: data.description,
      is_public: data.isPublic,
      is_company_ann: data.isCompanyAnn,
    }))
    setOpenEditChannelModal(false)
  })

  return (
    <>
      {(ownerId === userDetails.user_id) && (
      <IconButton onClick={ handleClick }>
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
          onClose={ handleClose }
        >
          <MenuItem onClick={ handelRemoveChannel }>
            <FontAwesomeIcon icon={ faTrash } />
            <span className='menu-item'>
              Remove
            </span>
          </MenuItem>
          <MenuItem onClick={ toggleEditChannelModal }>
            <FontAwesomeIcon icon={ faPencilAlt } />
            <span className='remove'>
              Edit
            </span>
          </MenuItem>
        </Menu>
      </div>
      <NewChannel
        open={ openEditChannelModal }
        handleClose={ toggleEditChannelModal }
        onSubmit={ handleEditChannel }
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
