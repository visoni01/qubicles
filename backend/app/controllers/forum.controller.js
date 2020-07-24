import Responder from '../../server/expressResponder'
import ForumCategoriesService from '../services/forum/categories'
import ForumChannelService from '../services/forum/channels'
import ForumTopicService from '../services/forum/topic'
import ForumTopicActivityService from '../services/forum/topicActivity'
import ForumNewInstanse from '../services/forum/newCategory'

export default class ForumController {
  static async getCategories (req, res) {
    const forumCategories = await ForumCategoriesService.execute(req.body)
    if (forumCategories.successful) {
      Responder.success(res, forumCategories.result)
    } else {
      Responder.failed(res, forumCategories.errors)
    }
  }

  static async getChannel (req, res) {
    const forumChannel = await ForumChannelService.execute({ ...req.body, ...req.params })
    if (forumChannel.successful) {
      Responder.success(res, forumChannel.result)
    } else {
      Responder.failed(res, forumChannel.errors)
    }
  }

  static async getTopic (req, res) {
    const forumTopic = await ForumTopicService.execute({ ...req.body, ...req.params })
    if (forumTopic.successful) {
      Responder.success(res, forumTopic.result)
    } else {
      Responder.failed(res, forumTopic.errors)
    }
  }

  static async postTopicActivity (req, res) {
    const topicActivity = await ForumTopicActivityService.execute({ ...req.body, ...req.params })
    if (topicActivity.successful) {
      Responder.success(res, topicActivity.result)
    } else {
      Responder.failed(res, topicActivity.errors)
    }
  }

  static async addNewInstance (req, res) {
    const forumNewCategories = await ForumNewInstanse.execute({ ...req.body, ...req.params })
    if (forumNewCategories.successful) {
      Responder.success(res, forumNewCategories.result)
    } else {
      Responder.failed(res, forumNewCategories.errors)
    }
  }
}
