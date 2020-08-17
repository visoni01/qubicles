import React, { useCallback, useState } from 'react'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faEllipsisV, faTrash, faPencilAlt, faCommentsDollar,
} from '@fortawesome/free-solid-svg-icons'
import {
  Menu, MenuItem, Dialog, IconButton,
} from '@material-ui/core'
import { deleteTopicComment, updateComment } from '../../../redux-saga/redux/actions'
import './style.scss'
import ConfirmationModal from '../../CommonModal/ConfirmationModal'
import EditCommentModal from './CommentModal'

const TopicActions = ({
  isOwner, postId, comment,
}) => {
  const dispatch = useDispatch()
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openEditModal, setOpenEditModal ] = useState(false)
  const [ open, setOpen ] = useState(false)

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const toggleConfirmationModal = useCallback(() => {
    // eslint-disable-next-line
    setOpen((open) => {
      if (open) {
        setAnchorEl(null)
      }
      return (!open)
    })
  }, [])

  const deleteCommentHandler = useCallback(() => {
    dispatch(deleteTopicComment({ postId }))
    setOpen(false)
  }, [ dispatch ])

  const toggleEditModal = useCallback(() => {
    // eslint-disable-next-line
    setOpenEditModal((openEditModal) => !openEditModal)
    handleClose()
  }, [ setOpenEditModal ])

  const submitEditedComment = useCallback((postData) => {
    dispatch(updateComment({ postData, postId }))
    setOpenEditModal(false)
  }, [ setOpenEditModal ])

  return (
    <div className='dropdown is-right dropdown-trigger styled-dropdown is-round'>
      {isOwner && (
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
          <MenuItem onClick={ toggleConfirmationModal }>
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
      <EditCommentModal
        commentData={ comment }
        open={ openEditModal }
        handleClose={ toggleEditModal }
        handleSubmit={ submitEditedComment }
        isEdit
      />
      <ConfirmationModal
        open={ open }
        handleClose={ toggleConfirmationModal }
        handleConfirm={ deleteCommentHandler }
        message='Are you sure want to delete this comment?'
      />
    </div>
  )
}

TopicActions.propTypes = {
  isOwner: PropTypes.number.isRequired,
  postId: PropTypes.number.isRequired,
  comment: PropTypes.string.isRequired,
}

export default TopicActions
