import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Divider } from '@material-ui/core'
import CourseSkeleton from './courseSkeleton'
import './styles.scss'

const UserCoursesSkeleton = () => (
  <div className='all-courses-skeleton-container'>
    <div className='all-courses-body'>
      {[ ...Array(3).keys() ].map((val, index) => (
        <div key={ val }>
          <CourseSkeleton />
          {index < 2 && <Divider className='divider' />}
        </div>
      ))}
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'button' } }
    />
  </div>
)

export default UserCoursesSkeleton
