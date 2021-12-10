import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'

const UniversalSearchCardSkeleton = () => (
  <div className='result-card'>
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <div className='result-message'>
      <Skeleton
        animation='wave'
        classes={ { root: 'result-text' } }
      />
    </div>
  </div>
)

export default UniversalSearchCardSkeleton
