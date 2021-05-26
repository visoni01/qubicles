import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import {
  Box, Button, Divider, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import _ from 'lodash'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import EnrolledCourseCard from './enrolledCourseCard'
import { enrolledCoursesRequestStart, resetEnrolledCoursesReducer } from '../../../../../redux-saga/redux/people'

const EnrolledCourses = () => {
  const history = useHistory()
  const dispatch = useDispatch()
  const { enrolledCourses } = useSelector((state) => state.enrolledCourses)

  useEffect(() => {
    dispatch(enrolledCoursesRequestStart())

    return () => dispatch(resetEnrolledCoursesReducer())
  }, [ dispatch ])

  return (
    <Box className='custom-box'>
      <div className='mb-30'>
        <Button
          onClick={ () => history.push(ROUTE_PATHS.PEOPLE_TRAINING_TAB) }
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
        >
          <FontAwesomeIcon icon={ faChevronLeft } className='custom-fa-icon white mr-10' />
          Back
        </Button>
      </div>

      {enrolledCourses && enrolledCourses.filter((course) => course.courseProgress < 100).length > 0 && (
      <div className='mb-30'>
        <h3 className='h3 mb-20'>Enrolled Courses</h3>
        <Grid container spacing={ 3 }>
          {enrolledCourses.filter((course) => course.courseProgress < 100).map((course) => (
            <EnrolledCourseCard key={ course.courseId } { ...course } />
          ))}
        </Grid>
      </div>
      )}

      {enrolledCourses && enrolledCourses.filter((course) => course.courseProgress === 100).length > 0 && (
      <div>
        <Divider />
        <div className='mt-30 mb-30'>
          <h3 className='h3 mb-20'>Passed Courses</h3>
          <Grid container spacing={ 3 }>
            {enrolledCourses.filter((course) => course.courseProgress === 100).map((course) => (
              <EnrolledCourseCard key={ course.courseId } { ...course } />
            ))}
          </Grid>
        </div>
      </div>
      )}

      {(!enrolledCourses || _.isEmpty(enrolledCourses)) && (
      <div className='mt-10 mb-10 is-fullwidth'>
        <h3 className='h3 text-center'>No courses found!</h3>
      </div>
      )}
    </Box>
  )
}

export default EnrolledCourses
