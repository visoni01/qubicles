import React from 'react'
import { Box } from '@material-ui/core'

const CustomerServiceOverview = () => (
  <Box className='custom-box mb-25'>
    <div className='customer-service'>
      <h3 className='h3 mb-15'>
        Customer  Service Overview
      </h3>

      <div className='customer-service-content'>
        <p>
          <b className='h3 number-color-green mr-10'>0.20</b>
          <span className='para light'>Average speed of answer</span>
        </p>
        <p className='mt-10'>
          <b className='h3 mr-10'>2.45</b>
          <span className='para light'>Marlon mars</span>
        </p>
      </div>
    </div>
  </Box>
)

export default CustomerServiceOverview
