import React from 'react'
import PropTypes from 'prop-types'
import TestCompleted from './testCompleted'
import {
  courseIdPropType, sectionIdPropType,
} from '../../../../../../containers/People/ContactCenter/Training/ViewCourse/propTypes'
import TestResult from './TestResult/testResult'

const AfterTest = ({
  courseId, sectionId, showInstantResult, totalQuestions, totalAnswered,
}) => {
  // WIP
  if (!showInstantResult) {
    return (
      <TestCompleted
        totalQuestions={ totalQuestions }
        totalAnswered={ totalAnswered }
      />
    )
  }

  return (
    <TestResult />
  )
}

AfterTest.defaultProps = {
  showInstantResult: false,
  totalQuestions: null,
  totalAnswered: null,
}

AfterTest.propTypes = {
  courseId: courseIdPropType.isRequired,
  sectionId: sectionIdPropType.isRequired,
  showInstantResult: PropTypes.bool,
  totalQuestions: PropTypes.number,
  totalAnswered: PropTypes.number,
}

export default AfterTest
