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
      <div className='course-card-contents'>
        <div className='display-inline-flex is-fullwidth'>
          <Skeleton
            animation='wave'
            classes={ { root: 'course-card-rating' } }
          />
          <Skeleton
            animation='wave'
            classes={ { root: 'course-card-student' } }
          />
        </div>
        <Skeleton
          animation='wave'
          classes={ { root: 'course-card-title' } }
        />
        <Skeleton
          animation='wave'
          classes={ { root: 'course-card-creator' } }
        />
        <div className='display-inline-flex is-fullwidth'>
          <Skeleton
            animation='wave'
            classes={ { root: 'course-card-rating' } }
          />
          <Skeleton
            animation='wave'
            variant='circle'
            classes={ { root: 'course-card-separator' } }
          />
          <Skeleton
            animation='wave'
            classes={ { root: 'course-card-student' } }
          />
        </div>
      </div>
    </Card>
  </Grid>
)

CourseCardSkeleton.propTypes = {
  val: PropTypes.number.isRequired,
}

export default CourseCardSkeleton
