import Responder from '../../server/expressResponder'

export default class JobController {
  static async getJobsByCatergory (req, res) {
    const jobs = await JobsByCatergory.execute(req.body)
    if (jobs.successful) {
      Responder.success(res, jobs.result)
    } else {
      Responder.failed(res, jobs.errors)
    }
  }
}
