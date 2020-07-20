import Responder from '../../server/expressResponder'
import ForumCategories from '../services/forum/categories'
import ForumChannel from '../services/forum/channels'
import ForumTopic from '../services/forum/topic'

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

  static async getTopic (req, res) {
    const forumTopic = await ForumTopic.execute({ ...req.body, ...req.params })
    if (forumTopic.successful) {
      Responder.success(res, forumTopic.result)
    } else {
      Responder.failed(res, forumTopic.errors)
    }
  }
}
