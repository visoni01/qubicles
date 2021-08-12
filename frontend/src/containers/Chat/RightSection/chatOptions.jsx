import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import ConfirmationModal from '../../../components/CommonModal/confirmationModal'
import AddPeople from '../Common/addPeople'
import { allChatsRequestStart } from '../../../redux-saga/redux/chat'

const ChatOptions = ({ isGroup, conversationId }) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmBlockModal, setOpenConfirmBlockModal ] = useState(false)
  const [ openAddPeopleModal, setOpenAddPeopleModal ] = useState(false)
  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    setOpenOptions(false)
    setAnchorEl(null)
  }, [])

  const handleChatOptionsClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmBlockModal(false)
  }, [])

  const handleOpenAddPeopleModal = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenAddPeopleModal(true)
  }, [])

  const handleMarkAsUnread = useCallback(() => {
    dispatch(allChatsRequestStart({
      requestType: 'UPDATE',
      dataType: 'mark-as-unread',
      conversationId,
    }))
    setAnchorEl(null)
    setOpenOptions(false)
  }, [ dispatch, conversationId ])

  return (
    <>
      <IconButton
        className='options-icon'
        onClick={ handleChatOptionsClick }
        disableRipple
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-md light' />
      </IconButton>
      <Popover
        open={ openOptions }
        anchorEl={ anchorEl }
        onClose={ handleClose }
        elevation={ 0 }
        anchorOrigin={ {
          vertical: 'bottom',
          horizontal: 'right',
        } }
        transformOrigin={ {
          vertical: 'top',
          horizontal: 'right',
        } }
        classes={ {
          paper: 'chat-options-popover',
        } }
      >
        <div className='ellipsis-options-menu border-2'>
          {isGroup && (
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ handleOpenAddPeopleModal }
          >
            <p className='para'> Add People </p>
          </Button>
          )}
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ handleMarkAsUnread }
          >
            <p className='para'> Mark as unread </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            onClick={ () => setOpenConfirmBlockModal(true) }
          >
            <p className='para red'>
              Delete Chat
            </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmBlockModal }
        handleClose={ handleCancelActivity }
        handleConfirm={ () => {} }
        message='Are you sure you want to delete this chat?'
        confirmButtonText='Yes'
      />
      <AddPeople
        open={ openAddPeopleModal }
        handleCancel={ () => setOpenAddPeopleModal(false) }
        actionType='ADD_PEOPLE'
        conversationId={ conversationId }
      />
    </>
  )
}

ChatOptions.defaultProps = {
  isGroup: false,
}

ChatOptions.propTypes = {
  isGroup: PropTypes.bool,
  conversationId: PropTypes.number.isRequired,
}

export default ChatOptions
