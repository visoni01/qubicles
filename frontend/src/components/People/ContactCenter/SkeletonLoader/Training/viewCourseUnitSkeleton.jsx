import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'

const ViewCourseUnitSkeleton = () => (
  <div className='course-unit-skeleton-container'>
    <Skeleton
      animation='wave'
      classes={ { root: 'course-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'section-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'unit-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'unit-details' } }
    />
  </div>
)

export default ViewCourseUnitSkeleton
