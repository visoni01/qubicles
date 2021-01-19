import React from 'react'
import {
  DialogTitle, Dialog, DialogActions, IconButton, DialogContent, Grid,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { callbackData } from '../testData'
import CallLogsList from './callLogsList'

const CallLogs = ({
  open, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='lg'
    className='custom-modal wallet-root'
    classes={ { paper: 'wallet-modals' } }
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>Call Logs</h2>
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
      <Grid container spacing={ 1 } justify='space-between' alignItems='flex-start'>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            #
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
          <h4 className='h4 '>
            Date/Time
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4 '>
            Length
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
          <h4 className='h4'>
            Name
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4
            className='h4'
          >
            Phone
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            Status
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            Campaign
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            In/Out
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            Alt
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
          <h4 className='h4'>
            Hangup
          </h4>
        </Grid>
      </Grid>
      <div className='mt-10'>
        {callbackData.map((callback) => <CallLogsList key={ callback.id } callback={ callback } />)}
      </div>

    </DialogContent>
  </Dialog>
)

CallLogs.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default CallLogs
