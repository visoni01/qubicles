import React from 'react'
import { Skeleton } from '@material-ui/lab'

const LeftUserCardSkeleton = () => (
  <div className='left-user-card'>
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <div className='user-details'>
      <div className='header'>
        <Skeleton
          animation='wave'
          classes={ { root: 'chat-title' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'time' } }
        />
      </div>
      <div className='chat-message'>
        <Skeleton
          animation='wave'
          classes={ { root: 'first-line' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'second-line' } }
        />
      </div>
    </div>
  </div>
)

export default LeftUserCardSkeleton
