import React, { useState, useCallback } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faChevronDown, faChevronUp, faEllipsisV, faTrash, faPlus,
} from '@fortawesome/free-solid-svg-icons'
import { Menu, MenuItem } from '@material-ui/core'
import ChannelListItem from './ChannelListItem'
import { deleteCategory, addNewChannel } from '../../../redux-saga/redux/actions'
import NewChannelModal from '../channel/NewChannel'

const CategoryWrap = ({
  id, title, owner, channels,
}) => {
  const dispatch = useDispatch()

  const [ showInfo, setShowInfo ] = useState(false)
  const { userDetails } = useSelector((state) => state.login)
  const [ openNewChannelModal, setOpenNewChannelModal ] = useState(false)

  const setShowInfoCB = useCallback(() => {
    setShowInfo((currentState) => !currentState)
  }, [ setShowInfo ])

  const [ anchorEl, setAnchorEl ] = useState(null)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleDelete = useCallback(() => {
    setAnchorEl(null)
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
    <div className='forum-wrap'>
      <div className='forum-container'>
        {/* toggle button to show group info */}
        <div className='toggle-button'>
          <FontAwesomeIcon icon={ showInfo ? faChevronUp : faChevronDown } onClick={ setShowInfoCB } />
        </div>
        {/* Heading */}
        <div className='channel-heading'>
          <h3>{title}</h3>

          {/* Forum category dropdown */}
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
                  onClick={ handleDelete }
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
        </div>
        {/* Channels list */}
        {channels.map((channel) => <ChannelListItem { ...channel } key={ `${ channel.id }` } />)}
      </div>
      <NewChannelModal
        open={ openNewChannelModal }
        handleClose={ toggleNewChannelModal }
        onSubmit={ handleNewChannelSubmit }
      />
    </div>
  )
}

CategoryWrap.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  owner: PropTypes.number.isRequired,
  channels: PropTypes.arrayOf(PropTypes.oneOfType([ PropTypes.object ])).isRequired,
}

export default CategoryWrap
