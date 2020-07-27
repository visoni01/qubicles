import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/forum.controller'

const args = { mergeParams: true }
const forumRouter = express.Router(args)

forumRouter.route('/')
  .get(isAuthenticated, forumController.getCategories)

forumRouter.route('/channel/:channel_id')
  .get(isAuthenticated, forumController.getChannel)

forumRouter.route('/topic/:topic_id')
  .get(isAuthenticated, forumController.getTopic)

forumRouter.route('/topic/activity/:activity_type')
  .post(isAuthenticated, forumController.postTopicActivity)

forumRouter.route('/new_category')
  .post(isAuthenticated, forumController.addNewCategory)

export { forumRouter }
