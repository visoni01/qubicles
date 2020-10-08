import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/newForum.controller'

const args = { mergeParams: true }
const newForumRouter = express.Router(args)

newForumRouter.route('/group/create')
  .post(isAuthenticated, forumController.createGroup)

newForumRouter.route('/groups')
  .get(isAuthenticated, forumController.getAllGroup)

newForumRouter.route('/group/:group_id')
  .get(isAuthenticated, forumController.getOneGroup)

newForumRouter.route('/group/update/:group_id')
  .put(isAuthenticated, forumController.updateGroup)

newForumRouter.route('/group/delete/:group_id')
  .delete(isAuthenticated, forumController.deleteGroup)

newForumRouter.route('/groups/:group_id/topics')
  .get(isAuthenticated, forumController.getGroupTopics)

export { newForumRouter }
