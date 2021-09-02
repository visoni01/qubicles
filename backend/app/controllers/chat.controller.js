import Responder from '../../server/expressResponder'
import { StartNewChatService, GetAllChatsService } from '../services/chat'
import {
  ChatCreateNewGroupService, ChatAddNewGroupMembersService, ChatRemoveGroupMemberService, ChatChangeGroupNameService
} from '../services/chat/group'

export default class ChatController {
  static async getAllChats (req, res) {
    const conversations = await GetAllChatsService.execute({ ...req.body, ...req.query })
    if (conversations.successful) {
      Responder.success(res, conversations.result)
    } else {
      Responder.failed(res, conversations.errors)
    }
  }

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

  static async removeGroupMember (req, res) {
    const group = await ChatRemoveGroupMemberService.execute({ ...req.params })
    if (group.successful) {
      Responder.success(res, group.result)
    } else {
      Responder.failed(res, group.errors)
    }
  }

  static async changeGroupName (req, res) {
    const group = await ChatChangeGroupNameService.execute({ ...req.params, ...req.body })
    if (group.successful) {
      Responder.success(res, group.result)
    } else {
      Responder.failed(res, group.errors)
    }
  }
}
