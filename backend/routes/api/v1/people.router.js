import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import talentController from '../../../app/controllers/talent.controller'
import applicationController from '../../../app/controllers/application.controller'
import trainingController from '../../../app/controllers/training.controller'

const args = { mergeParams: true }
const peopleRouter = express.Router(args)

peopleRouter.route('/talent/cards')
  .get(isAuthenticated, talentController.getTalentCards)

peopleRouter.route('/top-talent')
  .get(isAuthenticated, talentController.getTopTalent)

peopleRouter.route('/skills/:candidate_id')
  .get(isAuthenticated, talentController.getUserSkills)

peopleRouter.route('/skills/:candidate_id')
  .put(isAuthenticated, talentController.updateUserSkills)

peopleRouter.route('/skills')
  .get(isAuthenticated, talentController.getJobSkills)

peopleRouter.route('/agent/resume/:candidate_id')
  .get(isAuthenticated, talentController.getAgentResume)

peopleRouter.route('/applications')
  .post(isAuthenticated, applicationController.createJobApplication)

peopleRouter.route('/applications')
  .get(isAuthenticated, applicationController.fetchJobApplication)

peopleRouter.route('/applications/:application_id')
  .put(isAuthenticated, applicationController.updateJobApplication)

peopleRouter.route('/applications/job/:job_id')
  .get(isAuthenticated, applicationController.fetchAllJobApplicationsByJobId)

peopleRouter.route('/applications/user/:agent_user_id')
  .get(isAuthenticated, applicationController.fetchAllJobApplicationsByAgent)

peopleRouter.route('/course')
  .post(isAuthenticated, trainingController.createCourse)

export { peopleRouter }
