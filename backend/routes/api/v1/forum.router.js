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

forumRouter.route('/channelTopicsList/:channel_id')
  .get(isAuthenticated, forumController.getChannelTopicsList)

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

forumRouter.route('/topics/posts/:post_id')
  .put(isAuthenticated, forumController.updateTopicComment)

forumRouter.route('/topics/posts/:post_id/like')
  .post(isAuthenticated, forumController.likeTopicComment)

forumRouter.route('/topics/posts/:post_id/unlike')
  .post(isAuthenticated, forumController.unlikeTopicComment)

forumRouter.route('/topics')
  .post(isAuthenticated, forumController.addNewTopic)

forumRouter.route('/topics/:topic_id')
  .put(isAuthenticated, forumController.updateTopic)

forumRouter.route('/categories/:category_id')
  .put(isAuthenticated, forumController.updateCategory)

forumRouter.route('/channel/:channel_id')
  .put(isAuthenticated, forumController.updateChannel)

export { forumRouter }
