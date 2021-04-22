import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, getAllCourseInfo, formatCourseCard } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  owner_id: {
    presence: false
  }
}

export class PeopleGetAllCoursesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { owner_id } = this.filteredArgs
      const courses = await getAllCourseInfo({ owner_id })
      const formattedCourses = courses.map(course => formatCourseCard({ course }))
      return formattedCourses
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleAddNewCourseService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
