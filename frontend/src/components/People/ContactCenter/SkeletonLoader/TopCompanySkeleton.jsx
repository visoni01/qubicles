import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'
import { Box } from '@material-ui/core'

const TopCompanySkeleton = () => (
  <Box className='custom-box'>
    <div className='list-divider no-margin job-list-skeleton-container'>
      <Skeleton animation='wave' classes={ { root: 'custom-skeleton-jobpost-heading' } } />
      {[ ...Array(4).keys() ].map((key) => (
        <RenderLoader key={ key } />
      ))}
    </div>
  </Box>
)

const RenderLoader = () => (
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
  </div>
)

export default TopCompanySkeleton
