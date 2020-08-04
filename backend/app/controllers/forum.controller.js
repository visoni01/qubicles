import Responder from '../../server/expressResponder'
import ForumCategoriesService from '../services/forum/categories'
import ForumChannelService from '../services/forum/channels'
import ForumTopicService from '../services/forum/topic'
import ForumTopicActivityService from '../services/forum/topicActivity'
import ForumAddNewCategoryService from '../services/forum/newCategory'
import ForumDeleteCategoryService from '../services/forum/deleteCategory'
import ForumAddNewChannelService from '../services/forum/newChannel'
import ForumDeleteTopicService from '../services/forum/topic/delete'
import ForumDeleteTopicCommentService from '../services/forum/comment/delete'

export default class ForumController {
  static async getCategories (req, res) {
    const forumCategories = await ForumCategoriesService.execute({ ...req.body, ...req.query })
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

  static async addNewCategory (req, res) {
    const forumNewCategories = await ForumAddNewCategoryService.execute({ ...req.body, ...req.params })
    if (forumNewCategories.successful) {
      Responder.success(res, forumNewCategories.result)
    } else {
      Responder.failed(res, forumNewCategories.errors)
    }
  }

  static async deleteCategory (req, res) {
    const deleteforumCategory = await ForumDeleteCategoryService.execute({ ...req.body, ...req.params })
    if (deleteforumCategory.successful) {
      Responder.success(res, deleteforumCategory.result)
    } else {
      Responder.failed(res, deleteforumCategory.errors)
    }
  }

  static async addNewChannel (req, res) {
    const forumNewChannel = await ForumAddNewChannelService.execute({ ...req.body, ...req.params })
    if (forumNewChannel.successful) {
      Responder.success(res, forumNewChannel.result)
    } else {
      Responder.failed(res, forumNewChannel.errors)
    }
  }

  static async deleteTopic (req, res) {
    const deleteForumTopic = await ForumDeleteTopicService.execute({ ...req.body, ...req.params })
    if (deleteForumTopic.successful) {
      Responder.success(res, deleteForumTopic.result)
    } else {
      Responder.failed(res, deleteForumTopic.errors)
    }
  }

  static async deleteTopicComment (req, res) {
    const deleteForumTopicComment = await ForumDeleteTopicCommentService.execute({ ...req.body, ...req.params })
    if (deleteForumTopicComment.successful) {
      Responder.success(res, deleteForumTopicComment.result)
    } else {
      Responder.failed(res, deleteForumTopicComment.errors)
    }
  }
}
