import React, { useState, useCallback } from 'react'
import {
  Popover, IconButton, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBan, faCopy, faEllipsisV } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { fetchAgentResumeStart, showSuccessMessage } from '../../../../redux-saga/redux/actions'
import ConfirmationModal from '../../../../components/CommonModal/confirmationModal'

const ProfileOptions = ({ candidateId, hasBlockedUser }) => {
  const [ openOptions, setOpenOptions ] = useState(false)
  const [ anchorEl, setAnchorEl ] = useState(null)
  const [ openConfirmBlockModal, setOpenConfirmBlockModal ] = useState(false)

  const dispatch = useDispatch()

  const handleClose = useCallback(() => {
    setOpenOptions(false)
    setAnchorEl(null)
  }, [])

  const handleProfileOptionsClick = useCallback((e) => {
    setOpenOptions((current) => !current)
    setAnchorEl(e.currentTarget)
  }, [])

  const handleCancelActivity = useCallback(() => {
    setAnchorEl(null)
    setOpenOptions(false)
    setOpenConfirmBlockModal(false)
  }, [])

  const handleBlockUser = useCallback(() => {
    dispatch(fetchAgentResumeStart({
      requestType: 'UPDATE',
      candidateId,
      hasBlockedUser: !hasBlockedUser,
    }))
    handleCancelActivity()
  }, [ dispatch, candidateId, hasBlockedUser, handleCancelActivity ])

  const handleCopyProfileUrl = useCallback(() => {
    navigator.clipboard.writeText(window.location.href)
    dispatch(showSuccessMessage({ msg: 'Url copied successfully!' }))
    setAnchorEl(null)
    setOpenOptions(false)
  }, [ dispatch ])

  return (
    <>
      <IconButton
        onClick={ handleProfileOptionsClick }
      >
        <FontAwesomeIcon icon={ faEllipsisV } className='custom-fa-icon sz-md dark' />
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
        className='profile-options'
      >
        <div className='ellipsis-options-menu border-2'>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faBan } className='custom-fa-icon dark' /> }
            onClick={ () => setOpenConfirmBlockModal(true) }
          >
            <p className='para red'>
              {hasBlockedUser ? 'Unblock' : 'Block'}
            </p>
          </Button>
          <Button
            size='small'
            className='option'
            classes={ { label: 'option-label' } }
            startIcon={ <FontAwesomeIcon icon={ faCopy } className='custom-fa-icon dark' /> }
            onClick={ handleCopyProfileUrl }
          >
            <p className='para'> Copy Profile Url </p>
          </Button>
        </div>
      </Popover>
      <ConfirmationModal
        open={ openConfirmBlockModal }
        handleClose={ handleCancelActivity }
        message={ `Are you sure you want to ${ hasBlockedUser ? 'unblock' : 'block' } this user?` }
        confirmButtonText={ hasBlockedUser ? 'Unblock' : 'Block' }
        handleConfirm={ handleBlockUser }
      />
    </>
  )
}

ProfileOptions.propTypes = {
  candidateId: PropTypes.number.isRequired,
  hasBlockedUser: PropTypes.bool.isRequired,
}

export default ProfileOptions
