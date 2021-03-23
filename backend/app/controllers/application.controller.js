import Responder from '../../server/expressResponder'
import {
  PeopleCreateJobApplicationService,
  PeopleFetchJobApplicationService,
  PeopleFetchJobApplicationsByJobIdService,
  PeopleFetchJobApplicationsByAgentService,
  PeopleUpdateJobApplicationService
} from '../services/people/application'

export default class ApplicationController {
  static async createJobApplication (req, res) {
    const jobApplication = await PeopleCreateJobApplicationService.execute({ ...req.body })
    if (jobApplication.successful) {
      Responder.success(res, jobApplication.result)
    } else {
      Responder.failed(res, jobApplication.errors)
    }
  }

  static async fetchJobApplication (req, res) {
    const jobApplication = await PeopleFetchJobApplicationService.execute({ ...req.body, ...req.query })
    if (jobApplication.successful) {
      Responder.success(res, jobApplication.result)
    } else {
      Responder.failed(res, jobApplication.errors)
    }
  }

  static async fetchAllJobApplicationsByJobId (req, res) {
    const jobApplications = await PeopleFetchJobApplicationsByJobIdService.execute({ ...req.body, ...req.params })
    if (jobApplications.successful) {
      Responder.success(res, jobApplications.result)
    } else {
      Responder.failed(res, jobApplications.errors)
    }
  }

  static async fetchAllJobApplicationsByAgent (req, res) {
    const jobApplications = await PeopleFetchJobApplicationsByAgentService.execute({
      ...req.body,
      ...req.params,
      ...req.query
    })
    if (jobApplications.successful) {
      Responder.success(res, jobApplications.result)
    } else {
      Responder.failed(res, jobApplications.errors)
    }
  }

  static async updateJobApplication (req, res) {
    const jobApplication = await PeopleUpdateJobApplicationService.execute({ ...req.body, ...req.params })
    if (jobApplication.successful) {
      Responder.success(res, jobApplication.result)
    } else {
      Responder.failed(res, jobApplication.errors)
    }
  }
}
