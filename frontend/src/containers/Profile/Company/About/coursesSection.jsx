import React from 'react'
import { Box, Grid } from '@material-ui/core'

const CoursesSection = () => (
  <Box className='custom-box'>
    <h3 className='h3 mb-20'> Courses </h3>
    <Grid container spacing={ 3 } justify='flex-start'>
      {[ ...Array(5).keys() ].map((key) => (
        <Grid key={ key } item xs={ 12 } sm={ 6 } md={ 4 } lg={ 4 }>
          <div>
            <h4 className='h4 primary'> How to talk to clients </h4>
            <p className='para light mb-5'> Good Call Center, 2020 </p>
            <p className='para'> 7 Feb 2020 - 24 Feb 2020 </p>
          </div>
        </Grid>
      ))}
    </Grid>
  </Box>
)

export default CoursesSection
