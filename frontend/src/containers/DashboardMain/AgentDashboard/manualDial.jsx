import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent,
  DialogTitle, Button, IconButton, Switch,
} from '@material-ui/core'
import IntlTelInput from 'react-intl-tel-input'
import 'react-intl-tel-input/dist/main.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import './style.scss'

const ManualDial = ({
  open, onClose, onSubmit,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='xs'
    className='custom-modal agent-root'
    classes={ { paper: 'agent-modals' } }
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>Manual Dial</h2>
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
      <h4 className='h4 mt-10'>Phone Number</h4>
      <div className='mt-10 is-fullwidth'>
        <IntlTelInput
          preferredCountries={ [ 'us', 'ca' ] }
          containerClassName='control custom-intl-tel-input intl-tel-input'
        />
      </div>

      <div className='display-inline-flex justify-between align-items-center is-fullwidth mt-30'>
        <h4 className='h4'>Lookup contact by phone number</h4>
        <Switch
          className='switches'
          color='primary'
        />
      </div>

      <div className='agentDashboardModal-buttons'>
        <div className='mt-10 is-fullwidth'>
          <Button
            className='wide-button '
            classes={ { root: 'button-primary-small', label: 'button-primary-small-label' } }
            onClick={ onSubmit }
          >
            Dial Now
          </Button>
        </div>
        <div className='mt-10 is-fullwidth'>
          <Button
            className='wide-button'
            classes={ { root: 'button-secondary-small', label: 'button-secondary-small-label' } }
            onClick={ onSubmit }
          >
            Preview Dial
          </Button>
        </div>
        <div className='text-center mt-10 is-fullwidth '>
          <Button
            color='secondary'
            onClick={ onClose }
            className='cancel-button'
          >
            Cancel
          </Button>
        </div>
      </div>

    </DialogContent>
  </Dialog>
)

ManualDial.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
}

export default ManualDial
