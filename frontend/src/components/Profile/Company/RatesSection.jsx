import React from 'react'
import { Box, Grid } from '@material-ui/core'

export default function RatesSection() {
  return (
    <Box className='custom-box'>
      <h2 className='h2 mb-30'> Rates </h2>

      <div className='settings-section'>

        {/* Rate per minute and flow usage rate */}

        <Grid item container justify='space-between' spacing={ 3 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
            <div className='row-section'>
              <h4 className='h4'>Rate Per Minute</h4>
            </div>
            <div className='row-fields'>
              <span className='para'> 0.03 ct </span>
            </div>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
            <div className='row-section'>
              <h4 className='h4'>Flow Usage Rate</h4>
            </div>
            <div className='row-fields'>
              <span className='para'> 0.01 ct </span>
            </div>
          </Grid>
        </Grid>

        {/* Rate per minute and flow usage rate */}

        <Grid item container justify='space-between' spacing={ 3 }>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 12 }>
            <div className='row-section'>
              <h4 className='h4'>Web Phone Rate</h4>
            </div>
            <div className='row-fields'>
              <span className='para'> $2.00 USD </span>
            </div>
          </Grid>
        </Grid>
      </div>

    </Box>
  )
}
