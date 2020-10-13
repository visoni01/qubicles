import React from 'react'
import { Box } from '@material-ui/core'

const SelfProductivity = () => (
  <Box className='box'>
    <div className='customer-service'>
      <h3 className='heading'>
        Staff Productivity Highlights
      </h3>

      <div className='customer-service-content'>
        <p>
          <span className='dark-color'>
            <b className='number'>76</b>
          </span>
          <span className='text'>Calls per agent</span>
        </p>
        <p>
          <span className='dark-color'>
            <b className='number'>2.45</b>
          </span>
          <span className='text'>Average talk time</span>
        </p>
      </div>
    </div>
  </Box>
)

export default SelfProductivity
