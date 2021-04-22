import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import agentJobController from '../../../app/controllers/agentJob.controller'

const args = { mergeParams: true }
const agentJobRouter = express.Router(args)

agentJobRouter.route('/')
  .get(isAuthenticated, agentJobController.getJobs)

agentJobRouter.route('/top-companies')
  .get(isAuthenticated, agentJobController.getTopCompanies)

agentJobRouter.route('/people-you-may-know')
  .get(isAuthenticated, agentJobController.getPeoplpeYouMayKnow)

export { agentJobRouter }
