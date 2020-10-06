import ServiceBase from '../../common/serviceBase'
import { getJobById, getErrorMessageForService } from '../helper'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
const constraints = {
  job_id: {
    presence: { allowEmpty: false }
  }
}

export default class JobByIdService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { job_id } = this.filteredArgs
      const jobDetails = await getJobById({ job_id })
      return jobDetails
    } catch (err) {
      logger.error(`${getErrorMessageForService('JobByIdService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
