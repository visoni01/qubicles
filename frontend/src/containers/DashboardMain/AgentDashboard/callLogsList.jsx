import React from 'react'
import PropTypes from 'prop-types'
import { Grid, Divider } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

const CallLogsList = ({ callback }) => (
  <div className='mt-20'>
    <Grid container spacing={ 1 } justify='space-between' alignItems='flex-start'>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          { callback.id}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          { callback.callbackDateTime}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.length}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
        <p className='para text-link'>
          <FontAwesomeIcon className='custom-fa-icon pointer mr-5' icon={ faInfoCircle } />
          {callback.name}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p
          className='para text-link'
        >
          <FontAwesomeIcon className='custom-fa-icon pointer mr-5' icon={ faPhoneAlt } />
          {callback.phoneNumber}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.status}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.campaign}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.inOut}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.alt}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {callback.hangup}
        </p>
      </Grid>
      <Divider className='divider' />
    </Grid>
  </div>
)

CallLogsList.propTypes = {
  callback: PropTypes.shape({
    id: PropTypes.number.isRequired,
    callbackDateTime: PropTypes.string.isRequired,
    length: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    campaign: PropTypes.string.isRequired,
    inOut: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
    hangup: PropTypes.string.isRequired,
    timezone: PropTypes.number.isRequired,
  }).isRequired,
}

export default CallLogsList
