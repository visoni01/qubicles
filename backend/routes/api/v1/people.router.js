import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import talentController from '../../../app/controllers/talent.controller'

const args = { mergeParams: true }
const peopleRouter = express.Router(args)

peopleRouter.route('/talent/cards')
  .get(isAuthenticated, talentController.getTalentCards)

peopleRouter.route('/skills/:candidate_id')
  .get(isAuthenticated, talentController.getUserSkills)

peopleRouter.route('/skills')
  .get(isAuthenticated, talentController.getJobSkills)

peopleRouter.route('/agent/resume/:candidate_id')
  .get(isAuthenticated, talentController.getAgentResume)

export { peopleRouter }
