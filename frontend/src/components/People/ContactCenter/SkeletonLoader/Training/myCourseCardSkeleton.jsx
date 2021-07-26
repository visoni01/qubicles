import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, Divider } from '@material-ui/core'
import './styles.scss'

const MyCourseCardSkeleton = () => (
  <Card
    className='my-courses-card-body'
  >
    <Skeleton
      animation='wave'
      classes={ { root: 'my-courses-card-picture' } }
    />
    <div className='display-inline-flex is-fullwidth my-courses-card-div'>
      <Skeleton
        animation='wave'
        classes={ { root: 'my-courses-card-rating' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'my-courses-card-student' } }
      />
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'my-courses-card-title' } }
    />
    <div className='display-inline-flex is-fullwidth my-courses-card-div'>
      <Skeleton
        animation='wave'
        classes={ { root: 'my-courses-card-rating' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'my-courses-card-student' } }
      />
    </div>
    <div className='my-courses-card-list'>
      {[ ...Array(3).keys() ].map((val, index) => (
        <>
          <div className='is-flex my-courses-card-list-item' key={ val }>
            <Skeleton
              animation='wave'
              classes={ { root: 'my-courses-card-property' } }
            />
            <Skeleton
              animation='wave'
              classes={ { root: 'my-courses-card-value' } }
            />
          </div>
          {index !== 2 && <Divider />}
        </>
      ))}
    </div>
    <Skeleton
      animation='wave'
      classes={ { root: 'my-courses-card-button' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'my-courses-card-button' } }
    />
  </Card>
)

export default MyCourseCardSkeleton
