import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../../redux-saga/redux/forum/actions'

const ChannelActions = ({
  categoryId, channelId, title, ownerId,
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

  const handelRemoveChannel = () => {
    dispatch(deleteChannel({ categoryId, channelId, title }))
    handleClose()
  }
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
        </Menu>
      </div>
    </>
  )
}

ChannelActions.propTypes = {
  title: PropTypes.string.isRequired,
  channelId: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
}

export default ChannelActions
