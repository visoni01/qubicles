import Responder from '../../server/expressResponder'
import { AgentGetAllJobsService } from '../services/people/agent/job'
import { AgentGetTopCompaniesService } from '../services/people/agent/job/getTopCompanies'

export default class agentJobController {
  static async getJobs (req, res) {
    const agentJobs = await AgentGetAllJobsService.execute({ ...req.body, ...req.query })
    if (agentJobs.successful) {
      Responder.success(res, agentJobs.result)
    } else {
      Responder.failed(res, agentJobs.errors)
    }
  }

  static async getTopCompanies (req, res) {
    const topCompaniesData = await AgentGetTopCompaniesService.execute({ ...req.body, ...req.query })
    if (topCompaniesData.successful) {
      Responder.success(res, topCompaniesData.result)
    } else {
      Responder.failed(res, topCompaniesData.errors)
    }
  }
}
