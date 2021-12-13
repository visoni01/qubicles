import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import _ from 'lodash'
import { getErrorMessageForService } from '../../helper'
import {
  checkAuthenticUser, updateTestEntry, checkCourseStatus, checkTestEvaluation, calculateCourseGradesSectionWise,
  calculateCourseGradesAssessmentWise, updateCourseStatus
} from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course_id: {
    presence: { allowEmpty: false }
  },
  candidate_id: {
    presence: { allowEmpty: false }
  },
  validated_data: {
    presence: { allowEmpty: false }
  },
  test_type: {
    presence: { allowEmpty: false }
  }
}

export class PeopleUpdateTestEntryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, course_id, candidate_id, validated_data, test_type } = this.filteredArgs

      const isAuthenticUser = await checkAuthenticUser({ user_id, course_id })

      if (isAuthenticUser) {
        await updateTestEntry({ validatedData: validated_data })

        const courseStatus = await checkCourseStatus({ user_id: candidate_id, course_id })

        if (courseStatus && _.isNull(courseStatus.grade) && _.isEqual(courseStatus.status, 'completed')) {
          const isTestEvaluated = await checkTestEvaluation({ user_id: candidate_id, course_id, testType: test_type })

          if (isTestEvaluated) {
            let grade

            if (_.isEqual(test_type, 'assessment')) {
              grade = await calculateCourseGradesAssessmentWise({ user_id: candidate_id, course_id })
            } else if (_.isEqual(test_type, 'section_wise')) {
              grade = await calculateCourseGradesSectionWise({ user_id: candidate_id, course_id })
            }

            await updateCourseStatus({ user_id: candidate_id, course_id, grade })
          }
        }
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.UNAUTHORIZED)
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleUpdateTestEntryService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
