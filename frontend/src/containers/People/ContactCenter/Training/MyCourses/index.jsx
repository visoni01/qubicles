import React, { useCallback, useEffect } from 'react'
import {
  Box, Grid, Divider, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import DraftCourseCard from './draftCourseCard'
import PublishedCourseCard from './publishedCourseCard'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import { allCoursesRequestStart } from '../../../../../redux-saga/redux/people'
import { startLoader, stopLoader } from '../../../../../redux-saga/redux/utils'

const MyCourses = () => {
  const history = useHistory()
  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])

  const { courses, isLoading } = useSelector((state) => state.allCourses)
  const { userDetails } = useSelector((state) => state.login)

  const dispatch = useDispatch()
  useEffect(() => {
    if (userDetails.user_code === 'employer') {
      dispatch(allCoursesRequestStart({
        requestType: 'FETCH',
        ownerId: userDetails.user_id,
      }))
    }

    // eslint-disable-next-line
  }, [ dispatch, userDetails.user_id ])

  useEffect(() => {
    if (isLoading) {
      dispatch(startLoader())
    } else {
      dispatch(stopLoader())
    }
  }, [ isLoading, dispatch ])

  return (
    <Box className='custom-box'>
      <div className='mb-30 display-inline-flex justify-between is-fullwidth'>
        <Button
          onClick={ () => history.push(ROUTE_PATHS.PEOPLE_TRAINING_TAB) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          All Courses
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
      {courses.filter((course) => course.status === 'draft').length > 0 && (
      <div>
        <Divider />
        <div className='mt-30 mb-30'>
          <h3 className='h3 mb-20'>Drafts</h3>
          <Grid container spacing={ 3 }>
            {courses.filter((course) => course.status === 'draft').map((course) => (
              <DraftCourseCard key={ course.courseId } { ...course } />
            ))}
          </Grid>
        </div>
      </div>
      )}
    </Box>
  )
}

export default MyCourses
