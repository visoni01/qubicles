import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card, Grid } from '@material-ui/core'
import PropTypes from 'prop-types'
import './styles.scss'

const CourseCardSkeleton = ({ val }) => (
  <Grid xl={ 4 } lg={ 4 } md={ 6 } sm={ 12 } item key={ val }>
    <Card
      className='course-card'
    >
      <Skeleton
        animation='wave'
        classes={ { root: 'course-card-picture' } }
      />
      <div className='display-inline-flex'>
        <Skeleton
          animation='wave'
          classes={ { root: 'rating' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'student' } }
        />
      </div>
      <Skeleton
        animation='wave'
        classes={ { root: 'title' } }
      />
      <div className='display-inline-flex'>
        <Skeleton
          animation='wave'
          classes={ { root: 'rating' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'student' } }
        />
      </div>
    </Card>
  </Grid>
)

CourseCardSkeleton.propTypes = {
  val: PropTypes.number.isRequired,
}

export default CourseCardSkeleton
