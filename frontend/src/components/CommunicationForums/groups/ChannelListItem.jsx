import React, { useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBell, faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import { Link } from 'react-router-dom'
import { IconButton, Menu, MenuItem } from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { deleteChannel } from '../../../redux-saga/redux/forum/actions'

const ActionDropdown = ({ anchorEl, handleClose, removeChannel }) => (
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
      <MenuItem onClick={ removeChannel }>
        <FontAwesomeIcon icon={ faTrash } />
        <span className='remove'>
          Remove
        </span>
      </MenuItem>
    </Menu>
  </div>
)

const ChannelListItem = ({
  notifications, title, description, noOfTopics, id, categoryId, ownerId,
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
    dispatch(deleteChannel({ categoryId, channelId: id, title }))
    handleClose()
  }

  return (
    <div className='forum-channel'>
      <Link to={ `/group/channels/${ id }` } className='channel-link'>
        <div className='channel-icon'>
          <FontAwesomeIcon icon={ faBell } />
          {/* New Topics */}
          <div className='new-indicator'>
            <span>{notifications}</span>
          </div>
        </div>
        <div className='channel-meta'>
          <span>{title}</span>
          <span>{description}</span>
        </div>
        <div className='channel-topics pl-10'>
          <span>Topics</span>
          <span>{noOfTopics}</span>
        </div>
      </Link>
      {(ownerId === userDetails.user_id) && (
      <IconButton onClick={ handleClick }>
        <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
      </IconButton>
      )}
      <ActionDropdown anchorEl={ anchorEl } handleClose={ handleClose } removeChannel={ handelRemoveChannel } />
    </div>
  )
}

ChannelListItem.defaultProps = {
  notifications: 3,
  noOfTopics: 0,
  description: '',
}

ChannelListItem.propTypes = {
  notifications: PropTypes.number,
  title: PropTypes.string.isRequired,
  description: PropTypes.string,
  noOfTopics: PropTypes.number,
  id: PropTypes.number.isRequired,
  categoryId: PropTypes.number.isRequired,
  ownerId: PropTypes.number.isRequired,
}

ActionDropdown.propTypes = {
  anchorEl: PropTypes.string.isRequired,
  handleClose: PropTypes.func.isRequired,
  removeChannel: PropTypes.func.isRequired,
}

export default ChannelListItem
