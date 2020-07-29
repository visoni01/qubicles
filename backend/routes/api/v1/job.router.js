import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import jobController from '../../../app/controllers/job.controller'

const args = { mergeParams: true }
const jobRouter = express.Router(args)

jobRouter.route('/category')
  .get(isAuthenticated, jobController.getJobsByCatergory)

export { jobRouter }
