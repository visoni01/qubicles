import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box } from '@material-ui/core'
import './styles.scss'

const CourseDescriptionSkeleton = () => (
  <Box className='custom-box'>
    <div className='course-description-skeleton-container'>
      <div className='course-description-body'>
        <Skeleton
          animation='wave'
          classes={ { root: 'heading' } }
        />
        {[ ...Array(4).keys() ].map((val) => (
          <div key={ val }>
            <Skeleton
              animation='wave'
              classes={ { root: 'title' } }
            />
            <Skeleton
              animation='wave'
              classes={ { root: 'description' } }
            />
          </div>
        ))}
      </div>
    </div>
  </Box>
)

export default CourseDescriptionSkeleton
