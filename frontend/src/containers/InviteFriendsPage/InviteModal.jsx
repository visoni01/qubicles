import React, { useState, useEffect } from 'react'
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
import { showSuccessMessage } from '../../redux-saga/redux/actions'
import { inviteRequestStart } from '../../redux-saga/redux/invitePage'
import invitePopup from '../../assets/images/popup.png'

const InviteModal = ({
  open, handleClose,
}) => {
  const dispatch = useDispatch()
  const inviteReducerStore = useSelector((state) => state.invitePage)
  const { userDetails } = useSelector((state) => state.login)
  const { inviteLink } = userDetails
  const [ manualEmails, setManualEmails ] = useState()

  const {
    isLoading, success, result, type,
  } = inviteReducerStore

  const handleCopyToClipboard = () => {
    dispatch(showSuccessMessage({ msg: 'Link copied' }))
    navigator.clipboard.writeText(inviteLink || 'invite link')
  }

  useEffect(() => {
    if (type === 'invite-with-google' && !isLoading && success) {
      window.open(result, '_blank')
    }
    if (success) {
      setManualEmails('')
      dispatch(showSuccessMessage({ msg: 'Successfully Invited' }))
    }
    // eslint-disable-next-line
  }, [ isLoading, dispatch ])

  const handleManualEmails = () => {
    if (!manualEmails) return
    const emails = manualEmails.split(',')
    dispatch(inviteRequestStart({ type: 'invite-manual', body: { emails } }))
  }

  const handleInviteWithGoogle = () => dispatch(inviteRequestStart({ type: 'invite-with-google' }))

  return (
    <Dialog
      disableScrollLock
      open={ open }
      onClose={ handleClose }
      maxWidth='sm'
      className='invite-container'
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
              <span className='price'>$100</span>
              {' '}
              in free tokens
            </h2>
          </div>
          <p className='para pt-10 pb-30 text-center'>
            <b>Earn $5 for inviting friends, plus 1 QBE token ($1 each)</b>
            {' '}
            for every
            person that signs up using your link, up to $100. Your friend
            <br />
            also receives $5 credit to use toward the service.
          </p>
          <div>
            <p className='h3'>
              Add emails
            </p>
            <div className='email-align mt-10'>
              {/* Manual Invite */}
              <input
                value={ manualEmails }
                onChange={ (event) => setManualEmails(event.target && event.target.value) }
                type='text'
                name
                placeholder='Separate emails with commas'
                className='custom-text-input-field mr-10'
              />
              <Button
                variant='contained'
                color='primary'
                classes={ {
                  label: 'MuiButton-label button-primary-small-label',
                  root: 'MuiButtonBase-root button-primary-small is-fullheight',
                } }
                onClick={ handleManualEmails }
              >
                Send
              </Button>
            </div>
            <p className='para bold light pt-10 pb-10 text-center'>
              or
            </p>
            <div>
              <Button
                variant='contained'
                classes={ {
                  label: 'MuiButton-label button-secondary-large-label',
                  root: 'MuiButtonBase-root button-secondary-large wide-button',
                } }
                className='mt-10 mb-30'
                onClick={ handleInviteWithGoogle }
              >
                <FontAwesomeIcon icon={ faEnvelope } className='mr-15' />
                Invite Gmail Contacts
              </Button>
            </div>
            <div>
              <p className='h4 mt-10 mb-10 text-center'>
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
