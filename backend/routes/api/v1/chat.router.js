import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import chatController from '../../../app/controllers/chat.controller'

const args = { mergeParams: true }
const chatRouter = express.Router(args)

chatRouter.route('/')
  .get(isAuthenticated, chatController.getAllChats)

chatRouter.route('/')
  .post(isAuthenticated, chatController.startNewChat)

chatRouter.route('/new-group')
  .post(isAuthenticated, chatController.createNewGroup)

chatRouter.route('/group/:conversation_id')
  .put(isAuthenticated, chatController.addNewGroupMembers)

chatRouter.route('/group/:conversation_id/candidate/:candidate_id')
  .delete(isAuthenticated, chatController.removeGroupMember)

chatRouter.route('/group/:conversation_id/group-name')
  .put(isAuthenticated, chatController.changeGroupName)

chatRouter.route('/chat-data/:conversation_id')
  .get(isAuthenticated, chatController.getChatData)

export { chatRouter }
