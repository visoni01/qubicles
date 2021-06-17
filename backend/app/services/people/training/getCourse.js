import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { findStudentsEnrolledCount, getErrorMessageForService } from '../../helper'
import { getCourseById, formatCourseData, getCategoryTitleById } from '../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  course_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetCourseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { course_id, user_id } = this.filteredArgs

      const studentsEnrolled = await findStudentsEnrolledCount({ course_id })
      if (studentsEnrolled > 0) {
        return this.addError(ERRORS.NOT_FOUND, MESSAGES.CANNOT_EDIT_COURSE)
      }

      const course = await getCourseById({ course_id, user_id })
      if (course) {
        const categoryTitle = await getCategoryTitleById({ category_id: course.category_id })
        const formattedCourse = formatCourseData({ course, categoryTitle })
        return formattedCourse
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.COURSE_NOT_FOUND)
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleGetCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
