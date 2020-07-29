import ServiceBase from '../../common/serviceBase'
import { getJobsDetailsForClient, getJobsDetailsForUser } from '../helper'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class JobsByCategoryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const client = await getClientIdByUserId({ user_id })
    if (client && client.client_id) {
      // User is an Employer
      const jobs = await getJobsDetailsForClient({ user_id, client_id: client.client_id })
      return jobs
    } else {
      // User is not an Employer
      const jobs = getJobsDetailsForUser({ user_id })
      return jobs
    }
  }
}
