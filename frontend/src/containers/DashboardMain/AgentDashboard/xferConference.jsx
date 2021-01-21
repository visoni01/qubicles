import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, InputBase, Switch,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const XferOnConference = ({
  open, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='sm'
    className='custom-modal agent-root'
    classes={ { paper: 'agent-modals' } }
  >
    <div className='header'>
      <DialogTitle>
        <div className='display-inline-flex justify-between align-items-center is-fullwidth'>
          <h2 className='h2'>X-fer</h2>
          <h4 className='h4 light text-center ml-20'> Conference 0:34 Min </h4>
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
      <h4 className='h4 mt-30'>Phone Number</h4>
      <InputBase
        InputProps={ { inputProps: { min: 0, step: 1 } } }
        type='number'
        placeholder='e.g. 1234567890'
        className='search-input mt-10'
      />

      <div className='display-inline-flex justify-between align-items-center is-halfwidth mt-30'>
        <h4 className='h4'>Internal Warm X-fer</h4>
        <Switch
          className='switches'
          color='primary'
        />
      </div>
    </DialogContent>
    <DialogActions className='modal-actions'>
      <div className='agentDashboardModal-buttons'>
        <div className='mt-10 is-fullwidth'>
          <Button
            onClick={ onClose }
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Hangup 3rd Party
          </Button>
        </div>
        <div className='mt-10 is-fullwidth'>
          <Button
            onClick={ onClose }
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Hold 3rd Party
          </Button>
        </div>
        <div className='mt-10 is-fullwidth'>
          <Button
            onClick={ onClose }
            className='wide-button'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Leave 3-Way
          </Button>
        </div>
        <div className='mt-10 is-fullwidth'>
          <Button
            onClick={ onClose }
            className='wide-button'
            classes={ {
              root: 'button-secondary-small-red',
              label: 'button-secondary-small-label-red',
            } }
          >
            Hangup Both
          </Button>
        </div>
      </div>
    </DialogActions>
  </Dialog>
)

XferOnConference.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default XferOnConference
