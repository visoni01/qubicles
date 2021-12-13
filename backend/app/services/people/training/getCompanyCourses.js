import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { fetchUserCompanies, fetchCompaniesUsers, getErrorMessageForService, getAllViewCourses } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  clientId: {
    presence: false
  },
  courseFilter: {
    presence: false
  },
  offset: {
    presence: false
  }
}

export class PeopleGetCompanyCoursesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, clientId, courseFilter, offset } = this.filteredArgs
      let clientIds = [clientId]
      let response = {
        courses: [],
        count: 0
      }

      if (!clientId) {
        clientIds = await fetchUserCompanies({ user_id })
      }

      if (clientIds && clientIds.length > 0) {
        const companiesUsers = await fetchCompaniesUsers({ clientIds })
        response = await getAllViewCourses({ courseFilter, offset, creatorIds: companiesUsers })
      }

      return response
    } catch (e) {
      logger.error(getErrorMessageForService('PeopleGetCompanyCoursesService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
