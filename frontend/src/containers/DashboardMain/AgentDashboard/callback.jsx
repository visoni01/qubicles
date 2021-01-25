import React from 'react'
import {
  DialogTitle, Dialog, DialogActions, IconButton, DialogContent, Grid,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { callbackData } from '../testData'
import CallbackList from './callbackList'
import './style.scss'

const Callback = ({
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
        <h2 className='h2'>Callbacks</h2>
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
      <Grid container spacing={ 1 } justify='space-between' alignItems='center'>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            #
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
          <h4 className='h4 '>
            Callback Date/Time
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Name
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
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
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
          <h4 className='h4 text-align-end'>
            Last Call Date/Time
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Timezone
          </h4>
        </Grid>
      </Grid>
      <div className='mt-10'>
        {callbackData.map((callback) => <CallbackList key={ callback.id } callback={ callback } />)}
      </div>

    </DialogContent>
  </Dialog>
)

Callback.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default Callback
