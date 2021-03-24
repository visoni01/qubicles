import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const JobsSkeleton = () => (
  <>
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
  </>
)

export default JobsSkeleton
