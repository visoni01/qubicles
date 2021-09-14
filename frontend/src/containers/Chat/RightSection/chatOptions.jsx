/* eslint-disable complexity */
import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import ConfirmationModal from '../../../components/CommonModal/confirmationModal'
import AddPeople from '../Common/addPeople'
import { allChatsRequestStart, chatDataRequestStart } from '../../../redux-saga/redux/chat'
import { MenuIcon } from '../../../assets/images/common'
import { LogoutIcon } from '../../../assets/images/icons/navBarIcons'
import { DeleteIcon } from '../../../assets/images/training'
import { AddPeopleIcon, MarkAsUnreadIcon } from '../../../assets/images/chat'

const ChatOptions = ({
  isGroup, conversationId, isRemoved, isAllRead,
}) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmDeleteModal, setOpenConfirmDeleteModal ] = useState(false)
  const [ openConfirmLeaveModal, setOpenConfirmLeaveModal ] = useState(false)
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
    handleClose()
    setOpenConfirmDeleteModal(false)
    setOpenConfirmLeaveModal(false)
  }, [ handleClose ])

  const handleOpenAddPeopleModal = useCallback(() => {
    handleClose()
    setOpenAddPeopleModal(true)
  }, [ handleClose ])

  const handleMarkAsUnread = useCallback(() => {
    dispatch(allChatsRequestStart({
      requestType: 'UPDATE',
      dataType: 'mark-as-unread',
      conversationId,
    }))
    handleClose()
  }, [ conversationId, dispatch, handleClose ])

  const handleDeleteChat = useCallback(() => {
    // TODO
    setOpenConfirmDeleteModal(false)
    handleClose()
  }, [ handleClose ])

  const handleLeaveGroup = useCallback(() => {
    dispatch(chatDataRequestStart({
      requestType: 'UPDATE',
      dataType: 'leave-group',
      conversationId,
    }))
    setOpenConfirmLeaveModal(false)
    handleClose()
  }, [ dispatch, conversationId, handleClose ])

  return (
    <>
      <IconButton
        className='options-icon'
        onClick={ handleChatOptionsClick }
        disableRipple
      >
        <MenuIcon className='mt-5' />
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
          {isGroup && !isRemoved && (
            <Button
              size='small'
              className='option padding-8'
              classes={ { label: 'option-label' } }
              onClick={ handleOpenAddPeopleModal }
              startIcon={ <AddPeopleIcon className='mr-5' /> }
            >
              <p className='para'>Add People</p>
            </Button>
          )}

          {!isRemoved && isAllRead && (
            <Button
              size='small'
              className='option padding-8'
              classes={ { label: 'option-label' } }
              onClick={ handleMarkAsUnread }
              startIcon={ <MarkAsUnreadIcon className='mr-5' /> }
            >
              <p className='para'>Mark as unread</p>
            </Button>
          )}

          <Button
            size='small'
            className='option padding-8'
            classes={ { label: 'option-label' } }
            onClick={ () => setOpenConfirmDeleteModal(true) }
            startIcon={ <DeleteIcon className='custom-svg-icon color-red mr-5' /> }
          >
            <p className='para red'>Delete Chat</p>
          </Button>

          {isGroup && !isRemoved && (
            <Button
              size='small'
              className='option padding-8'
              classes={ { label: 'option-label' } }
              onClick={ () => setOpenConfirmLeaveModal(true) }
              startIcon={ <LogoutIcon className='mr-5' /> }
            >
              <p className='para red'>Leave Group</p>
            </Button>
          )}
        </div>
      </Popover>

      <ConfirmationModal
        open={ openConfirmDeleteModal || openConfirmLeaveModal }
        handleClose={ handleCancelActivity }
        handleConfirm={ openConfirmDeleteModal ? handleDeleteChat : handleLeaveGroup }
        message={ openConfirmDeleteModal
          ? 'Are you sure you want to delete this chat ?'
          : 'Are you sure you want to leave the group ?' }
        confirmButtonText='Yes'
      />

      {openAddPeopleModal && (
        <AddPeople
          open={ openAddPeopleModal }
          handleCancel={ () => setOpenAddPeopleModal(false) }
          actionType='ADD_PEOPLE'
          conversationId={ conversationId }
        />
      )}
    </>
  )
}

ChatOptions.defaultProps = {
  isGroup: false,
  conversationId: null,
  isRemoved: false,
  isAllRead: false,
}

ChatOptions.propTypes = {
  isGroup: PropTypes.bool,
  conversationId: PropTypes.number,
  isRemoved: PropTypes.bool,
  isAllRead: PropTypes.bool,
}

export default ChatOptions
