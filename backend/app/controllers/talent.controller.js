import {
  PeopleGetTalentCardsService,
  PeopleGetUserSkillsService,
  PeopleUpdateUserSkillsService,
  PeopleGetUserCoursesService
} from '../services/people/contactCenter/talent'
import Responder from '../../server/expressResponder'
import { PeopleGetJobSkillsService } from '../services/people/contactCenter'
import { PeopleGetAgentResumeService } from '../services/people/contactCenter/talent/getAgentResume'
import { PeopleGetTopTalentService } from '../services/people/contactCenter/talent/getTopTalent'

export default class TalentController {
  static async getTalentCards (req, res) {
    const talentCards = await PeopleGetTalentCardsService.execute({ ...req.query, ...req.body })
    if (talentCards.successful) {
      Responder.success(res, talentCards.result)
    } else {
      Responder.failed(res, talentCards.errors)
    }
  }

  static async getTopTalent (req, res) {
    const talentCards = await PeopleGetTopTalentService.execute({ ...req.query, ...req.body })
    if (talentCards.successful) {
      Responder.success(res, talentCards.result)
    } else {
      Responder.failed(res, talentCards.errors)
    }
  }

  static async getUserSkills (req, res) {
    const userSkills = await PeopleGetUserSkillsService.execute({ ...req.body, ...req.params })
    if (userSkills.successful) {
      Responder.success(res, userSkills.result)
    } else {
      Responder.failed(res, userSkills.errors)
    }
  }

  static async updateUserSkills (req, res) {
    const userSkills = await PeopleUpdateUserSkillsService.execute({ ...req.body, ...req.params })
    if (userSkills.successful) {
      Responder.success(res, userSkills.result)
    } else {
      Responder.failed(res, userSkills.errors)
    }
  }

  static async getJobSkills (req, res) {
    const skills = await PeopleGetJobSkillsService.execute({ ...req.body, ...req.params })
    if (skills.successful) {
      Responder.success(res, skills.result)
    } else {
      Responder.failed(res, skills.errors)
    }
  }

  static async getAgentResume (req, res) {
    const agentResume = await PeopleGetAgentResumeService.execute({ ...req.params, ...req.body, ...req.query })
    if (agentResume.successful) {
      Responder.success(res, agentResume.result)
    } else {
      Responder.failed(res, agentResume.errors)
    }
  }

  static async getUserCourses (req, res) {
    const courses = await PeopleGetUserCoursesService.execute({ ...req.params, ...req.body })
    if (courses.successful) {
      Responder.success(res, courses.result)
    } else {
      Responder.failed(res, courses.errors)
    }
  }
}
