import React from 'react'
import { Skeleton } from '@material-ui/lab'
import PropTypes from 'prop-types'
import './styles.scss'

const ViewCourseTestSkeleton = ({ type }) => (
  <div className='course-test-skeleton-container'>
    <Skeleton
      animation='wave'
      classes={ { root: 'course-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'section-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'test-title' } }
    />
    <Skeleton
      animation='wave'
      classes={ { root: 'progress-bar' } }
    />
    <div className='custom-box mt-20'>
      <Skeleton
        animation='wave'
        classes={ { root: 'question-title' } }
      />
      {[ ...Array(3).keys() ].map((val) => (
        <div className='display-inline-flex options' key={ val }>
          <Skeleton
            animation='wave'
            variant='circle'
            classes={ { root: 'option-bullet' } }
          />
          <Skeleton
            animation='wave'
            classes={ { root: 'option-title' } }
          />
        </div>
      ))}
    </div>
    <div className='custom-box mt-20'>
      <Skeleton
        animation='wave'
        classes={ { root: 'question-title' } }
      />
      <Skeleton
        animation='wave'
        classes={ { root: 'answer-box' } }
      />
    </div>
    {type === 'test' && (
      <Skeleton
        animation='wave'
        classes={ { root: 'button' } }
      />
    )}
  </div>
)

ViewCourseTestSkeleton.defaultProps = {
  type: 'test',
}

ViewCourseTestSkeleton.propTypes = {
  type: PropTypes.string,
}

export default ViewCourseTestSkeleton
