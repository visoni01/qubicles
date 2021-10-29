import React from 'react'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const IntroductionSkeleton = () => (
  <Box className='box'>
    <div className='job-skeleton-container mt-20'>
      <div className='skeleton-avatar-container'>
        <Skeleton
          classes={ { root: 'custom-skeleton-avatar' } }
          animation='wave'
          variant='circle'
        />
        <div>
          {[ ...Array(2).keys() ].map((key) => (
            <Skeleton
              animation='wave'
              classes={ { root: 'custom-skeleton-location' } }
              key={ key }
            />
          ))}
        </div>
      </div>
      <div className='skeleton-title-container'>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-description' } } />
      </div>
      <Skeleton animation='wave' variant='rect' classes={ { root: 'custom-skeleton-summary' } } />
      <div className='status-tray'>
        {[ ...Array(3).keys() ].map((key) => (
          <Skeleton
            animation='wave'
            classes={ { root: 'status-item' } }
            key={ key }
          />
        ))}
      </div>
    </div>
  </Box>
)

export default IntroductionSkeleton
