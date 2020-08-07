import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import dashboardController from '../../../app/controllers/dashboard.controller'

const args = { mergeParams: true }
const dashboardRouter = express.Router(args)

dashboardRouter.route('/community-rep')
  .get(isAuthenticated, dashboardController.getCommunityRep)

dashboardRouter.route('/latest-announcements')
  .get(isAuthenticated, dashboardController.getLatestAnnouncements)

dashboardRouter.route('/status-list')
  .get(isAuthenticated, dashboardController.getAllStatusList)

dashboardRouter.route('/status')
  .post(isAuthenticated, dashboardController.addStatus)

dashboardRouter.route('/job-postings')
  .get(isAuthenticated, dashboardController.getJobPostings)

dashboardRouter.route('/active-users')
  .get(isAuthenticated, dashboardController.getActiveUsers)

export { dashboardRouter }
