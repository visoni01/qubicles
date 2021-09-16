import React from 'react'
import { Box } from '@material-ui/core'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'

const RightSectionSkeleton = () => (
  <Box className='custom-box right-section-skeleton'>
    <Skeleton
      animation='wave'
      classes={ { root: 'options-icon' } }
    />
    <Skeleton
      animation='wave'
      variant='circle'
      classes={ { root: 'profile-picture' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'name' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'short-message' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'link' } }
    />
  </Box>
)

export default RightSectionSkeleton
