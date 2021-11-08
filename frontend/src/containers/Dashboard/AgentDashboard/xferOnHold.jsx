import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle, Button, IconButton, Switch, TextField,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import XferConferenceModal from './xferConference'
import './style.scss'

const XferOnHold = ({ open, onClose }) => {
  const [ openXferConferenceModal, setOpenXferConferenceModal ] = useState(false)

  return (
    <>
      <Dialog
        disableScrollLock
        open={ open }
        onClose={ onClose }
        maxWidth='md'
        className='custom-modal agent-root'
        classes={ { paper: 'agent-modals' } }
      >
        <div className='header'>
          <DialogTitle>
            <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
              <h2 className='h2'>X-fer</h2>
              <h4 className='h4 light text-center ml-20'> On Hold 0:34 Min </h4>
            </div>
          </DialogTitle>
          <DialogActions className='cross-button'>
            <IconButton
              className='is-size-6'
              onClick={ onClose }
            >
              <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
            </IconButton>
          </DialogActions>
        </div>
        <DialogContent>
          <h4 className='h4 mt-30'> Phone Number </h4>
          <TextField
            className='text-field-para is-fullwidth'
            variant='outlined'
            margin='dense'
            type='number'
            placeholder='e.g. 1234567890'
          />

          <div className='display-inline-flex justify-between align-items-center is-halfwidth mt-30'>
            <h4 className='h4'> Internal Warm X-fer </h4>
            <Switch
              className='switches'
              color='primary'
            />
          </div>
          <div className='is-fullwidth'>
            <div className='mt-10 is-fullwidth'>
              <Button
                className='wide-button'
                classes={ {
                  root: 'button-secondary-large',
                  label: 'button-secondary-large-label agent-lg-btn-label',
                } }
                onClick={ () => setOpenXferConferenceModal(true) }
              >
                Take Off Hold 1st Party
              </Button>
            </div>
            <div className='mt-10 is-fullwidth'>
              <Button
                onClick={ onClose }
                className='wide-button'
                classes={ {
                  root: 'button-secondary-large',
                  label: 'button-secondary-large-label agent-lg-btn-label',
                } }
              >
                Hangup 3rd Party
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <XferConferenceModal
        open={ openXferConferenceModal }
        onClose={ () => setOpenXferConferenceModal(false) }
        onSubmit={ () => setOpenXferConferenceModal(false) }
      />
    </>
  )
}

XferOnHold.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default XferOnHold
