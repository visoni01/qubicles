import React from 'react'
import {
  Box, Avatar, Divider, Button, Grid,
} from '@material-ui/core'
import { terry } from '../../../assets/images/avatar'
import { callIcon } from '../../../assets/images/agentDashboard'
import HistoryTab from './ActiveCallTabs/historyTab'

const ContactInfo = () => (
  <>
    <Grid item container spacing={ 4 }>
      <Grid item xl={ 5 } lg={ 5 } md={ 12 } sm={ 12 } xs={ 12 }>
        <Box className='custom-box'>
          <h3 className='h3 mb-10'> Contact</h3>
          <div className='display-inline-flex align-items-center'>
            <Avatar className='profile-pic large no-margin-left' alt='Terry' src={ terry } />
            <div>
              <h4 className='h4'> Chris Collins </h4>
              <p className='para light '>14:03 pm GMT-07:00 </p>
            </div>
          </div>
          <Divider className='divider' />
          <div className='mt-15 '>
            <h4 className='h4'>Address</h4>
            <p className='para'>386 Geary St</p>
            <p className='para'>San Francisco</p>
            <p className='para'>CA 94102, United States</p>
          </div>
          <div className='mt-15 '>
            <div className='display-inline-flex align-items-center justify-between is-fullwidth'>
              <h4 className='h4'>Phone</h4>
              <Button
                classes={ {
                  root: 'button-primary-text',
                  label: 'button-primary-text-label',
                } }
              >
                Preview
              </Button>
            </div>
            <p className='para primary'>
              <img src={ callIcon } alt='' />
              <span className='para primary ml-5'>888-555-5555</span>
            </p>
          </div>
          <div className='mt-15 '>
            <h4 className='h4'>Email</h4>
            <p className='para'>chriscollins@patagonia.com</p>
          </div>
          <Divider className='divider' />
        </Box>
      </Grid>
      <Grid item xl={ 7 } lg={ 7 } md={ 12 } sm={ 12 } xs={ 12 }>
        <Box className='custom-box'>
          <h3 className='h3'>History</h3>
          <HistoryTab />
        </Box>
      </Grid>
    </Grid>
  </>
)

export default ContactInfo
