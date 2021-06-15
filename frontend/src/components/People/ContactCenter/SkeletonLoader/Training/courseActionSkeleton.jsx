import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'
import './styles.scss'

const CourseActionSkeleton = () => (
  <Box className='custom-box course-action-skeleton-container'>
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
        <Skeleton
          animation='wave'
          classes={ { root: 'picture' } }
        />
      </Grid>
      {[ ...Array(3).keys() ].map((val) => (
        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 } key={ val }>
          <Skeleton
            animation='wave'
            classes={ { root: 'button' } }
          />
        </Grid>
      ))}
      {[ ...Array(4).keys() ].map((val) => (
        <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 } key={ val }>
          <Skeleton
            animation='wave'
            classes={ { root: 'title' } }
          />
          <Skeleton
            animation='wave'
            classes={ { root: 'description' } }
          />
        </Grid>
      ))}
    </Grid>
  </Box>
)

export default CourseActionSkeleton
