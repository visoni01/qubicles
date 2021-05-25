import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'
import { Grid } from '@material-ui/core'
import TestEntryCardSkeleton from './testEntryCardSkeleton'

const TestEntriesSkeleton = () => (
  <div className='test-entries-skeleton-container'>
    <div className='test-entries-content'>
      <Skeleton
        animation='wave'
        classes={ { root: 'course-title' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'heading' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'paragraph' } }
      />
    </div>
    <Grid container spacing={ 4 }>
      {[ ...Array(9).keys() ].map((val) => (
        <TestEntryCardSkeleton
          key={ val }
          val={ val }
        />
      ))}
    </Grid>
  </div>
)

export default TestEntriesSkeleton
