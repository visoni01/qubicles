import React from 'react'
import { Skeleton } from '@material-ui/lab'
import './styles.scss'

const AssessmentTestSkeleton = () => (
  <div className='course-test-skeleton-container assessment-test'>
    <Skeleton
      animation='wave'
      classes={ { root: 'assessment-test-title' } }
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
  </div>
)

export default AssessmentTestSkeleton
