import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, TextField, Divider,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  FacebookShareButton,
  TwitterShareButton,
  LinkedinShareButton,
} from 'react-share'
import { faEnvelope, faCopy } from '@fortawesome/free-solid-svg-icons'
import { inviteRequestStart } from '../../redux-saga/redux/invitePage'
import { showSuccessMessage } from '../../redux-saga/redux/snackbar'

const ShareModal = () => {
  const dispatch = useDispatch()
  const inviteReducerStore = useSelector((state) => state.invitePage)
  const { userDetails } = useSelector((state) => state.login)
  const { inviteLink } = userDetails
  const [ manualEmails, setManualEmails ] = useState()
  const {
    isLoading, success, result, type,
  } = inviteReducerStore

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

  const handleCopyToClipboard = () => {
    dispatch(showSuccessMessage({ msg: 'Link copied' }))
    navigator.clipboard.writeText(inviteLink || 'invite link')
  }

  return (
    <>
      <div className='shareModal-email-div'>
        <Button
          variant='contained'
          color='secondary'
          className='sharemodal-buttons'
          startIcon={ <FontAwesomeIcon icon={ faEnvelope } /> }
          onClick={ handleInviteWithGoogle }
        >
          Invite Gmail Contacts
        </Button>
        <span className='shareModal-span'>Or</span>
        <div className='shareModal-add-email'>
          <TextField
            id='add-email-input'
            label='Add Email'
            type='text'
            variant='outlined'
            size='small'
            className='shareModal-add-email-textbox'
            value={ manualEmails }
            onChange={ (event) => setManualEmails(event.target && event.target.value) }
          />
          <span className='shareModal-add-email-span'>
            Separate emails with commas
          </span>
        </div>
        <Button
          variant='contained'
          color='primary'
          className='sharemodal-buttons'
          onClick={ handleManualEmails }
        >
          Send
        </Button>
      </div>
      <Divider className='shareModal-divider' />
      <div className='shareModal-email-div'>
        <div>
          <h4 className='shareModal-social-h4'>Your Invite Link</h4>
          <div>
            <TextField
              id='invite-link-input'
              type='text'
              variant='outlined'
              size='small'
              value={ inviteLink || 'Invite Link' }
              InputProps={ {
                readOnly: true,
              } }
            />
            <Button
              variant='contained'
              className='sharemodal-buttons'
              onClick={ handleCopyToClipboard }
              startIcon={ <FontAwesomeIcon icon={ faCopy } /> }
            >
              Copy
            </Button>
          </div>
        </div>
        <div className='shareModal-invite-link'>
          <h4 className='shareModal-social-h4'>Share Via Social</h4>
          <div>
            <FacebookShareButton
              url={ inviteLink || 'Invite Link' } // Temporary setup.
              quote='Qubicles invite link'
            >
              <Button
                variant='contained'
                color='primary'
                className='sharemodal-buttons shareModal-invite-fb facebook'
              >
                Facebook
              </Button>
            </FacebookShareButton>
            <TwitterShareButton
              url={ inviteLink || 'Invite Link' } // Temporary setup.
              title='Invite link'
            >
              <Button
                variant='contained'
                color='primary'
                className='sharemodal-buttons shareModal-invite-fb twitter'
              >
                Twitter
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton
              url={ inviteLink || 'invite link' } // Temporary setup.
            >
              <Button
                variant='contained'
                color='primary'
                className='sharemodal-buttons linkedin'
              >
                LinkedIn
              </Button>
            </LinkedinShareButton>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareModal
