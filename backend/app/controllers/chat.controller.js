import Responder from '../../server/expressResponder'
import {
  StartNewChatService, GetAllChatsService, GetChatDataService, ChatGetSuggestedUsersService, GetOlderChatsService,
  ChatMarkAsReadService, ChatMarkAsUnreadService, DeleteChatService
} from '../services/chat'
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

  static async getSuggestedUsers (req, res) {
    const suggestedUsers = await ChatGetSuggestedUsersService.execute({ ...req.body, ...req.query })
    if (suggestedUsers.successful) {
      Responder.success(res, suggestedUsers.result)
    } else {
      Responder.failed(res, suggestedUsers.errors)
    }
  }

  static async getOlderChats (req, res) {
    const response = await GetOlderChatsService.execute({ ...req.params, ...req.body, ...req.query })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async addNewGroupMembers (req, res) {
    const response = await ChatAddNewGroupMembersService.execute({ ...req.params, ...req.body })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async removeGroupMember (req, res) {
    const response = await ChatRemoveGroupMemberService.execute({ ...req.params })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async changeGroupName (req, res) {
    const response = await ChatChangeGroupNameService.execute({ ...req.params, ...req.body })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async getChatData (req, res) {
    const conversation = await GetChatDataService.execute({ ...req.params, ...req.body })
    if (conversation.successful) {
      Responder.success(res, conversation.result)
    } else {
      Responder.failed(res, conversation.errors)
    }
  }

  static async markChatAsRead (req, res) {
    const response = await ChatMarkAsReadService.execute({ ...req.body, ...req.params })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async markChatAsUnread (req, res) {
    const response = await ChatMarkAsUnreadService.execute({ ...req.params, ...req.body })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }

  static async deleteChat (req, res) {
    const response = await DeleteChatService.execute({ ...req.params, ...req.body })
    if (response.successful) {
      Responder.success(res, response.result)
    } else {
      Responder.failed(res, response.errors)
    }
  }
}
