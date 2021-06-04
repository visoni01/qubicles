import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'
import { Card, Grid } from '@material-ui/core'

const TestEntriesValidationSkeleton = () => (
  <div className='test-entries-validation-skeleton-container'>
    <Skeleton
      animation='wave'
      classes={ { root: 'heading mb-20' } }
    />
    <Grid container spacing={ 3 }>
      {[ ...Array(3).keys() ].map((val) => (
        <Grid item xs={ 12 } key={ val }>
          <Card className='custom-box'>
            <Skeleton
              animation='wave'
              classes={ { root: 'question' } }
            />
            <div className='display-inline-flex is-fullwidth content mt-10 mb-20'>
              <Skeleton
                animation='wave'
                variant='circle'
                classes={ { root: 'picture' } }
              />
              <Skeleton
                animation='wave'
                classes={ { root: 'answer' } }
              />
            </div>
            <div className='display-inline-flex justify-end is-fullwidth'>
              <Skeleton
                animation='wave'
                classes={ { root: 'reference-answer-button' } }
              />
              <Skeleton
                animation='wave'
                classes={ { root: 'button' } }
              />
              <Skeleton
                animation='wave'
                classes={ { root: 'button' } }
              />
            </div>
          </Card>
        </Grid>
      ))}
    </Grid>
  </div>
)

export default TestEntriesValidationSkeleton
