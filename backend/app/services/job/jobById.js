import ServiceBase from '../../common/serviceBase'
import { getJobById, getErrorMessageForService, getSkillsByJobId, getCoursesByJobId } from '../helper'
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

      const promises = [
        () => getJobById({ job_id }),
        () => getSkillsByJobId({ job_id }),
        () => getCoursesByJobId({ job_id })
      ]
      const [jobDetails, jobSkillsData, jobCoursesData] = await Promise.all(promises.map(promise => promise()))
      return { jobDetails, jobSkillsData, jobCoursesData }
    } catch (err) {
      logger.error(`${getErrorMessageForService('JobByIdService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
