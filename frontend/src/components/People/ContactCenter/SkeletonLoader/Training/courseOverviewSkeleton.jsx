import React from 'react'
import { Skeleton } from '@material-ui/lab'
import { Box, Grid } from '@material-ui/core'
import './styles.scss'

const CourseOverviewSkeleton = () => (
  <Box className='custom-box'>
    <div className='course-overview-skeleton-container'>
      <Skeleton
        animation='wave'
        classes={ { root: 'heading' } }
      />
      <div className='custom-box course-overview-body'>
        <div className='custom-box section-details'>
          <Skeleton
            animation='wave'
            classes={ { root: 'section-title' } }
          />
          {[ ...Array(3).keys() ].map((val) => (
            <div className='display-inline-flex justify-between is-fullwidth' key={ val }>
              <Skeleton
                animation='wave'
                classes={ { root: 'unit-title' } }
              />
              <Skeleton
                animation='wave'
                classes={ { root: 'start' } }
              />
            </div>
          ))}
        </div>
        <Grid container spacing={ 2 } className='section'>
          {[ ...Array(2).keys() ].map((val) => (
            <Skeleton
              key={ val }
              animation='wave'
              classes={ { root: 'section-title' } }
            />
          ))}
        </Grid>
      </div>
    </div>
  </Box>
)

export default CourseOverviewSkeleton
