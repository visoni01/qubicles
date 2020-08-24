import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import jobController from '../../../app/controllers/job.controller'

const args = { mergeParams: true }
const jobRouter = express.Router(args)

jobRouter.route('/category')
  .get(isAuthenticated, jobController.getJobsByCategory)

jobRouter.route('/category/jobs/:job_id')
  .delete(isAuthenticated, jobController.deleteJob)

jobRouter.route('/category/jobs')
  .post(isAuthenticated, jobController.addJob)

export { jobRouter }
