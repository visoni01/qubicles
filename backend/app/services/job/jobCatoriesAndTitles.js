import ServiceBase from '../../common/serviceBase'
import { getJobTitles, getAllJobCategories, getErrorMessageForService } from '../helper'
import logger from '../../common/logger'
import { ERRORS } from '../../utils/errors'

export default class JobCatoriesAndTitles extends ServiceBase {
  async run () {
    try {
      const promises = [
        () => getJobTitles(),
        () => getAllJobCategories()
      ]
      const [jobTitles, jobCategories] = await Promise.all(promises.map(promise => promise()))
      return { jobTitles, jobCategories }
    } catch (err) {
      logger.error(getErrorMessageForService('JobCatoriesAndTitles'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
