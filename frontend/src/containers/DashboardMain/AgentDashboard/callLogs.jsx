import React from 'react'
import {
  DialogTitle, Dialog, DialogActions, IconButton, DialogContent, Grid, InputBase,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { callbackData } from '../testData'
import CallLogsList from './callLogsList'
import './style.scss'

const CallLogs = ({
  open, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    onClose={ onClose }
    fullWidth
    maxWidth='lg'
    className='custom-modal agent-root'
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
      <Grid container spacing={ 4 } alignItems='flex-end'>
        <Grid container item xl={ 4 } lg={ 4 } md={ 4 } sm={ 6 } spacing={ 2 }>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
            <h4 className='h4 mb-10'> Start Date</h4>
            <div className='search-input'>
              <InputBase
                placeholder='Start Date'
                className='input-field'
              />
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 }>
            <h4 className='h4 mb-10'> End Date</h4>
            <div className='search-input'>
              <InputBase
                placeholder='End Date'
                className='input-field'
              />
            </div>
          </Grid>
        </Grid>
        <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 6 }>
          <div className='mt-10 display-inline-flex justify-between align-items-center is-fullwidth'>
            <p className='para text-link ml-30'> Today </p>
            <p className='para text-link ml-30'> This Week </p>
            <p className='para text-link ml-30'> This Month </p>
            <p className='para text-link ml-30'> This Year </p>
            <p className='para text-link ml-30'> All </p>
          </div>
        </Grid>
      </Grid>
      <div className='mt-30'>
        <Grid container spacing={ 1 } justify='space-between' alignItems='center'>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              #
            </h4>
          </Grid>
          <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
            <h4 className='h4 '>
              Date/Time
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4 '>
              Length
            </h4>
          </Grid>
          <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              Name
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4
              className='h4'
            >
              Phone
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              Status
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              Campaign
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              In/Out
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              Alt
            </h4>
          </Grid>
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
            <h4 className='h4'>
              Hangup
            </h4>
          </Grid>
        </Grid>
      </div>
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
