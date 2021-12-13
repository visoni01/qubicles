import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { viewCourseRequestStart } from '../../../../../../redux-saga/redux/people'
import { REQUEST_TYPES } from '../../../../../../utils/constants'
import { SECTION_TEST_RESULT } from '../../../../../../redux-saga/redux/constants'
import { courseIdPropType, sectionIdPropType } from '../propTypes'
import TestCompleted from '../../../../../../components/People/ContactCenter/Training/ViewCourse/Test/testCompleted'
import ViewCourseTestSkeleton
  from '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/viewCourseTestSkeleton'
import TestResult
  from '../../../../../../components/People/ContactCenter/Training/ViewCourse/Test/TestResult/testResult'

const AfterTest = ({
  courseId, sectionId, totalQuestions, totalAnswered,
}) => {
  const [ isFetched, setIsFetched ] = useState(false)

  const { isLoading, course } = useSelector((state) => state.viewCourse)

  const dispatch = useDispatch()

  useEffect(() => {
    if (!_.isUndefined(course?.courseContent?.sections?.find((section) => section.id === sectionId)?.isTestEvaluated)) {
      setIsFetched(true)
    }
    return () => setIsFetched(false)
  }, [ course, sectionId ])

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
    return <ViewCourseTestSkeleton type='result' />
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
