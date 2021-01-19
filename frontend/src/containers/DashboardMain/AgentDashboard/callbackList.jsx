import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from '@material-ui/core'

const CallbackList = ({ callback }) => (
  <div className='mt-20'>
    <Grid container spacing={ 1 } justify='space-between' alignItems='flex-start'>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
        <p className='para'>
          { callback.id}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
        <p className='para'>
          { callback.callbackDateTime}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
        <p className='para text-link '>
          { callback.name}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
        <p
          className='para text-link '
        >
          { callback.phoneNumber}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
        <p className='para'>
          { callback.status}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
        <p className='para'>
          { callback.campaign}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 2 } xs={ 12 }>
        <p className='para'>
          { callback.lastCallDateTime}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 12 }>
        <p className='para'>
          { callback.timezone}
        </p>
      </Grid>
      <Divider className='divider' />
    </Grid>
  </div>
)

CallbackList.propTypes = {
  callback: PropTypes.shape({
    id: PropTypes.number.isRequired,
    callbackDateTime: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    campaign: PropTypes.string.isRequired,
    lastCallDateTime: PropTypes.string.isRequired,
    timezone: PropTypes.number.isRequired,
  }).isRequired,
}

export default CallbackList
