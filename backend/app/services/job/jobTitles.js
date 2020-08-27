import ServiceBase from '../../common/serviceBase'
import { getJobTitles, getAllJobCategories } from '../helper'

export default class JobCatoriesAndTitles extends ServiceBase {
  async run () {
    const promises = [
      () => getJobTitles(),
      () => getAllJobCategories()
    ]
    const [jobTitles, jobCategories] = await Promise.all(promises.map(promise => promise()))
    return { jobTitles, jobCategories }
  }
}
