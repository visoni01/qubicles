import Responder from '../../server/expressResponder'
import {
  ForumCategoriesService,
  ForumChannelDetailsService,
  ForumTopicService,
  ForumTopicActivityService,
  ForumAddNewCategoryService,
  ForumDeleteCategoryService,
  ForumAddNewChannelService,
  ForumDeleteTopicService,
  ForumDeleteTopicCommentService,
  ForumAddNewTopicService,
  ForumChannelDeleteService,
  ForumChannelTopicsListService,
  ForumUpdateCategoryService,
  ForumLikeTopicCommentService,
  ForumUnlikeTopicCommentService,
  ForumUpdateTopicService,
  ForumUpdateChannelService,
  ForumUpdateTopicCommentService
} from '../services/forum'

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
    const forumChannelDetails = await ForumChannelDetailsService.execute({ ...req.body, ...req.params, ...req.query })
    if (forumChannelDetails.successful) {
      Responder.success(res, forumChannelDetails.result)
    } else {
      Responder.failed(res, forumChannelDetails.errors)
    }
  }

  static async getChannelTopicsList (req, res) {
    const forumChannelTopicsList = await ForumChannelTopicsListService.execute({
      ...req.body,
      ...req.params,
      ...req.query
    })
    if (forumChannelTopicsList.successful) {
      Responder.success(res, forumChannelTopicsList.result)
    } else {
      Responder.failed(res, forumChannelTopicsList.errors)
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

  static async addNewTopic (req, res) {
    const forumNewTopic = await ForumAddNewTopicService.execute({ ...req.body, ...req.params })
    if (forumNewTopic.successful) {
      Responder.success(res, forumNewTopic.result)
    } else {
      Responder.failed(res, forumNewTopic.errors)
    }
  }

  static async deleteChannel (req, res) {
    const deleteChannelResult = await ForumChannelDeleteService.execute({ ...req.body, ...req.params })
    if (deleteChannelResult.successful) {
      Responder.success(res, deleteChannelResult.result)
    } else {
      Responder.failed(res, deleteChannelResult.errors)
    }
  }

  static async updateTopic (req, res) {
    const updateTopicResult = await ForumUpdateTopicService.execute({ ...req.body, ...req.params })
    if (updateTopicResult.successful) {
      Responder.success(res, updateTopicResult.result)
    } else {
      Responder.failed(res, updateTopicResult.errors)
    }
  }

  static async likeTopicComment (req, res) {
    const likeTopicCommentRes = await ForumLikeTopicCommentService.execute({ ...req.body, ...req.params })
    if (likeTopicCommentRes.successful) {
      Responder.success(res, likeTopicCommentRes.result)
    } else {
      Responder.failed(res, likeTopicCommentRes.errors)
    }
  }

  static async unlikeTopicComment (req, res) {
    const unlikeTopicCommentRes = await ForumUnlikeTopicCommentService.execute({ ...req.body, ...req.params })
    if (unlikeTopicCommentRes.successful) {
      Responder.success(res, unlikeTopicCommentRes.result)
    } else {
      Responder.failed(res, unlikeTopicCommentRes.errors)
    }
  }

  static async updateCategory (req, res) {
    const updateCategoryResult = await ForumUpdateCategoryService.execute({ ...req.body, ...req.params })
    if (updateCategoryResult.successful) {
      Responder.success(res, updateCategoryResult.result)
    } else {
      Responder.failed(res, updateCategoryResult.errors)
    }
  }

  static async updateChannel (req, res) {
    const updateChannelResult = await ForumUpdateChannelService.execute({ ...req.body, ...req.params })
    if (updateChannelResult.successful) {
      Responder.success(res, updateChannelResult.result)
    } else {
      Responder.failed(res, updateChannelResult.errors)
    }
  }

  static async updateTopicComment (req, res) {
    const forumUpdateTopicComment = await ForumUpdateTopicCommentService.execute({ ...req.body, ...req.params })
    if (forumUpdateTopicComment.successful) {
      Responder.success(res, forumUpdateTopicComment.result)
    } else {
      Responder.failed(res, forumUpdateTopicComment.errors)
    }
  }
}
