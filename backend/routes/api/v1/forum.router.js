import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/forum.controller'

const args = { mergeParams: true }
const forumRouter = express.Router(args)

forumRouter.route('/')
  .get(isAuthenticated, forumController.getCategories)

forumRouter.route('/channel/:channel_id')
  .get(isAuthenticated, forumController.getChannel)

forumRouter.route('/channel/:channel_id')
  .delete(isAuthenticated, forumController.deleteChannel)

forumRouter.route('/topic/:topic_id')
  .get(isAuthenticated, forumController.getTopic)

forumRouter.route('/topic/activity/:activity_type')
  .post(isAuthenticated, forumController.postTopicActivity)

forumRouter.route('/categories')
  .post(isAuthenticated, forumController.addNewCategory)

forumRouter.route('/categories/:category_id')
  .delete(isAuthenticated, forumController.deleteCategory)

forumRouter.route('/channel')
  .post(isAuthenticated, forumController.addNewChannel)

forumRouter.route('/topics/:topic_id')
  .delete(isAuthenticated, forumController.deleteTopic)

forumRouter.route('/topics/posts/:post_id')
  .delete(isAuthenticated, forumController.deleteTopicComment)

forumRouter.route('/topics')
  .post(isAuthenticated, forumController.addNewTopic)

export { forumRouter }
