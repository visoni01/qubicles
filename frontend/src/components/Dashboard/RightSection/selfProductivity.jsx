import React from 'react'
import { Box } from '@material-ui/core'

const SelfProductivity = () => (
  <Box className='custom-box mb-25'>
    <div className='customer-service'>
      <h3 className='h3 mb-15'>
        Staff Productivity Highlights
      </h3>

      <div>
        <p>
          <b className='h3 mr-10'>76</b>
          <span className='para light'>Calls per agent</span>
        </p>
        <p className='mt-10'>
          <b className='h3 mr-10'>2.45</b>
          <span className='para light'>Average talk time</span>
        </p>
      </div>
    </div>
  </Box>
)

export default SelfProductivity
