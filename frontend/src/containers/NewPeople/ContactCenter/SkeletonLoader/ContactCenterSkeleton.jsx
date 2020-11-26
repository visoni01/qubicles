import React from 'react'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import '../styles.scss'

const IntroductionSkeleton = () => (
  <>
    <Box className='box'>
      <div className='job-skeleton-container mt-20'>
        <div className='skeleton-avatar-container'>
          <Skeleton
            classes={ { root: 'custom-skeleton-avatar' } }
            animation='wave'
            variant='circle'
          />
          <div>
            <Skeleton animation='wave' classes={ { root: 'custom-skeleton-location' } } />
            <Skeleton animation='wave' classes={ { root: 'custom-skeleton-location' } } />
          </div>
        </div>
        <div className='skeleton-title-container'>
          <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
        </div>
        <Skeleton animation='wave' variant='rect' classes={ { root: 'custom-skeleton-summary' } } />
        <div className='status-tray'>
          <Skeleton animation='wave' classes={ { root: 'status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'status-item' } } />
        </div>
      </div>
    </Box>
  </>
)

export default IntroductionSkeleton
