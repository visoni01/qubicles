import React from 'react'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

const ActionsSkeleton = () => (
  <Box className='custom-box actions-box'>
    <h3 className=' h3 mb-30'> Actions </h3>
    <Skeleton animation='wave' />
    <Skeleton animation='wave' />
    <Skeleton animation='wave' />
    <Skeleton animation='wave' />
  </Box>
)

export default ActionsSkeleton
