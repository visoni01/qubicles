import React, { useCallback } from 'react'
import {
  Box, Grid, Divider, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import DraftCourseCard from './draftCourseCard'
import PublishedCourseCard from './publishedCourseCard'
import ROUTE_PATHS from '../../../../../routes/routesPath'

const MyCourses = () => {
  const history = useHistory()
  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])
  return (
    <Box className='custom-box'>
      <div className='mb-30 display-inline-flex justify-between is-fullwidth'>
        <Button
          onClick={ () => window.history.back() }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          Back
        </Button>
        <Button
          onClick={ handleCreateCourseButton }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label pr-10 pl-10',
          } }
        >
          Create Course
        </Button>
      </div>
      <div className='mb-30'>
        <h3 className='h3 mb-20'>My Courses</h3>
        <Grid container spacing={ 3 }>
          <PublishedCourseCard />
          <PublishedCourseCard />
        </Grid>
      </div>
      <Divider />
      <div className='mt-30 mb-30'>
        <h3 className='h3 mb-20'>Drafts</h3>
        <Grid container spacing={ 3 }>
          <DraftCourseCard />
        </Grid>
      </div>
    </Box>
  )
}

export default MyCourses
