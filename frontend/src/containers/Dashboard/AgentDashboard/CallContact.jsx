import React from 'react'
import {
  Box, Avatar, Divider, Button,
} from '@material-ui/core'
import { terry, thomas } from '../../../assets/images/avatar'
import { callIcon } from '../../../assets/images/agentDashboard'

const CallContact = () => (
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
      <div className='display-inline-flex align-items-center justify-between is-fullwidth'>
        <h4 className='h4'>Address</h4>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
        >
          Edit
        </Button>
      </div>
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
          Edit
        </Button>
      </div>
      <p className='para primary'>
        <img src={ callIcon } alt='' />
        <span className='para primary ml-5'>888-555-5555</span>
      </p>
    </div>
    <div className='mt-15 '>
      <div className='display-inline-flex align-items-center justify-between is-fullwidth'>
        <h4 className='h4'>Email</h4>
        <Button
          classes={ {
            root: 'button-primary-text',
            label: 'button-primary-text-label',
          } }
        >
          Edit
        </Button>
      </div>
      <p className='para'>chriscollins@patagonia.com</p>
    </div>
    <Divider className='divider' />
    <div className='mt-15 '>
      <h4 className='h4'>Latest Note</h4>
      <p className='para'>
        Lorem ipsum, or lipsum as it is sometimes known, is
        dummy text used in laying out print.
      </p>
    </div>
    <Divider className='divider' />
    <div className='mt-15 '>
      <h4 className='h4'>Last Contact</h4>
      <div className='display-inline-flex align-items-center'>
        <Avatar className='profile-pic no-margin-left' alt='Thomas' src={ thomas } />
        <div className='mt-5'>
          <h4 className='h4 sz-sm'> Justin Barnett </h4>
          <p className='para light sz-sm mt-5'>14:03 pm GMT-07:00 </p>
        </div>
      </div>
    </div>
  </Box>
)

export default CallContact
