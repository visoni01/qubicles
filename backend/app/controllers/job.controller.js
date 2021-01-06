import Responder from '../../server/expressResponder'
import {
  JobsByCategoryService,
  DeleteJobService,
  GetJobByIdService,
  UpdateJobService,
  GetJobCategoriesTitlesAndSkillsService,
  AddNewJobService,
  FetchJobCategoriesService
} from '../services/people/contactCenter/job'
import JobPostCompanyDetailsService from '../services/people/contactCenter/job/jobPostCompanyDetails'

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
