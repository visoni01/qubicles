import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const JobsSkeleton = () => (
  <div className='job-list-skeleton-container'>
    <Skeleton animation='wave' classes={ { root: 'custom-skeleton-heading' } } />

    {[ ...Array(3).keys() ].map((key) => (
      <div key={ key }>
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />

        <div className='job-status-tray'>
          {[ ...Array(3).keys() ].map((innerKey) => (
            <Skeleton
              animation='wave'
              classes={ { root: 'job-status-item' } }
              key={ innerKey }
            />
          ))}
        </div>
      </div>
    ))}
  </div>
)

export default JobsSkeleton
