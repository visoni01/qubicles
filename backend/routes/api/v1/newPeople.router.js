import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import talentController from '../../../app/controllers/talent.controller'

const args = { mergeParams: true }
const newPeopleRouter = express.Router(args)

newPeopleRouter.route('/talent/cards')
  .get(isAuthenticated, talentController.getTalentCards)

newPeopleRouter.route('/skills/:candidate_id')
  .get(isAuthenticated, talentController.getUserSkills)

export { newPeopleRouter }
