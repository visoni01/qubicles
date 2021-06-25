import React from 'react'
import { Skeleton } from '@material-ui/lab'

const CourseSkeleton = () => (
  <div className='course-card is-flex is-between'>
    <div className='is-fullwidth'>
      <Skeleton
        animation='wave'
        classes={ { root: 'title' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'creator' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'duration' } }
      />
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'badge' } }
    />
  </div>
)

export default CourseSkeleton
