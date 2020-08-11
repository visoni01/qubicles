import Responder from '../../server/expressResponder'
import CommunityRep from '../services/dashboard/communityRep'
import LatestAnnouncements from '../services/dashboard/latestAnnouncements'
import JobPostings from '../services/dashboard/jobPostings'
import ActiveUsers from '../services/dashboard/activeUsers'
import GellAllPostStatusListService from '../services/dashboard/postStatusList'
import AddPostStatusService from '../services/dashboard/addPostStatus'
import ForumDeletePostStatusService from '../services/dashboard/deletePostStatus'

export default class DashboardController {
  static async getCommunityRep (req, res) {
    const communityRep = await CommunityRep.execute(req.body)
    if (communityRep.successful) {
      Responder.success(res, communityRep.result)
    } else {
      Responder.failed(res, communityRep.errors)
    }
  }

  static async getLatestAnnouncements (req, res) {
    const latestAnnouncements = await LatestAnnouncements.execute(req.body)
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
    const postStatusList = await GellAllPostStatusListService.execute({ ...req.body })
    if (postStatusList.successful) {
      Responder.success(res, postStatusList.result)
    } else {
      Responder.failed(res, postStatusList.errors)
    }
  }

  static async addPostStatus (req, res) {
    const postStatus = await AddPostStatusService.execute({ ...req.body, file: req.file })
    if (postStatus.successful) {
      Responder.success(res, postStatus.result)
    } else {
      Responder.failed(res, postStatus.errors)
    }
  }

  static async deletePostStatus (req, res) {
    const deletePostStatus = await ForumDeletePostStatusService.execute({ ...req.body, ...req.params })
    if (deletePostStatus.successful) {
      Responder.success(res, deletePostStatus.result)
    } else {
      Responder.failed(res, deletePostStatus.errors)
    }
  }
}
