import React, { useState, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, Button, IconButton,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faLink, faEnvelope } from '@fortawesome/free-solid-svg-icons'
import './style.scss'
import { TwitterIcon, LinkedinIcon, FacebookIcon } from 'react-share'
import { useDispatch, useSelector } from 'react-redux'
import { showSuccessMessage } from '../../redux-saga/redux/actions'
import { inviteRequestStart } from '../../redux-saga/redux/invitePage'
import invitePopup from '../../assets/images/popup.png'

const InviteModal = ({
  open, handleClose,
}) => {
  const dispatch = useDispatch()
  const inviteReducerStore = useSelector((state) => state.invitePage)
  const { inviteLink } = useSelector((state) => state.postSignUp)
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
    <div className='invite-container'>
      <Dialog
        open={ open }
        onClose={ handleClose }
      >
        <div className='is-flex'>
          <DialogActions className='cross-button'>
            <IconButton className='is-size-6 mt-10' onClick={ handleClose }>
              <FontAwesomeIcon icon={ faTimes } />
            </IconButton>
          </DialogActions>
        </div>
        <div>
          <section className='popup-section'>
            <div className='w-50 m-auto popup-bg'>
              <div>
                <span className='fa fa-times pull-right' />
              </div>
              <div className='has-text-centered popup-image'>
                <img src={ invitePopup } alt='popup' />
              </div>
              <div className='invite-text has-text-centered'>
                <h2>
                  Invite friends &amp; earn up to
                  {' '}
                  <span className='price'>$5</span>
                  {' '}
                  and free crypto
                </h2>
              </div>
              <div className='invite-content has-text-centered'>
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
                  <input type='text' name placeholder='Separate emails with commas' />
                  <Button
                    variant='contained'
                    color='primary'
                    className='sharemodal-buttons'
                    onClick={ handleManualEmails }
                  >
                    Send
                  </Button>
                </div>
                <center className='py-3'>or</center>
                <div className='gmail-contact'>
                  <Button
                    variant='contained'
                    color='primary'
                    onClick={ handleInviteWithGoogle }
                  >
                    <FontAwesomeIcon icon={ faEnvelope } className='mail-icon pr-3' />
                    Invite Gmail Contacts
                  </Button>
                </div>
                <div className='share-links'>
                  <p className='mt-3 mb-0 has-text-centered'>
                    Share link via social media
                  </p>
                  <ul className='m-0 pl-0 has-text-centered columns is-flex'>
                    <li>
                      <a href='#' className='fb'>
                        <FacebookIcon className='fb' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='tw'>
                        <TwitterIcon className='tw' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='in'>
                        <LinkedinIcon className='in' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='link'>
                        <FontAwesomeIcon icon={ faLink } className='link' onClick={ handleCopyToClipboard } />
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>

      </Dialog>
    </div>
  )
}

InviteModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
}

export default InviteModal
