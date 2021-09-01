import Responder from '../../server/expressResponder'
import { ChatCreateNewGroupService, ChatAddNewGroupMembersService } from '../services/chat/group'
import { GetAllChatsService, StartNewChatService } from '../services/chat'

export default class ChatController {
  static async startNewChat (req, res) {
    const conversation = await StartNewChatService.execute({ ...req.body, ...req.query })
    if (conversation.successful) {
      Responder.success(res, conversation.result)
    } else {
      Responder.failed(res, conversation.errors)
    }
  }

  static async createNewGroup (req, res) {
    const group = await ChatCreateNewGroupService.execute({ ...req.body })
    if (group.successful) {
      Responder.success(res, group.result)
    } else {
      Responder.failed(res, group.errors)
    }
  }

  static async addNewGroupMembers (req, res) {
    const group = await ChatAddNewGroupMembersService.execute({ ...req.params, ...req.body })
    if (group.successful) {
      Responder.success(res, group.result)
    } else {
      Responder.failed(res, group.errors)
    }
  }

  static async getAllChats (req, res) {
    const conversations = await GetAllChatsService.execute({ ...req.body, ...req.query })
    if (conversations.successful) {
      Responder.success(res, conversations.result)
    } else {
      Responder.failed(res, conversations.errors)
    }
  }
}
