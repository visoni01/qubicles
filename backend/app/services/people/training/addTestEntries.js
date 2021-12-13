import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import _ from 'lodash'
import { getErrorMessageForService } from '../../helper'
import {
  checkCourseStatus, addTestEntries, checkTestEvaluation, calculateCourseGradesSectionWise, updateCourseStatus
} from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course_id: {
    presence: { allowEmpty: false }
  },
  section_id: {
    presence: { allowEmpty: false }
  },
  questions: {
    presence: { allowEmpty: false }
  },
  course_status: {
    presence: { allowEmpty: false }
  }
}

export class PeopleAddTestEntriesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, course_id, section_id, questions, course_status } = this.filteredArgs

      await addTestEntries({ user_id, course_id, sectionIds: [section_id], questions, testType: 'section_wise' })

      const courseStatus = await checkCourseStatus({ user_id, course_id })

      if (_.isEqual(course_status, 'completed') && !_.isEqual(courseStatus.status, 'completed')) {
        const isTestEvaluated = await checkTestEvaluation({ user_id, course_id, testType: 'section_wise' })
        let grade

        if (isTestEvaluated) {
          grade = await calculateCourseGradesSectionWise({ user_id, course_id })
          return { grade }
        }

        await updateCourseStatus({ user_id, course_id, grade })
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddTestEntriesService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
