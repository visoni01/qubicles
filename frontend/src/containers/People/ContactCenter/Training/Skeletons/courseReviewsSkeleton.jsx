import React from 'react'
import './styles.scss'
import { Skeleton } from '@material-ui/lab'
import { Divider } from '@material-ui/core'

const CourseReviewsSkeleton = () => (
  <div className='course-reviews-skeleton-container'>
    <Divider className='divider' />
    {[ ...Array(3).keys() ].map((id) => (
      <div className='display-inline-flex is-fullwidth user-review-card list-divider' key={ id }>
        <Skeleton
          animation='wave'
          variant='circle'
          classes={ { root: 'picture' } }
        />
        <div className='is-fullwidth'>
          <div className='display-inline-flex is-fullwidth justify-between'>
            <Skeleton
              animation='wave'
              classes={ { root: 'username' } }
            />
            <Skeleton
              animation='wave'
              classes={ { root: 'course-progress' } }
            />
          </div>
          <Skeleton
            animation='wave'
            classes={ { root: 'usertitle mb-5' } }
          />
          <div className='display-inline-flex is-fullwidth'>
            <Skeleton
              animation='wave'
              classes={ { root: 'rating' } }
            />
            <Skeleton
              animation='wave'
              classes={ { root: 'date ml-10' } }
            />
          </div>
          <Skeleton
            animation='wave'
            classes={ { root: 'comment mt-5' } }
          />
        </div>
      </div>
    ))}
  </div>
)

export default CourseReviewsSkeleton
