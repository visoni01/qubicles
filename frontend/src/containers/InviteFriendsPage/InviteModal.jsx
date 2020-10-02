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
      window.open(result.message, '_blank')
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
          <div className='invite-text '>
            <h2>
              Invite friends &amp; earn up to
              {' '}
              <span className='price'>$5</span>
              {' '}
              and free crypto
            </h2>
          </div>
          <div className='invite-content '>
            <p>
              <b>You get $5 credit plus 1 free QBE token </b>
              for each friend that
              <br />
              signs up using your link, up to $100. Your friend also
              <br />
              receives $5 credit to use toward the service.
            </p>
          </div>
          <div className='email-section'>
            <p className>
              Add emails
            </p>
            <div className='email-align'>
              {/* Manual Invite */}
              <input
                value={ manualEmails }
                onChange={ (event) => setManualEmails(event.target && event.target.value) }
                type='text'
                name
                placeholder='Separate emails with commas'
              />
              <Button
                variant='contained'
                color='primary'
                className='button-primary-small send-button'
                classes={ { label: 'primary-label' } }
                onClick={ handleManualEmails }
              >
                Send
              </Button>
            </div>
            <div className='or'>
              or
            </div>
            <div className='gmail-contact'>
              <Button
                variant='contained'
                className='button-secondary-large'
                classes={ { label: 'secondary-label' } }
                color='primary'
                onClick={ handleInviteWithGoogle }
              >
                <FontAwesomeIcon icon={ faEnvelope } className='mail-icon ' />
                Invite Gmail Contacts
              </Button>
            </div>
            <div className='share-links'>
              <p className='mt-3 mb-0 '>
                Share link via social media
              </p>
              <ul className='columns is-flex'>

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
              </ul>
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
