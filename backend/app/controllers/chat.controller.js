import Responder from '../../server/expressResponder'
import { ChatCreateNewGroupService } from '../services/chat/group'
import { StartNewChatService } from '../services/chat'

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
}
