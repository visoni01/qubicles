import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'
import './styles.scss'
import MyCourseCardSkeleton from './myCourseCardSkeleton'

const MyCoursesSkeleton = () => (
  <Box className='custom-box my-courses-skeleton-container'>
    <Grid container spacing={ 2 }>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
        <div className='is-flex my-courses-buttons'>
          <Skeleton
            animation='wave'
            classes={ { root: 'button' } }
          />
          <Skeleton
            animation='wave'
            classes={ { root: 'button' } }
          />
        </div>
      </Grid>
      <Grid item xs={ 12 } sm={ 12 } md={ 12 } lg={ 12 } xl={ 12 }>
        <Skeleton
          animation='wave'
          classes={ { root: 'my-courses-title' } }
        />
      </Grid>
      <Grid container item spacing={ 4 } className='my-courses-card'>
        {[ ...Array(8).keys() ].map((val) => (
          <Grid item xs={ 12 } sm={ 12 } md={ 6 } lg={ 3 } xl={ 3 } key={ val }>
            <MyCourseCardSkeleton />
          </Grid>
        ))}
      </Grid>
    </Grid>
  </Box>
)

export default MyCoursesSkeleton
