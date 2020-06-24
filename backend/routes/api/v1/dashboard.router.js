import express from 'express'
import dashboardController from '../../../app/controllers/dashboard.controller'

const args = { mergeParams: true }
const dashboardRouter = express.Router(args)

dashboardRouter.route('/community-rep')
  .get(dashboardController.getCommunityRep)

dashboardRouter.route('/latest-announcements')
  .get(dashboardController.getLatestAnnouncements)

dashboardRouter.route('/job-postings')
  .get(dashboardController.getJobPostings)

dashboardRouter.route('/active-users')
  .get(dashboardController.getActiveUsers)

export { dashboardRouter }
