import React, { useState, useEffect, useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPaperclip, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import {
  TwitterIcon, LinkedinIcon, FacebookIcon, TwitterShareButton, FacebookShareButton, LinkedinShareButton,
} from 'react-share'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { showSuccessMessage, resetInviteRequest, inviteRequestStart } from '../../redux-saga/redux/actions'
import invitePopup from '../../assets/images/popup.png'
import InviteManual from './InviteManual'

const InviteModal = ({ open, handleClose }) => {
  const [ manualEmails, setManualEmails ] = useState([])

  const inviteReducerStore = useSelector((state) => state.invitePage)
  const { userDetails } = useSelector((state) => state.login)

  const dispatch = useDispatch()
  const inviteLink = userDetails && userDetails.inviteLink
  const {
    isLoading, success, result, type,
  } = inviteReducerStore

  useEffect(() => {
    if (!isLoading && success) {
      if (type === 'invite-with-google') { window.open(result, '_blank') }
      if (type === 'invite-manual') {
        setManualEmails([])
        dispatch(showSuccessMessage({ msg: 'Emails Invited Successfully!' }))
      }
    }
    dispatch(resetInviteRequest())
  }, [ isLoading, dispatch, type, success, result ])

  const handleCopyToClipboard = () => {
    dispatch(showSuccessMessage({ msg: 'Link copied' }))
    navigator.clipboard.writeText(inviteLink || 'invite link')
  }

  const handleManualEmails = useCallback(() => {
    dispatch(inviteRequestStart({ type: 'invite-manual', body: { emails: manualEmails } }))
  }, [ manualEmails, dispatch ])

  const handleInviteWithGoogle = () => dispatch(inviteRequestStart({ type: 'invite-with-google' }))

  return (
    <Dialog
      disableScrollLock
      scroll='body'
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal invite-container'
    >
      <div className='is-flex'>
        <DialogActions className='cross-button'>
          <IconButton className='is-size-6 mt-10' onClick={ handleClose }>
            <FontAwesomeIcon icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <div className='popup-section'>
        <div className='popup-bg'>
          <div className='popup-image'>
            <img src={ invitePopup } alt='popup' />
          </div>
          <div>
            <h2 className='h2 pt-30 pb-20 text-center'>
              Invite friends &amp; earn up to
              {' '}
              <span className='price'> $100 </span>
              {' '}
              in free tokens
            </h2>
          </div>
          <p className='para pt-10 pb-30 text-center'>
            <b> Earn $5 for inviting friends, plus 1 QBE token ($1 each) </b>
            {' '}
            for every
            person that signs up using your link, up to $100. Your friend
            {/* eslint-disable-next-line react/jsx-child-element-spacing */}
            <br />
            also receives $5 credit to use toward the service.
          </p>
          <div>
            <p className='h3'> Add emails </p>
            {/* Manual Invite */}
            <div className='email-align mt-10'>
              <InviteManual
                setManualEmails={ setManualEmails }
                manualEmails={ manualEmails }
              />
              <Button
                classes={ {
                  root: 'button-primary-small send-button',
                  label: 'button-primary-small-label',
                } }
                onClick={ handleManualEmails }
                disabled={ _.isEmpty(manualEmails) }
              >
                Send
              </Button>
            </div>
            <p className='para bold light pt-10 pb-10 text-center'> or </p>
            <div>
              <Button
                className='mt-10 mb-30 wide-button'
                classes={ {
                  root: 'button-secondary-large',
                  label: 'button-secondary-large-label',
                } }
                onClick={ handleInviteWithGoogle }
                startIcon={
                  <FontAwesomeIcon icon={ faEnvelope } className='mr-10' />
                }
              >
                Invite Gmail Contacts
              </Button>
            </div>
            <div className='mt-10'>
              <p className='mt-10 mb-10 para bold text-center'>
                Share link via social media
              </p>
              <div className='columns is-flex share-links'>
                {/* Facebook Share Button */}
                <FacebookShareButton
                  url={ inviteLink || 'Invite Link' }
                  quote='Qubicles invite link'
                >
                  <Button>
                    <FacebookIcon className='fb' />
                  </Button>
                </FacebookShareButton>

                {/* Twitter Share Button */}
                <TwitterShareButton
                  url={ inviteLink || 'Invite Link' }
                  title='Invite link'
                  hashtags={ [ 'qubicles' ] }
                >
                  <Button>
                    <TwitterIcon className='tw' />
                  </Button>
                </TwitterShareButton>

                {/* Linkedin Share Button */}
                <LinkedinShareButton
                  url={ inviteLink || 'Invite Link' }
                  title='Invite link'
                >
                  <Button>
                    <LinkedinIcon className='in' />
                  </Button>
                </LinkedinShareButton>

                {/* Copy Invite Link Button */}
                <IconButton className='link'>
                  <FontAwesomeIcon className='clip-icon' icon={ faPaperclip } onClick={ handleCopyToClipboard } />
                </IconButton>
              </div>
            </div>
          </div>
        </div>
      </div>

    </Dialog>
  )
}

InviteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default InviteModal
