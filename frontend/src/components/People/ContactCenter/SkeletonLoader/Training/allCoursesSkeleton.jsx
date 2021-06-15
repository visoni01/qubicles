import React from 'react'
import { Grid } from '@material-ui/core'
import './styles.scss'
import CourseCardSkeleton from './courseCardSkeleton'

const AllCoursesSkeleton = () => (
  <div className='all-courses-skeleton-container'>
    <div className='course-card-container'>
      <Grid container spacing={ 2 }>
        {[ ...Array(9).keys() ].map((val) => (
          <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item key={ val }>
            <CourseCardSkeleton
              key={ val }
              type='All Courses'
            />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default AllCoursesSkeleton
