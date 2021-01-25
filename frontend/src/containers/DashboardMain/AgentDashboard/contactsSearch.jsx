import React from 'react'
import { Grid } from '@material-ui/core'
import { contactDetails } from '../testData'
import ContactsSearchList from './contactsSearchList'

const ContactsSearch = () => (
  <div>
    <h3 className='h3'>
      Search Results
      {' '}
      <span className='para light'>
        (4 matches)
      </span>
    </h3>
    <div className='mt-30'>
      <Grid container spacing={ 3 } justify='space-between' alignItems='center'>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            #
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Name
          </h4>
        </Grid>
        <Grid item xl={ 2 } lg={ 2 } md={ 2 } sm={ 12 } xs={ 12 }>
          <h4 className='h4 '>
            Phone
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Status
          </h4>
        </Grid>
        <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Last Call
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            City
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            State
          </h4>
        </Grid>
        <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 12 } xs={ 12 }>
          <h4 className='h4'>
            Zip
          </h4>
        </Grid>
      </Grid>
    </div>
    <div className='mt-10'>
      {contactDetails.map((contact) => <ContactsSearchList key={ contact.id } contact={ contact } />)}
    </div>
  </div>
)

export default ContactsSearch
