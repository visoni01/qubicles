import React from 'react'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const JobFilterSkeleton = () => (
  <Box className='box'>
    <div className='job-skeleton-container'>
      {[ ...Array(5).keys() ].map((key) => (
        <Skeleton
          animation='wave'
          classes={ { root: 'custom-skeleton-side-filter' } }
          key={ key }
        />
      ))}
    </div>
  </Box>
)

export default JobFilterSkeleton
