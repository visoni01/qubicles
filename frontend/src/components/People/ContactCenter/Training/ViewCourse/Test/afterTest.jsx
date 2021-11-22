import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import TestCompleted from './testCompleted'
import {
  courseIdPropType, sectionIdPropType,
} from '../../../../../../containers/People/ContactCenter/Training/ViewCourse/propTypes'
import TestResult from './TestResult/testResult'
import { viewCourseRequestStart } from '../../../../../../redux-saga/redux/people'
import { REQUEST_TYPES } from '../../../../../../utils/constants'
import { SECTION_TEST_RESULT } from '../../../../../../redux-saga/redux/constants'

const AfterTest = ({
  courseId, sectionId, totalQuestions, totalAnswered,
}) => {
  const [ isFetched, setIsFetched ] = useState(false)

  const { course, isLoading } = useSelector((state) => state.viewCourse)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!isFetched && !course?.courseContent?.sections?.find((section) => section.id === sectionId)?.isTestEvaluated) {
      dispatch(viewCourseRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: SECTION_TEST_RESULT,
        courseId,
        sectionId,
      }))
      setIsFetched(true)
    }
  }, [ dispatch, isFetched, course, courseId, sectionId ])

  if (isLoading) {
    return <></>
  }

  return (
    <>
      {course?.courseContent?.sections?.find((section) => section.id === sectionId)?.isTestEvaluated
        ? (
          <TestResult
            testResult={ course.courseContent.sections.find((section) => section.id === sectionId).testResult }
            creatorName={ course.informationSection?.creatorName }
          />
        )
        : (
          <TestCompleted
            totalQuestions={ totalQuestions }
            totalAnswered={ totalAnswered }
          />
        )}
    </>
  )
}

AfterTest.defaultProps = {
  totalQuestions: null,
  totalAnswered: null,
}

AfterTest.propTypes = {
  courseId: courseIdPropType.isRequired,
  sectionId: sectionIdPropType.isRequired,
  totalQuestions: PropTypes.number,
  totalAnswered: PropTypes.number,
}

export default AfterTest
