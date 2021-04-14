import Responder from '../../server/expressResponder'
import {
  CommunityRepService,
  LatestAnnouncementsService,
  JobPostings,
  ActiveUsers,
  GellAllPostStatusListService,
  AddPostStatusService,
  DashboardDeletePostStatusService,
  GetPostCommentsService,
  AddPostStatusCommentService,
  UpdatePostStatusService,
  DeletePostCommentsService,
  DashboardStatusActivityService,
  UpdatePostCommentService
} from '../services/dashboard/index'

export default class DashboardController {
  static async getCommunityRep (req, res) {
    const communityRep = await CommunityRepService.execute(req.body)
    if (communityRep.successful) {
      Responder.success(res, communityRep.result)
    } else {
      Responder.failed(res, communityRep.errors)
    }
  }

  static async getLatestAnnouncements (req, res) {
    const latestAnnouncements = await LatestAnnouncementsService.execute(req.body)
    if (latestAnnouncements.successful) {
      Responder.success(res, latestAnnouncements.result)
    } else {
      Responder.failed(res, latestAnnouncements.errors)
    }
  }

  static async getJobPostings (req, res) {
    const latestJobs = await JobPostings.execute(req.body)
    if (latestJobs.successful) {
      Responder.success(res, latestJobs.result)
    } else {
      Responder.failed(res, latestJobs.errors)
    }
  }

  static async getActiveUsers (req, res) {
    const activeUsers = await ActiveUsers.execute(req.body)
    if (activeUsers.successful) {
      Responder.success(res, activeUsers.result)
    } else {
      Responder.failed(res, activeUsers.errors)
    }
  }

  static async getAllPostStatusList (req, res) {
    const postStatusList = await GellAllPostStatusListService.execute({ ...req.body, ...req.query })
    if (postStatusList.successful) {
      Responder.success(res, postStatusList.result)
    } else {
      Responder.failed(res, postStatusList.errors)
    }
  }

  static async addPostStatus (req, res) {
    console.log('req.file ==========', req.file)
    const postStatus = await AddPostStatusService.execute({ ...req.body, file: req.file })
    if (postStatus.successful) {
      Responder.success(res, postStatus.result)
    } else {
      Responder.failed(res, postStatus.errors)
    }
  }

  static async updatePostStatus (req, res) {
    const updatePostStatus = await UpdatePostStatusService.execute({ ...req.body, file: req.file, ...req.params })
    if (updatePostStatus.successful) {
      Responder.success(res, updatePostStatus.result)
    } else {
      Responder.failed(res, updatePostStatus.errors)
    }
  }

  static async deletePostStatus (req, res) {
    const deletePostStatus = await DashboardDeletePostStatusService.execute({ ...req.body, ...req.params })
    if (deletePostStatus.successful) {
      Responder.success(res, deletePostStatus.result)
    } else {
      Responder.failed(res, deletePostStatus.errors)
    }
  }

  static async postStatusActivity (req, res) {
    const statusActivity = await DashboardStatusActivityService.execute({ ...req.body, ...req.params })
    if (statusActivity.successful) {
      Responder.success(res, statusActivity.result)
    } else {
      Responder.failed(res, statusActivity.errors)
    }
  }

  static async getPostComments (req, res) {
    const postComments = await GetPostCommentsService.execute({ ...req.body, ...req.params, ...req.query })
    if (postComments.successful) {
      Responder.success(res, postComments.result)
    } else {
      Responder.failed(res, postComments.errors)
    }
  }

  static async postComment (req, res) {
    const postComment = await AddPostStatusCommentService.execute({ ...req.body, ...req.params })
    if (postComment.successful) {
      Responder.success(res, postComment.result)
    } else {
      Responder.failed(res, postComment.errors)
    }
  }

  static async deletePostComment (req, res) {
    const deletePostComment = await DeletePostCommentsService.execute({ ...req.body, ...req.params })
    if (deletePostComment.successful) {
      Responder.success(res, deletePostComment.result)
    } else {
      Responder.failed(res, deletePostComment.errors)
    }
  }

  static async updatePostComment (req, res) {
    const updatePostComment = await UpdatePostCommentService.execute({ ...req.body, ...req.params })
    if (updatePostComment.successful) {
      Responder.success(res, updatePostComment.result)
    } else {
      Responder.failed(res, updatePostComment.errors)
    }
  }
}
