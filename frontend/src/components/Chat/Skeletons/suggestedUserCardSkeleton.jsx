import React from 'react'
import { Skeleton } from '@material-ui/lab'

const SuggestedUserCardSkeleton = () => (
  <div className='suggested-user-card'>
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <div className='user-details'>
      <Skeleton
        animation='wave'
        classes={ { root: 'user-name' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'user-title' } }
      />
    </div>
  </div>
)

export default SuggestedUserCardSkeleton
