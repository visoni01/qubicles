import React from 'react'
import { Grid } from '@material-ui/core'
import CourseCardSkeleton from './courseCardSkeleton'
import './styles.scss'

const EnrolledCoursesSkeleton = () => (
  <div className='all-courses-skeleton-container'>
    <div className='course-card-container'>
      <Grid container spacing={ 3 }>
        {[ ...Array(8).keys() ].map((val) => (
          <Grid xl={ 3 } lg={ 3 } md={ 6 } sm={ 12 } item key={ val }>
            <CourseCardSkeleton
              key={ val }
              type='Enrolled Courses'
            />
          </Grid>
        ))}
      </Grid>
    </div>
  </div>
)

export default EnrolledCoursesSkeleton
