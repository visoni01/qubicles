import Responder from '../../server/expressResponder'
import JobsByCategoryService from '../services/job/jobsByCategory'
import PeopleDeleteJobService from '../services/job/deleteJobs'
import PeopleAddJobService from '../services/job/create'

export default class JobController {
  static async getJobsByCategory (req, res) {
    const jobs = await JobsByCategoryService.execute({ ...req.body, ...req.query })
    if (jobs.successful) {
      Responder.success(res, jobs.result)
    } else {
      Responder.failed(res, jobs.errors)
    }
  }

  static async deleteJob (req, res) {
    const deleteJob = await PeopleDeleteJobService.execute({ ...req.body, ...req.params })
    if (deleteJob.successful) {
      Responder.success(res, deleteJob.result)
    } else {
      Responder.failed(res, deleteJob.errors)
    }
  }

  static async addJob (req, res) {
    const addJob = await PeopleAddJobService.execute({ ...req.body, ...req.params })
    if (addJob.successful) {
      Responder.success(res, addJob.result)
    } else {
      Responder.failed(res, addJob.errors)
    }
  }
}
