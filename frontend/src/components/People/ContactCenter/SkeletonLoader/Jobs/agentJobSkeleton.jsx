import React from 'react'
import Skeleton from '@material-ui/lab/Skeleton'
import './styles.scss'

const AgentJobsSkeleton = () => (
  <>
    <div className='job-list-skeleton-container job-skeleton-container'>
      <div>
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
        <Skeleton animation='wave' classes={ { root: 'custom-skeleton-title' } } />
        <Skeleton animation='wave' className='mt-10' variant='rect' classes={ { root: 'custom-skeleton-summary' } } />
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
    </div>
  </>
)

export default AgentJobsSkeleton
