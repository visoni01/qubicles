import React from 'react'
import { Skeleton } from '@material-ui/lab'

const NotificationCardSkeleton = () => (
  <div className='notification-card'>
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <div className='notification-message'>
      <Skeleton
        animation='wave'
        classes={ { root: 'notification-text' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'notification-time' } }
      />
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'cross-button' } }
    />
  </div>
)

export default NotificationCardSkeleton
