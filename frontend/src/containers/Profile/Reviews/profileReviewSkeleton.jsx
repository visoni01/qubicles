import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'

const ProfileReviewSkeleton = () => (
  <div className='review-skeleton-container list-divider no-margin pb-10'>
    <div className='skeleton-avatar-container'>
      <Skeleton
        classes={ { root: 'custom-skeleton-avatar' } }
        animation='wave'
        variant='circle'
      />
    </div>
    <div className='skeleton-title-container'>
      <Skeleton
        animation='wave'
        classes={ { root: 'custom-skeleton-name' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'custom-skeleton-date' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'custom-skeleton-rating' } }
      />
      <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
    </div>
  </div>

)

export default ProfileReviewSkeleton
