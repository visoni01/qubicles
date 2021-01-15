import express from 'express'
import { isAuthenticated } from '../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/forum.controller'
import multer from 'multer'

const multerUpload = multer()
const args = { mergeParams: true }
const forumRouter = express.Router(args)

forumRouter.route('/groups')
  .post(isAuthenticated, forumController.createGroup)

forumRouter.route('/groups')
  .get(isAuthenticated, forumController.getAllGroup)

forumRouter.route('/groups/:group_id')
  .get(isAuthenticated, forumController.getOneGroup)

forumRouter.route('/groups/:group_id')
  .put(isAuthenticated, forumController.updateGroup)

forumRouter.route('/groups/:group_id')
  .delete(isAuthenticated, forumController.deleteGroup)

forumRouter.route('/groups/:group_id/topics')
  .get(isAuthenticated, forumController.getGroupTopics)

forumRouter.route('/groups/:group_id/topics')
  .post(isAuthenticated, forumController.createTopic)

forumRouter.route('/groups/:topic_id/:group_id/topics')
  .put(isAuthenticated, forumController.updateTopic)

forumRouter.route('/groups/:topic_id/:group_id/:owner_id/topics')
  .delete(isAuthenticated, forumController.deleteTopic)

forumRouter.route('/topics/:topic_id/comments')
  .get(isAuthenticated, forumController.getTopicComments)

forumRouter.route('/topics/:topic_id/comments')
  .post(isAuthenticated, forumController.createTopicComment)

forumRouter.route('/topics/:topic_id/activity')
  .post(isAuthenticated, forumController.topicActivity)

forumRouter.route('/image')
  .post(multerUpload.single('file'), isAuthenticated, forumController.imageUpload)

export { forumRouter }
