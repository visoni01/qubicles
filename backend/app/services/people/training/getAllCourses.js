import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { fetchAllCourses } from '../../helper/people'
import { formatAllCourses, getErrorMessageForService } from '../../helper'
import _ from 'lodash'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  offset: {
    presence: false
  },
  search_keyword: {
    presence: false
  }
}

export class PeopleGetAllCoursesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { offset, search_keyword } = this.filteredArgs

      const coursesData = await fetchAllCourses({ offset, search_keyword })

      let result = {}

      if (_.isUndefined(coursesData)) {
        result = {
          courses: [],
          count: 0
        }
      } else {
        if (coursesData.courses && coursesData.courses.length) {
          result = {
            courses: formatAllCourses({ courses: coursesData.courses }),
            count: coursesData.count
          }
        } else {
          result = {
            courses: [],
            count: 0
          }
        }
      }

      return result
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleGetAllCoursesService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
