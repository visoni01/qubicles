import Responder from '../../server/expressResponder'
import ForumCategories from '../services/forum/categories'
import ForumChannel from '../services/forum/channels'

export default class ForumController {
  static async getCategories (req, res) {
    const forumCategories = await ForumCategories.execute(req.body)
    if (forumCategories.successful) {
      Responder.success(res, forumCategories.result)
    } else {
      Responder.failed(res, forumCategories.errors)
    }
  }

  static async getChannel (req, res) {
    const forumChannel = await ForumChannel.execute({ ...req.body, ...req.params })
    if (forumChannel.successful) {
      Responder.success(res, forumChannel.result)
    } else {
      Responder.failed(res, forumChannel.errors)
    }
  }
}
