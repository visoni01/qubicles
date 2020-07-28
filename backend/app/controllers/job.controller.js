import Responder from '../../server/expressResponder'
import JobsByCategoryService from '../services/job/jobsByCategory'

export default class JobController {
  static async getJobsByCatergory (req, res) {
    const jobs = await JobsByCategoryService.execute(req.body)
    if (jobs.successful) {
      Responder.success(res, jobs.result)
    } else {
      Responder.failed(res, jobs.errors)
    }
  }
}
