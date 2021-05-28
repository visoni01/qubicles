import React from 'react'
import './styles.scss'
import { Skeleton } from '@material-ui/lab'
import { Grid } from '@material-ui/core'

const CourseRatingSkeleton = () => (
  <div className='course-rating-skeleton-container'>
    <div className='display-inline-flex is-fullwidth justify-center'>
      <Skeleton
        animation='wave'
        classes={ { root: 'rating' } }
      />
    </div>
    <Grid container spacing={ 3 }>
      {[ ...Array(4).keys() ].map((val) => (
        <Grid key={ val } item lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 } classes={ { root: 'text-center' } }>
          <Skeleton
            animation='wave'
            classes={ { root: 'display-inline-flex mt-20 sub-rating' } }
          />
        </Grid>
      ))}
    </Grid>
  </div>
)

export default CourseRatingSkeleton
