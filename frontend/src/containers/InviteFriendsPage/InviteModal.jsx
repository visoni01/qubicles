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

const InviteModal = ({
  open, handleClose, handleConfirm,
}) => {
  const dispatch = useDispatch()
  const { inviteLink } = useSelector((state) => state.postSignUp)
  const [ manualEmails, setManualEmails ] = useState()

  const handleCopyToClipboard = () => {
    dispatch(showSuccessMessage({ msg: 'Link copied' }))
    navigator.clipboard.writeText(inviteLink || 'invite link')
  }

  const handleManualEmails = () => {
    if (!manualEmails) return
    const emails = manualEmails.split(',')
    dispatch(inviteRequestStart({ type: 'invite-manual', body: { emails } }))
  }

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
              <div className='text-center popup-image'>
                {/* <img src='../../assets/images/bg-invitation-page.jpg' alt='popup' /> */}
                <i />
              </div>
              <div className='invite-text text-center'>
                <h2>
                  Invite friends &amp; earn up to
                  {' '}
                  <span className='price'>$5</span>
                  {' '}
                  and free crypto
                </h2>
              </div>
              <div className='invite-content text-center'>
                <p>
                  <b>You get $5 credit plus 1 free QBE token</b>
                  {' '}
                  for each friend that
                  <br />
                  {' '}
                  signs up using your link, up to $100. Your friend also
                  <br />
                  {' '}
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
                  {/* <button>
                    <FontAwesomeIcon icon={ faEnvelope } className=' fa fa-envelope pr-3' />
                    Invite Gmail Contacts
                  </button> */}
                  <Button
                    variant='contained'
                    color='primary'
                  >
                    <FontAwesomeIcon icon={ faEnvelope } className='pr-3' />
                    Invite Gmail Contacts
                  </Button>
                </div>
                <div className='share-links'>
                  <p className='mt-3 mb-0 text-center'>
                    Share link via social media
                  </p>
                  <ul className='m-0 pl-0 text-center d-flex'>
                    <li>
                      <a href='#' className='fb'>
                        {/* <span className='fa fa-facebook' /> */}
                        <FacebookIcon className='fb' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='tw'>
                        {/* <span className='fa fa-twitter' /> */}
                        <TwitterIcon className='tw' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='in'>
                        {/* <span className='fa fa-linkedin' /> */}
                        <LinkedinIcon className='in' />
                      </a>
                    </li>
                    <li>
                      <a href='#' className='link'>
                        <span className='fa fa-link' />
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
  handleConfirm: PropTypes.func.isRequired,
}

export default InviteModal
