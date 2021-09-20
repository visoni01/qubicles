import express from 'express'
import { isAuthenticated } from './../../../app/middlewares/isAuthenticated'
import chatController from '../../../app/controllers/chat.controller'

const args = { mergeParams: true }
const chatRouter = express.Router(args)

chatRouter.route('/')
  .get(isAuthenticated, chatController.getAllChats)

chatRouter.route('/new-chat')
  .post(isAuthenticated, chatController.startNewChat)

chatRouter.route('/new-group')
  .post(isAuthenticated, chatController.createNewGroup)

chatRouter.route('/suggested-users')
  .get(isAuthenticated, chatController.getSuggestedUsers)

chatRouter.route('/:conversation_id')
  .get(isAuthenticated, chatController.getOlderChats)

chatRouter.route('/:conversation_id/group')
  .put(isAuthenticated, chatController.addNewGroupMembers)

chatRouter.route('/:conversation_id/candidate/:candidate_id')
  .delete(isAuthenticated, chatController.removeGroupMember)

chatRouter.route('/:conversation_id/group-name')
  .put(isAuthenticated, chatController.changeGroupName)

chatRouter.route('/:conversation_id/chat-data')
  .get(isAuthenticated, chatController.getChatData)

chatRouter.route('/:conversation_id/mark-as-read')
  .put(isAuthenticated, chatController.markChatAsRead)

chatRouter.route('/:conversation_id/mark-as-unread')
  .put(isAuthenticated, chatController.markChatAsUnread)

chatRouter.route('/:conversation_id/delete-chat')
  .put(isAuthenticated, chatController.deleteChat)

export { chatRouter }
