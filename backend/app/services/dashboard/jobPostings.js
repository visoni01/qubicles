import ServiceBase from '../../common/serviceBase'
import { getRecentJobsByClient } from '../helper/job'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class JobPostings extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const userClientId = await getClientIdByUserId({ userId: this.user_id })
    const recentJobs = await getRecentJobsByClient({ client_id: userClientId })
    return recentJobs
  }
}
