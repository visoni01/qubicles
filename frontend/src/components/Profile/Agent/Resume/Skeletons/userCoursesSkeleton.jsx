import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Divider } from '@material-ui/core'
import CourseSkeleton from './courseSkeleton'
import './styles.scss'

const UserCoursesSkeleton = () => (
  <div className='all-courses-skeleton-container'>
    <div className='all-courses-body'>
      {[ ...Array(3).keys() ].map((val, index) => (
        <>
          <CourseSkeleton key={ val } />
          {index < 2 && <Divider className='divider' />}
        </>
      ))}
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'button' } }
    />
  </div>
)

export default UserCoursesSkeleton
