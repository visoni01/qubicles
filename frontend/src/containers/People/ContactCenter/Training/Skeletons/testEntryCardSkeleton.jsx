import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'

const TestEntryCardSkeleton = ({ val }) => (
  <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item key={ val }>
    <Card
      className='test-entry-card'
    >
      <div className='display-inline-flex is-fullwidth'>
        <Skeleton
          animation='wave'
          classes={ { root: 'heading' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'sub-heading' } }
        />
      </div>
      <div className='display-inline-flex is-fullwidth mt-10'>
        <Skeleton
          animation='wave'
          variant='circle'
          classes={ { root: 'picture' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'username' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'button' } }
        />
      </div>
    </Card>
  </Grid>
)

TestEntryCardSkeleton.propTypes = {
  val: PropTypes.number.isRequired,
}

export default TestEntryCardSkeleton
