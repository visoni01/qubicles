import React from 'react'
import PropTypes from 'prop-types'
import { Grid } from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faInfoCircle, faPhoneAlt } from '@fortawesome/free-solid-svg-icons'

const ContactsSearchList = ({ contact }) => (
  <div className='mt-20 list-divider no-margin pb-10 pt-10'>
    <Grid container spacing={ 1 } justify='space-between' alignItems='flex-start'>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.id}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
        <p className='para text-link'>
          <FontAwesomeIcon className='custom-fa-icon pointer mr-5' icon={ faInfoCircle } />
          {contact.name}
        </p>
      </Grid>
      <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
        <p className='para text-link'>
          <FontAwesomeIcon className='custom-fa-icon pointer mr-5' icon={ faPhoneAlt } />
          {contact.phoneNumber}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.status}
        </p>
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.lastCall}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.city}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.state}
        </p>
      </Grid>
      <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
        <p className='para'>
          {contact.zip}
        </p>
      </Grid>
    </Grid>
  </div>
)

ContactsSearchList.propTypes = {
  contact: PropTypes.shape({
    id: PropTypes.number.isRequired,
    name: PropTypes.string.isRequired,
    phoneNumber: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
    lastCall: PropTypes.string.isRequired,
    city: PropTypes.string.isRequired,
    state: PropTypes.string.isRequired,
    zip: PropTypes.number.isRequired,
  }).isRequired,
}

export default ContactsSearchList
