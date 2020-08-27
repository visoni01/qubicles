import Responder from '../../server/expressResponder'
import JobsByCategoryService from '../services/job/jobsByCategory'
import DeleteJobService from '../services/job/deleteJobs'
import AddJobService from '../services/job/create'
import GetJobCategoriesAndTitlesService from '../services/job/jobTitles'

export default class JobController {
  static async getJobsByCategory (req, res) {
    const jobs = await JobsByCategoryService.execute({ ...req.body, ...req.query })
    if (jobs.successful) {
      Responder.success(res, jobs.result)
    } else {
      Responder.failed(res, jobs.errors)
    }
  }

  static async getJobCategoriesAndTitles (req, res) {
    const jobTitles = await GetJobCategoriesAndTitlesService.execute({ ...req.query })
    if (jobTitles.successful) {
      Responder.success(res, jobTitles.result)
    } else {
      Responder.failed(res, jobTitles.errors)
    }
  }

  static async deleteJob (req, res) {
    const deleteJob = await DeleteJobService.execute({ ...req.body, ...req.params })
    if (deleteJob.successful) {
      Responder.success(res, deleteJob.result)
    } else {
      Responder.failed(res, deleteJob.errors)
    }
  }

  static async addJob (req, res) {
    const addJob = await AddJobService.execute({ ...req.body, ...req.params })
    if (addJob.successful) {
      Responder.success(res, addJob.result)
    } else {
      Responder.failed(res, addJob.errors)
    }
  }
}
