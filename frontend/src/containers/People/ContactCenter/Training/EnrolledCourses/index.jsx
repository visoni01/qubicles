/* eslint-disable complexity */
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
import EnrolledCoursesSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Training/enrolledCoursesSkeleton'

const EnrolledCourses = () => {
  const { enrolledCourses, isLoading } = useSelector((state) => state.enrolledCourses)

  const history = useHistory()
  const dispatch = useDispatch()

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

      {(_.isNull(isLoading) || isLoading) && <EnrolledCoursesSkeleton />}

      {!isLoading && enrolledCourses && enrolledCourses.filter((course) => (
        (_.isEqual(course.status, 'inprogress') || _.isEqual(course.status, 'enrolled'))
      )).length > 0 && (
        <div className='mb-30'>
          <h3 className='h3 mb-20'>Enrolled Courses</h3>
          <Grid container spacing={ 3 }>
            {enrolledCourses.filter((course) => (
              (_.isEqual(course.status, 'inprogress') || _.isEqual(course.status, 'enrolled'))
            )).map((course) => (
              <EnrolledCourseCard key={ course.courseId } { ...course } />
            ))}
          </Grid>
        </div>
      )}

      {!isLoading && enrolledCourses
      && !_.isUndefined(enrolledCourses.find((course) => [ 'inprogress', 'enrolled' ].includes(course.status)))
      && !_.isUndefined(enrolledCourses.find((course) => [ 'completed', 'dropped' ].includes(course.status)))
      && (
        <Divider />
      )}

      {!isLoading && enrolledCourses && enrolledCourses.filter((course) => (
        _.isEqual(course.status, 'completed') || _.isEqual(course.status, 'dropped')
      )).length > 0 && (
        <div>
          <div className='mt-30 mb-30'>
            <h3 className='h3 mb-20'>Other Courses</h3>
            <Grid container spacing={ 3 }>
              {enrolledCourses.filter((course) => (
                _.isEqual(course.status, 'completed') || _.isEqual(course.status, 'dropped')
              )).map((course) => (
                <EnrolledCourseCard key={ course.courseId } { ...course } />
              ))}
            </Grid>
          </div>
        </div>
      )}

      {!isLoading && (!enrolledCourses || _.isEmpty(enrolledCourses)) && (
        <div className='mt-10 mb-10 is-fullwidth'>
          <h3 className='h3 text-center'> No courses found! </h3>
        </div>
      )}
    </Box>
  )
}

export default EnrolledCourses
