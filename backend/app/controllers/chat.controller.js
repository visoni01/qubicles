import Responder from '../../server/expressResponder'
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
}
