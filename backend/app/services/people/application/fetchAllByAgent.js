import ServiceBase from '../../../common/serviceBase'
import { getErrorMessageForService } from '../../helper'
import Logger from '../../../common/logger'
import { ERRORS } from '../../../utils/errors'
import { fetchAgentJobApplicationList } from '../../helper/jobApplication'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  agent_user_id: {
    presence: { allowEmpty: false }
  },
  limit: {
    presence: { allowEmpty: false }
  },
  offset: {
    presence: { allowEmpty: false }
  },
  statusTypes: {
    presence: { allowEmpty: false }
  }
}

export class PeopleFetchJobApplicationsByAgentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { agent_user_id, limit, offset, statusTypes } = this.filteredArgs
    try {
      const { applications, more } = await fetchAgentJobApplicationList({
        agentUserId: Number(agent_user_id),
        // Setting limit & offset to positive default values
        offset: Number(offset) < 0 ? 0 : Number(offset),
        limit: Number(limit) < 0 ? 2 : Number(limit),
        statusTypes
      })
      return { applications, more }
    } catch (err) {
      Logger.error(`${getErrorMessageForService('PeopleFetchJobApplicationsByAgentService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
