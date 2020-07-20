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

export { forumRouter }
