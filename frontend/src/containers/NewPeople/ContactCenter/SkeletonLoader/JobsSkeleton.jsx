import React from 'react'
import { Box } from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'
import '../styles.scss'

const JobsSkeleton = () => (
  <>
    <Box className='box mt-20'>
      <div className='job-list-skeleton-container'>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-heading' } } />
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
      </div>
      <div className='job-list-skeleton-container'>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-heading' } } />
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <div className='job-status-tray'>
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
          <Skeleton animation='wave' classes={ { root: 'job-status-item' } } />
        </div>
      </div>
    </Box>
  </>
)

export default JobsSkeleton
