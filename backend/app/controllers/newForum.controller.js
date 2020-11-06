import Responder from '../../server/expressResponder'
import {
  ForumCreateGroupService,
  ForumUpdateGroupService,
  ForumDeleteGroupService,
  ForumGetAllGroupService,
  ForumGetOneGroupService,
  ForumGetGroupTopicsService,
  ForumCreateTopicService,
  ForumGetTopicCommentsService,
  ForumCreateCommentService,
  ImageUploadService,
  ForumTopicActivity
} from '../services/newForum'

export default class ForumController {
  static async createGroup (req, res) {
    const forumCreateGroupResult = await ForumCreateGroupService.execute({ ...req.body })
    if (forumCreateGroupResult.successful) {
      Responder.success(res, forumCreateGroupResult.result)
    } else {
      Responder.failed(res, forumCreateGroupResult.errors)
    }
  }

  static async updateGroup (req, res) {
    const forumUpdateGroupResult = await ForumUpdateGroupService.execute({ ...req.body, ...req.params })
    if (forumUpdateGroupResult.successful) {
      Responder.success(res, forumUpdateGroupResult.result)
    } else {
      Responder.failed(res, forumUpdateGroupResult.errors)
    }
  }

  static async getOneGroup (req, res) {
    const forumGetOneGroupResult = await ForumGetOneGroupService.execute({ ...req.body, ...req.params })
    if (forumGetOneGroupResult.successful) {
      Responder.success(res, forumGetOneGroupResult.result)
    } else {
      Responder.failed(res, forumGetOneGroupResult.errors)
    }
  }

  static async getAllGroup (req, res) {
    const forumGetAllGroupResult = await ForumGetAllGroupService.execute({ ...req.body })
    if (forumGetAllGroupResult.successful) {
      Responder.success(res, forumGetAllGroupResult.result)
    } else {
      Responder.failed(res, forumGetAllGroupResult.errors)
    }
  }

  static async deleteGroup (req, res) {
    const forumDeleteGroupResult = await ForumDeleteGroupService.execute({ ...req.body, ...req.params })
    if (forumDeleteGroupResult.successful) {
      Responder.success(res, forumDeleteGroupResult.result)
    } else {
      Responder.failed(res, forumDeleteGroupResult.errors)
    }
  }

  static async getGroupTopics (req, res) {
    const forumGetGroupTopicsResult = await ForumGetGroupTopicsService.execute({ ...req.body, ...req.params, ...req.query })
    if (forumGetGroupTopicsResult.successful) {
      Responder.success(res, forumGetGroupTopicsResult.result)
    } else {
      Responder.failed(res, forumGetGroupTopicsResult.errors)
    }
  }

  static async createTopic (req, res) {
    const forumCreateGroupResult = await ForumCreateTopicService.execute({ ...req.body, ...req.params })
    if (forumCreateGroupResult.successful) {
      Responder.success(res, forumCreateGroupResult.result)
    } else {
      Responder.failed(res, forumCreateGroupResult.errors)
    }
  }

  static async getTopicComments (req, res) {
    const forumGetTopicCommentsResult = await ForumGetTopicCommentsService.execute({ ...req.body, ...req.params, ...req.query })
    if (forumGetTopicCommentsResult.successful) {
      Responder.success(res, forumGetTopicCommentsResult.result)
    } else {
      Responder.failed(res, forumGetTopicCommentsResult.errors)
    }
  }

  static async createTopicComment (req, res) {
    const forumCreateCommentResult = await ForumCreateCommentService.execute({ ...req.body, ...req.params })
    if (forumCreateCommentResult.successful) {
      Responder.success(res, forumCreateCommentResult.result)
    } else {
      Responder.failed(res, forumCreateCommentResult.errors)
    }
  }

  static async topicActivity (req, res) {
    const forumTopicActivity = await ForumTopicActivity.execute({ ...req.body, ...req.params })
    if (forumTopicActivity.successful) {
      Responder.success(res, forumTopicActivity.result)
    } else {
      Responder.failed(res, forumTopicActivity.errors)
    }
  }

  static async imageUpload (req, res) {
    const upload = await ImageUploadService.execute({ ...req.body, file: req.file })
    if (upload.successful) {
      Responder.success(res, upload.result)
    } else {
      Responder.failed(res, upload.errors)
    }
  }
}
