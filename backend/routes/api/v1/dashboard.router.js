import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import dashboardController from '../../../app/controllers/dashboard.controller'
import multer from 'multer'
const multerUpload = multer()

const args = { mergeParams: true }
const dashboardRouter = express.Router(args)

dashboardRouter.route('/community-rep')
  .get(isAuthenticated, dashboardController.getCommunityRep)

dashboardRouter.route('/latest-announcements')
  .get(isAuthenticated, dashboardController.getLatestAnnouncements)

dashboardRouter.route('/post-status-list')
  .get(isAuthenticated, dashboardController.getAllPostStatusList)

dashboardRouter.route('/post-status')
  .post(multerUpload.single('file'), isAuthenticated, dashboardController.addPostStatus)

dashboardRouter.route('/job-postings')
  .get(isAuthenticated, dashboardController.getJobPostings)

dashboardRouter.route('/active-users')
  .get(isAuthenticated, dashboardController.getActiveUsers)

dashboardRouter.route('/post-status/:user_activity_id')
  .delete(isAuthenticated, dashboardController.deletePostStatus)

dashboardRouter.route('/post-status/activity/:activity_type')
  .post(isAuthenticated, dashboardController.postStatusActivity)

dashboardRouter.route('/post-status/:user_activity_id')
  .put(multerUpload.single('file'), isAuthenticated, dashboardController.updatePostStatus)

dashboardRouter.route('/post/comments/:user_activity_id')
  .get(isAuthenticated, dashboardController.getPostComments)

dashboardRouter.route('/post/comments/:user_activity_id')
  .post(isAuthenticated, dashboardController.postComment)

dashboardRouter.route('/post/comments/:user_activity_id')
  .delete(isAuthenticated, dashboardController.deletePostComment)

export { dashboardRouter }
