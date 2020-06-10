import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField, Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { inviteRequestStart } from '../../redux-saga/redux/invitePage'

const ShareModal = () => {
  const dispatch = useDispatch()
  const inviteReducerStore = useSelector( ( state ) => state.invitePage )
  const [ manualEmails, setManualEmails ] = useState()

  const handleManualEmails = () => {
    if(!manualEmails) return
    const emails = manualEmails.split(',')
    dispatch(inviteRequestStart({ type: 'inviteManual', body: { emails } }))
  }

  const handleInviteWithGoogle = () => dispatch(inviteRequestStart({ type: 'inviteWithGoogle' }))

  const handleCopyToClipboard = () => navigator.clipboard.writeText( 'invite link' ) // Has to set invite link.

  return (
    <>
      <div className="shareModal-email-div">
        <Button
          variant="contained"
          color="secondary"
          className="sharemodal-buttons"
          startIcon={ <FontAwesomeIcon icon={ faEnvelope } /> }
          onClick={ handleInviteWithGoogle }
        >
          Invite Gmail Contacts
        </Button>
        <span className="shareModal-span">Or</span>
        <div className="shareModal-add-email">
          <TextField
            id="add-email-input"
            label="Add Email"
            type="text"
            variant="outlined"
            size="small"
            className="shareModal-add-email-textbox"
            onChange={ ( event ) => setManualEmails( event.target && event.target.value ) }
          />
          <span className="shareModal-add-email-span">
            Separate emails with commas
          </span>
        </div>
        <Button
          variant="contained"
          color="primary"
          className="sharemodal-buttons"
          onClick={ handleManualEmails }
        >
          Send
        </Button>
      </div>
      <Divider className="shareModal-divider" />
      <div className="shareModal-email-div">
        <div>
          <h4 className="shareModal-social-h4">Your Invite Link</h4>
          <div>
            <TextField
              id="invite-link-input"
              type="text"
              variant="outlined"
              size="small"
              value="invite link"
              InputProps={ {
                readOnly: true,
              } }
            />
            <Button variant="contained" className="sharemodal-buttons" onClick={ handleCopyToClipboard }>
              Copy
            </Button>
          </div>
        </div>
        <div className="shareModal-invite-link">
          <h4 className="shareModal-social-h4">Share Via Social</h4>
          <div>
            <Button
              variant="outlined"
              color="primary"
              className="sharemodal-buttons shareModal-invite-fb"
            >
              Facebook
            </Button>
            <Button
              variant="outlined"
              color="primary"
              className="sharemodal-buttons"
            >
              Twitter
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

export default ShareModal
