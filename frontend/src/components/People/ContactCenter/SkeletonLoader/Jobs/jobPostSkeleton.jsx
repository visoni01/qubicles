import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const JobPostSkeleton = () => (
  <div className='job-list-skeleton-container'>
    <Skeleton animation='wave' classes={ { root: 'custom-skeleton-jobpost-heading' } } />
    <Skeleton animation='wave' classes={ { root: 'custom-skeleton-jobpost-title' } } />
    <Skeleton animation='wave' variant='rect' classes={ { root: 'custom-skeleton-summary' } } />
    <div className='job-status-tray mt-20'>
      {[ ...Array(3).keys() ].map((key) => (
        <Skeleton
          animation='wave'
          classes={ { root: 'job-status-item' } }
          key={ key }
        />
      ))}
    </div>
    <div className='job-status-tray'>
      {[ ...Array(3).keys() ].map((key) => (
        <Skeleton
          animation='wave'
          classes={ { root: 'job-status-item' } }
          key={ key }
        />
      ))}
    </div>
    <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
    <div className='job-status-tray'>
      {[ ...Array(3).keys() ].map((key) => (
        <Skeleton
          animation='wave'
          classes={ { root: 'job-status-item' } }
          key={ key }
        />
      ))}
    </div>
  </div>
)

export default JobPostSkeleton
