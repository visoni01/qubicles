import express from 'express'
import AgentProfileController from '../../../app/controllers/agentProfile.controller'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'

const args = { mergeParams: true }
const agentProfileRouter = express.Router(args)

agentProfileRouter.route('/settings')
  .get(AgentProfileController.getAgentProfileSettings)

agentProfileRouter.route('/:agent_user_id/ratings')
  .get(isAuthenticated, AgentProfileController.getAgentRatings)

agentProfileRouter.route('/:agent_user_id/reviews')
  .post(isAuthenticated, AgentProfileController.postAgentReview)

agentProfileRouter.route('/:agent_user_id/reviews')
  .get(isAuthenticated, AgentProfileController.getAgentReviews)

export { agentProfileRouter }
