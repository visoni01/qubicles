import React from 'react'
import { Grid } from '@material-ui/core'
import './styles.scss'
import CourseCardSkeleton from './courseCardSkeleton'

const AllCoursesSkeleton = () => (
  <div className='all-courses-skeleton-container'>
    <div className='course-card-container'>
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
)

export default AllCoursesSkeleton
