import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'

export default function TalentCardSkeleton() {
  return (
    <div className='talent-card-skeleton-container list-divider'>
      <div className='avatar-container'>
        <Skeleton
          classes={ { root: 'avatar' } }
          animation='wave'
          variant='circle'
        />
        <div className='avatar-titles-wrap'>
          {[ ...Array(3).keys() ].map((val) => (
            <Skeleton
              key={ val }
              animation='wave'
              classes={ { root: 'avatar-title' } }
            />
          ))}
        </div>
      </div>
      <div className='talent-card-body'>
        <Skeleton
          animation='wave'
          classes={ { root: 'title' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'description' } }
        />
        <div className='skeleton-tags'>
          {[ ...Array(3).keys() ].map((val) => (
            <Skeleton
              key={ val }
              animation='wave'
              classes={ { root: 'skeleton-tag' } }
            />
          ))}
        </div>
      </div>
    </div>
  )
}
