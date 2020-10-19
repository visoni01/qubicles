import React from 'react'
import { Box } from '@material-ui/core'

const CustomerServiceOverview = () => (
  <Box className='box'>
    <div className='customer-service'>
      <h3 className='heading'>
        Customer  Service Overview
      </h3>

      <div className='customer-service-content'>
        <p>
          <span className='green-color'>
            <b className='number green'>0.20</b>
            {' '}
          </span>
          <span className='text'>Average speed of answer</span>
        </p>

        <p>
          <span className='dark-color'>
            <b className='number'>2.45</b>
            {' '}
          </span>
          <span className='text'>Marlon mars</span>
        </p>
      </div>
    </div>
  </Box>
)

export default CustomerServiceOverview
