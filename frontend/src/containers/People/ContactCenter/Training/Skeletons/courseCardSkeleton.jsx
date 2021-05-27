import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Card } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './styles.scss'

const CourseCardSkeleton = ({ type }) => (
  <Card
    className={ _.isEqual(type, 'Enrolled Courses') ? 'course-card extra-height' : 'course-card' }
  >
    <Skeleton
      animation='wave'
      classes={ { root: _.isEqual(type, 'Enrolled Courses') ? 'enrolled-course-card-picture' : 'course-card-picture' } }
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
      {_.isEqual(type, 'Enrolled Courses') && (
        <Skeleton
          animation='wave'
          classes={ { root: 'enrolled-course-card-button' } }
        />
      )}
    </div>
  </Card>
)

CourseCardSkeleton.propTypes = {
  type: PropTypes.string.isRequired,
}

export default CourseCardSkeleton
