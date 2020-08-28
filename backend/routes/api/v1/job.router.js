import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import jobController from '../../../app/controllers/job.controller'

const args = { mergeParams: true }
const jobRouter = express.Router(args)

jobRouter.route('/')
  .get(isAuthenticated, jobController.getJobsByCategory)

jobRouter.route('/:job_id')
  .put(isAuthenticated, jobController.updateJob)

jobRouter.route('/job/:job_id')
  .get(isAuthenticated, jobController.getJobById)

jobRouter.route('/job-fields')
  .get(isAuthenticated, jobController.getJobCategoriesAndTitles)

jobRouter.route('/:job_id')
  .delete(isAuthenticated, jobController.deleteJob)

jobRouter.route('/')
  .post(isAuthenticated, jobController.addJob)

export { jobRouter }
