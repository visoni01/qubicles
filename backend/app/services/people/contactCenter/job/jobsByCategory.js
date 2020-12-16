import ServiceBase from '../../../../common/serviceBase'
import {
  getAllJobs,
  getErrorMessageForService
} from '../../../helper'
import { getClientIdByUserId } from '../../../helper/user'
import { ERRORS } from '../../../../utils/errors'
import logger from '../../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  search_keyword: {
    presence: false
  },
  category_id: {
    presence: false
  },
  status: {
    presence: false
  }
}

export default class JobsByCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, search_keyword, category_id, status } = this.filteredArgs
      const client = await getClientIdByUserId({ user_id })
      let jobs = []
      if (client && client.client_id) {
        const rest = {
          category_id,
          search_keyword,
          status
        }
        jobs = await getAllJobs({ client_id: client.client_id, ...rest })
      }
      return jobs
    } catch (err) {
      logger.error(`${getErrorMessageForService('JobsByCategoryService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
