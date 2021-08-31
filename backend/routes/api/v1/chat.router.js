import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import chatController from '../../../app/controllers/chat.controller'

const args = { mergeParams: true }
const chatRouter = express.Router(args)

chatRouter.route('/')
  .post(isAuthenticated, chatController.startNewChat)

chatRouter.route('/new-group')
  .post(isAuthenticated, chatController.createNewGroup)

export { chatRouter }
