/* eslint-disable complexity */
import React, { useCallback, useEffect } from 'react'
import {
  Box, Grid, Divider, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import DraftCourseCard from './draftCourseCard'
import PublishedCourseCard from './publishedCourseCard'
import ROUTE_PATHS, { EDIT_COURSE_ROUTE } from '../../../../../routes/routesPath'
import { allCoursesRequestStart, resetAllCoursesReducer } from '../../../../../redux-saga/redux/people'
import MyCoursesSkeleton from '../../../../../components/People/ContactCenter/SkeletonLoader/Training/myCoursesSkeleton'
import { REQUEST_TYPES, USERS } from '../../../../../utils/constants'

const MyCourses = () => {
  const {
    courses, isLoading, requestType, success,
  } = useSelector((state) => state.allCourses)
  const { userDetails } = useSelector((state) => state.login)

  const history = useHistory()
  const dispatch = useDispatch()

  useEffect(() => {
    if (userDetails.user_code === USERS.EMPLOYER) {
      dispatch(allCoursesRequestStart({
        requestType: REQUEST_TYPES.FETCH,
      }))
    }
    return () => {
      dispatch(resetAllCoursesReducer())
    }
  }, [ dispatch, userDetails.user_code ])

  useEffect(() => {
    if (_.isEqual(requestType, REQUEST_TYPES.UPDATE) && !isLoading && success && !_.isEmpty(courses)) {
      history.push({
        pathname: `${ EDIT_COURSE_ROUTE }/${ courses[ courses.length - 1 ].courseId }`,
        isFirstTime: true,
      })
    }
  }, [ courses, history, isLoading, requestType, success ])

  const handleCreateCourseButton = useCallback(() => {
    history.push(ROUTE_PATHS.CREATE_COURSE)
  }, [ history ])

  if (_.isEqual(userDetails.user_code, USERS.EMPLOYER) && (_.isNull(isLoading) || isLoading)) {
    return (
      <MyCoursesSkeleton />
    )
  }

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

      {courses.filter((course) => course.status === 'published').length > 0 && (
      <div className='mb-30'>
        <h3 className='h3 mb-20'> My Courses </h3>
        <Grid container spacing={ 3 }>
          {courses.filter((course) => course.status === 'published').map((course) => (
            <PublishedCourseCard key={ course.courseId } { ...course } creatorName={ userDetails.full_name } />
          ))}
        </Grid>
      </div>
      )}

      {courses && !_.isUndefined(courses.find((course) => course.status === 'published'))
      && !_.isUndefined(courses.find((course) => course.status === 'draft')) && (
        <Divider className='mb-30' />
      )}

      {courses.filter((course) => course.status === 'draft').length > 0 && (
        <div className='mb-30'>
          <h3 className='h3 mb-20'> Drafts </h3>
          <Grid container spacing={ 3 }>
            {courses.filter((course) => course.status === 'draft').map((course) => (
              <DraftCourseCard key={ course.courseId } { ...course } creatorName={ userDetails.full_name } />
            ))}
          </Grid>
        </div>
      )}
      {courses && !courses.length && (
        <div className='mt-10 mb-10 is-fullwidth'>
          <h3 className='h3 text-center'> No courses found! </h3>
        </div>
      )}
    </Box>
  )
}

export default MyCourses
