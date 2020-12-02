import Responder from '../../server/expressResponder'
import JobsByCategoryService from '../services/people/contactCenter/job/jobsByCategory'
import DeleteJobService from '../services/people/contactCenter/job/delete'
import GetJobByIdService from '../services/people/contactCenter/job/jobById'
import UpdateJobService from '../services/people/contactCenter/job/update'
import GetJobCategoriesTitlesAndSkillsService from '../services/people/contactCenter/job/jobCategoriesTitlesAndSkills'
import AddNewJobService from '../services/people/contactCenter/job/create'
import JobPostCompanyDetailsService from '../services/people/contactCenter/job/jobPostCompanyDetails'
import FetchJobCategoriesService from '../services/people/contactCenter/job/jobCategories'

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
    const deleteJob = await DeleteJobService.execute({ ...req.body, ...req.params })
    if (deleteJob.successful) {
      Responder.success(res, deleteJob.result)
    } else {
      Responder.failed(res, deleteJob.errors)
    }
  }

  static async getJobById (req, res) {
    const job = await GetJobByIdService.execute({ user: req.body.user, ...req.params })
    if (job.successful) {
      Responder.success(res, job.result)
    } else {
      Responder.failed(res, job.errors)
    }
  }

  static async updateJob (req, res) {
    const updateJob = await UpdateJobService.execute({ ...req.body, ...req.params })
    if (updateJob.successful) {
      Responder.success(res, updateJob.result)
    } else {
      Responder.failed(res, updateJob.errors)
    }
  }

  static async getJobCategoriesTitlesAndSkills (req, res) {
    const jobTitles = await GetJobCategoriesTitlesAndSkillsService.execute({
      user: req.body.user,
      ...req.query
    })
    if (jobTitles.successful) {
      Responder.success(res, jobTitles.result)
    } else {
      Responder.failed(res, jobTitles.errors)
    }
  }

  static async addNewJob (req, res) {
    const addJob = await AddNewJobService.execute({ ...req.body, ...req.params })
    if (addJob.successful) {
      Responder.success(res, addJob.result)
    } else {
      Responder.failed(res, addJob.errors)
    }
  }

  static async getJobPostCompanyDetails (req, res) {
    const jobPostCompanyDetails = await JobPostCompanyDetailsService.execute({ ...req.body, ...req.params })
    if (jobPostCompanyDetails.successful) {
      Responder.success(res, jobPostCompanyDetails.result)
    } else {
      Responder.failed(res, jobPostCompanyDetails.errors)
    }
  }

  static async getJobCategories (req, res) {
    const jobs = await FetchJobCategoriesService.execute({ ...req.body, ...req.query })
    if (jobs.successful) {
      Responder.success(res, jobs.result)
    } else {
      Responder.failed(res, jobs.errors)
    }
  }
}
