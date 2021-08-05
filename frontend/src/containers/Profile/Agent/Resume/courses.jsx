/* eslint-disable complexity */
import { Box, Divider, Button } from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import _ from 'lodash'
import { fetchAgentResumeCoursesStart } from '../../../../redux-saga/redux/people'
import { formatDate } from '../../../../utils/common'
import { VIEW_COURSE_ROUTE } from '../../../../routes/routesPath'
import UserCoursesSkeleton from '../../../../components/Profile/Agent/Resume/Skeletons/userCoursesSkeleton'
import CourseBadge from './courseBadge'

const Courses = ({ candidateId }) => {
  const { courses, isLoading } = useSelector((state) => state.agentResumeCourses)
  const [ showAllCourses, setShowAllCourses ] = useState(false)
  const [ currentCourses, setCurrentCourses ] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(fetchAgentResumeCoursesStart({
      candidateId,
    }))
  }, [ dispatch, candidateId ])

  useEffect(() => {
    if (!isLoading) {
      setCurrentCourses(courses.filter((course, index) => index < 3))
    }
  }, [ isLoading, courses ])

  const handleAllCoursesButton = useCallback(() => {
    if (showAllCourses) {
      setCurrentCourses(courses.filter((course, index) => index < 3))
    } else {
      setCurrentCourses(courses)
    }
    setShowAllCourses((state) => !state)
  }, [ courses, showAllCourses ])

  return (
    <Box className='custom-box mb-30'>
      <h3 className='h3 mb-20'>Courses</h3>

      {/* All Courses */}
      <div>
        {!isLoading && currentCourses && currentCourses.length > 0 && currentCourses.map((course, index) => (
          <div key={ course.courseId }>
            <div className='is-flex is-between mt-20 mb-20'>
              <div>
                <Link
                  to={ `${ VIEW_COURSE_ROUTE }/${ course.courseId }` }
                  className='primary-text-link'
                  target='_blank'
                >
                  {course.courseTitle}
                </Link>
                <p className='para light mb-10'>
                  {`${ course.creatorName }, ${ formatDate(course.createdAt, 'YYYY') }`}
                </p>
                <p className='para sz-sx'>
                  {`${ formatDate(course.dateStarted, 'DD, MMM YYYY') } -
                ${ formatDate(course.dateCompleted, 'DD, MMM YYYY') }`}
                </p>
              </div>
              {course.grade && <CourseBadge grade={ course.grade } />}
            </div>
            { currentCourses.length !== (index + 1) && <Divider />}
          </div>
        ))}
        {isLoading === false && currentCourses && !currentCourses.length && (
          <p className='para sz-xl mt-20 text-center'>
            No courses found...
          </p>
        )}
      </div>

      {/* All Courses Skeleton */}
      {(_.isNull(isLoading) || isLoading) && <UserCoursesSkeleton />}

      {/* Show All Courses button */}
      {!isLoading && courses && courses.length > 3 && (
        <Button
          onClick={ handleAllCoursesButton }
          className='is-fullwidth align-self-center'
          classes={ {
            root: 'button-primary-text center bold ',
            label: 'button-primary-text-label',
          } }
        >
          {showAllCourses ? 'Show Less Courses' : 'Show More Courses'}
        </Button>
      )}
    </Box>
  )
}

Courses.propTypes = {
  candidateId: PropTypes.number.isRequired,
}

export default Courses
