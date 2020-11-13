import ServiceBase from '../../common/serviceBase'
import {
  getJobsDetailsForClient,
  getJobsDetailsForUser,
  getJobsDetailsByCategoryForClient
} from '../helper'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  search_keyword: {
    presence: false
  },
  category_id: {
    presence: false
  }
}

export default class JobsByCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, search_keyword, category_id } = this.filteredArgs

    const client = await getClientIdByUserId({ user_id })
    let jobs
    if (client && client.client_id) {
      if (category_id) {
        jobs = await getJobsDetailsByCategoryForClient({ category_id })
      } else {
        jobs = await getJobsDetailsForClient({ user_id, category_id, client_id: client.client_id, search_keyword })
      }
    } else {
      // User is not an Employer
      jobs = getJobsDetailsForUser({ user_id })
    }
    return jobs
  }
}
