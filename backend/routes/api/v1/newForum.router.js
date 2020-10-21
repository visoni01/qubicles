import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/newForum.controller'
import multer from 'multer'

const multerUpload = multer()
const args = { mergeParams: true }
const newForumRouter = express.Router(args)

newForumRouter.route('/groups')
  .post(isAuthenticated, forumController.createGroup)

newForumRouter.route('/groups')
  .get(isAuthenticated, forumController.getAllGroup)

newForumRouter.route('/groups/:group_id')
  .get(isAuthenticated, forumController.getOneGroup)

newForumRouter.route('/groups/:group_id')
  .put(isAuthenticated, forumController.updateGroup)

newForumRouter.route('/groups/:group_id')
  .delete(isAuthenticated, forumController.deleteGroup)

newForumRouter.route('/groups/:group_id/topics')
  .get(isAuthenticated, forumController.getGroupTopics)

newForumRouter.route('/groups/:group_id/topics')
  .post(isAuthenticated, forumController.createTopic)

newForumRouter.route('/topics/:topic_id/comments')
  .get(isAuthenticated, forumController.getTopicComments)

newForumRouter.route('/topics/:topic_id/comments')
  .post(isAuthenticated, forumController.createTopicComment)

newForumRouter.route('/image')
  .post(multerUpload.single('file'), isAuthenticated, forumController.imageUpload)

export { newForumRouter }
