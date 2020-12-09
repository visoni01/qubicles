import ServiceBase from '../../../../common/serviceBase'
import { getJobTitles, getAllJobCategories, getErrorMessageForService, getSkills } from '../../../helper'
import logger from '../../../../common/logger'
import { ERRORS } from '../../../../utils/errors'

export default class JobCategoriesTitlesAndSkills extends ServiceBase {
  async run () {
    try {
      const promises = [
        () => getJobTitles(),
        () => getAllJobCategories({ search_keyword: '' }),
        () => getSkills()
      ]
      const [jobTitles, jobCategories, jobSkills] = await Promise.all(promises.map(promise => promise()))
      return { jobTitles, jobCategories, jobSkills }
    } catch (err) {
      logger.error(`${getErrorMessageForService('JobCategoriesTitlesAndSkills')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
