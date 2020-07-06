import Responder from '../../server/expressResponder'
import CommunityRep from '../services/dashboard/communityRep'
import LatestAnnouncements from '../services/dashboard/latestAnnouncements'
import JobPostings from '../services/dashboard/jobPostings'
import ActiveUsers from '../services/dashboard/activeUsers'

export default class DashboardController {
  static async getCommunityRep (req, res) {
    const communityRep = await CommunityRep.execute(req.body)
    if (communityRep.successful) {
      Responder.success(res, communityRep.result)
    } else {
      res.boom.badRequest('Error in CommunityRep Service', communityRep.errors)
    }
  }

  static async getLatestAnnouncements (req, res) {
    const latestAnnouncements = await LatestAnnouncements.execute(req.body)
    if (latestAnnouncements.successful) {
      Responder.success(res, latestAnnouncements.result)
    } else {
      res.boom.badRequest('Error in LatestAnnouncements Service', latestAnnouncements.errors)
    }
  }

  static async getJobPostings (req, res) {
    const latestJobs = await JobPostings.execute(req.body)
    if (latestJobs.successful) {
      Responder.success(res, latestJobs.result)
    } else {
      res.boom.badRequest('Error in JobPostings Service', latestJobs.errors)
    }
  }

  static async getActiveUsers (req, res) {
    const activeUsers = await ActiveUsers.execute(req.body)
    if (activeUsers.successful) {
      Responder.success(res, activeUsers.result)
    } else {
      res.boom.badRequest('Error in ActiveUsers service', activeUsers.errors)
    }
  }
}