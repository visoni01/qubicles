import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  Button, TextField, Divider, Snackbar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FacebookShareButton, TwitterShareButton, LinkedinShareButton } from 'react-share'
import { faEnvelope } from '@fortawesome/free-solid-svg-icons'
import { inviteRequestStart } from '../../redux-saga/redux/invitePage'

const ShareModal = () => {
  const dispatch = useDispatch()
  const inviteReducerStore = useSelector( ( state ) => state.invitePage )
  const [ manualEmails, setManualEmails ] = useState()
  const [ openSnackbar, setOpenSnackbar ] = useState()
  const {
    isLoading, success, result, type,
  } = inviteReducerStore

  useEffect( () => {
    if ( type === 'invite-with-google' && !isLoading && success ) {
      window.open( result.message, '_blank' )
    }
    if ( success ) {
      setManualEmails( '' )
      setOpenSnackbar( success )
    }
  }, [ isLoading ] )

  const handleManualEmails = () => {
    if ( !manualEmails ) return
    const emails = manualEmails.split( ',' )
    dispatch( inviteRequestStart( { type: 'invite-manual', body: { emails } } ) )
  }

  const handleInviteWithGoogle = () => dispatch( inviteRequestStart( { type: 'invite-with-google' } ) )

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
            value={ manualEmails }
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
            <FacebookShareButton
              url="invite link" // Hard coded temporary, BE is not ready yet.
              quote="Qubicles invite link"
            >
              <Button
                variant="outlined"
                color="primary"
                className="sharemodal-buttons shareModal-invite-fb"
              >
                Facebook
              </Button>
            </FacebookShareButton>
            <TwitterShareButton
              url="Invite link" // Hard coded temporary, BE is not ready yet.
              title="Invite link"
            >
              <Button
                variant="outlined"
                color="primary"
                className="sharemodal-buttons shareModal-invite-fb"
              >
                Twitter
              </Button>
            </TwitterShareButton>
            <LinkedinShareButton
              url="Invite Link" // Hard coded temporary, BE is not ready yet.
            >
              <Button
                variant="outlined"
                color="primary"
                className="sharemodal-buttons"
              >
                LinkedIn
              </Button>
            </LinkedinShareButton>
          </div>
        </div>
      </div>
      {/**
       * Temporary implemented the success message, will remove it when success message general component will ready.
       */}
      <Snackbar open={ openSnackbar } autoHideDuration={ 5000 }>
        <div className="snackbar-div">
          Successfully Invited
        </div>
      </Snackbar>
    </>
  )
}

export default ShareModal
