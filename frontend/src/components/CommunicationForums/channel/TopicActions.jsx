import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash } from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button,
} from '@material-ui/core'
import { ownerDetails } from '../forumValidators'
import { deleteTopic } from '../../../redux-saga/redux/actions'
import './style.scss'

const TopicActions = ({
  topicTitle, topicId, topicOwner,
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

  const deleteTopicHandler = useCallback(() => {
    dispatch(deleteTopic({ topicId, topicTitle }))
    setOpen(false)
  }, [ topicId, topicTitle, dispatch ])

  return (
    <div className='dropdown is-right dropdown-trigger styled-dropdown is-round'>
      {(topicOwner.userId === userDetails.user_id) && (
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
      <div className='topic-dropdown'>
        <Menu
          classes={ {
            paper: 'topic-dropdown-menu',
          } }
          id='menu'
          anchorEl={ anchorEl }
          keepMounted
          open={ Boolean(anchorEl) }
          onClose={ handleClose }
        >
          <MenuItem onClick={ handleDialogOpen }>
            <FontAwesomeIcon icon={ faTrash } />
            <span className='remove'>
              Remove
            </span>
          </MenuItem>
        </Menu>
      </div>
      <div>
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
            <Button onClick={ deleteTopicHandler } color='primary' autoFocus>
              Delete
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  )
}

TopicActions.propTypes = {
  topicId: PropTypes.number.isRequired,
  topicTitle: PropTypes.string.isRequired,
  topicOwner: ownerDetails.isRequired,
}

export default TopicActions
