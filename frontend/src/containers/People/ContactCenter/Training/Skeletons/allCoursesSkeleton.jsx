import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'
import './styles.scss'
import CourseCardSkeleton from './courseCardSkeleton'

const AllCoursesSkeleton = () => (
  <Box className='custom-box'>
    <div className='all-courses-skeleton-container'>
      <Skeleton
        animation='wave'
        classes={ { root: 'heading' } }
      />
      <div className='course-card-body'>
        <Grid container spacing={ 2 }>
          {[ ...Array(9).keys() ].map((val) => (
            <CourseCardSkeleton
              key={ val }
              val={ val }
            />
          ))}
        </Grid>
      </div>
    </div>
  </Box>
)

export default AllCoursesSkeleton
