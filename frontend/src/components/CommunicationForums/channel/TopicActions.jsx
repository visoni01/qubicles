import React, { useCallback, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV, faTrash, faPencilAlt } from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem,
  Dialog, DialogActions, DialogTitle, Button, IconButton,
} from '@material-ui/core'
import { ownerDetails } from '../forumValidators'
import { deleteTopic, updateTopic } from '../../../redux-saga/redux/actions'
import './style.scss'
import EditTopic from './TopicModal'

const TopicActions = ({
  topicTitle, topicId, topicOwner, topicDescription, isPublic, tags,
}) => {
  const dispatch = useDispatch()
  const { userDetails } = useSelector((state) => state.login)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openEditModal, setOpenEditModal ] = useState(false)
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
  }, [ dispatch ])

  const toggleEditModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenEditModal((openEditModal) => !openEditModal)
    handleClose()
  }, [ setOpenEditModal ])

  const submitEditedTopic = useCallback((topicData) => {
    dispatch(updateTopic({ ...topicData, topicId }))
    setOpenEditModal(false)
  }, [ setOpenEditModal ])

  return (
    <div className='dropdown is-right dropdown-trigger styled-dropdown is-round'>
      {(topicOwner.userId === userDetails.user_id) && (
        <IconButton onClick={ handleClick }>
          <FontAwesomeIcon icon={ faEllipsisV } className='is-size-6' />
        </IconButton>
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
            <span className='menu-item'>
              Remove
            </span>
          </MenuItem>
          <MenuItem onClick={ toggleEditModal }>
            <FontAwesomeIcon icon={ faPencilAlt } />
            <span className='menu-item'>
              Edit
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
      <EditTopic
        open={ openEditModal }
        handleClose={ toggleEditModal }
        onSubmit={ submitEditedTopic }
        editTopicData={ {
          title: topicTitle,
          description: topicDescription,
          isPublic,
          tags,
        } }
        isEdit
      />
    </div>
  )
}

TopicActions.defaultProps = {
  topicDescription: '',
  isPublic: false,
  tags: [],
}

TopicActions.propTypes = {
  topicId: PropTypes.number.isRequired,
  topicTitle: PropTypes.string.isRequired,
  topicOwner: PropTypes.number.isRequired,
  topicDescription: PropTypes.string,
  isPublic: PropTypes.bool,
  tags: PropTypes.shape([]),
}

export default TopicActions
