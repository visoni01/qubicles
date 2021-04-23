import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, getAllCourseInfo, formatCourseCard } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  ownerId: {
    presence: false
  }
}

export class PeopleGetAllCoursesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { ownerId } = this.filteredArgs
      const courses = await getAllCourseInfo({ ownerId })
      const formattedCourses = courses.map(course => formatCourseCard({ course }))
      return formattedCourses
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddNewCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
