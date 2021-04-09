import Responder from '../../server/expressResponder'
import GetAgentProfileSettingsService from '../services/profile/agent/getAgentProfileSettings'
import PostAgentReviewService from '../services/profile/agent/postAgentReview'
import GetAgentRatingsService from '../services/profile/agent/getAgentRatings'
import GetAgentReviewsService from '../services/profile/agent/getAgentReviews'

export default class AgentProfileController {
  static async getAgentProfileSettings (req, res) {
    const agentProfileSettings = await GetAgentProfileSettingsService.execute({ ...req.body })
    if (agentProfileSettings.successful) {
      Responder.success(res, agentProfileSettings.result)
    } else {
      Responder.failed(res, agentProfileSettings.errors)
    }
  }

  static async postAgentReview (req, res) {
    const agentReviewResult = await PostAgentReviewService.execute({ ...req.body, ...req.params })
    if (agentReviewResult.successful) {
      Responder.success(res, agentReviewResult.result)
    } else {
      Responder.failed(res, agentReviewResult.errors)
    }
  }

  static async getAgentRatings (req, res) {
    const agentRatingsResult = await GetAgentRatingsService.execute({ ...req.body, ...req.params })
    if (agentRatingsResult.successful) {
      Responder.success(res, agentRatingsResult.result)
    } else {
      Responder.failed(res, agentRatingsResult.errors)
    }
  }

  static async getAgentReviews (req, res) {
    const agentReviewResult = await GetAgentReviewsService.execute({ ...req.body, ...req.params, ...req.query })
    if (agentReviewResult.successful) {
      Responder.success(res, agentReviewResult.result)
    } else {
      Responder.failed(res, agentReviewResult.errors)
    }
  }
}
