import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { Box, Grid } from '@material-ui/core'
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons'

const TodayActivity = () => (
  <Box className='custom-box mb-25'>
    <div className='activity-section'>
      <h3 className='h3 mb-15'>
        Today's Activity
        <FontAwesomeIcon icon={ faEllipsisV } className='pull-right' />
      </h3>
      <Grid container spacing={ 1 } justify='space-between'>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 green'>
              3.282
            </p>
            <p className='h4'>
              Calls
            </p>
          </li>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 green'>
              680
            </p>
            <p className='h4'>
              Sales
            </p>
          </li>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 yellow'>
              558
            </p>
            <p className='h4'>
              Working
            </p>
          </li>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 green'>
              754
            </p>
            <p className='h4'>
              Live
            </p>
          </li>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 red'>
              599
            </p>
            <p className='h4'>
              Online
            </p>
          </li>
        </Grid>
        <Grid item xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 }>
          <li>
            <p className=' h3 yellow'>
              260
            </p>
            <p className='h4'>
              On a Call
            </p>
          </li>
        </Grid>
      </Grid>
    </div>
  </Box>
)

export default TodayActivity
