import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import forumController from '../../../app/controllers/forum.controller'

const args = { mergeParams: true }
const forumRouter = express.Router(args)

forumRouter.route('/')
  .get(isAuthenticated, forumController.getCategories)

export { forumRouter }
