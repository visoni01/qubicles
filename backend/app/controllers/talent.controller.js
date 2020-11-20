import {
  PeopleGetTalentCardsService,
  PeopleGetUserSkillsService
} from '../services/newPeople/contactCenter/talent'
import Responder from '../../server/expressResponder'
import { PeopleGetJobSkillsService } from '../services/newPeople/contactCenter'

export default class TalentController {
  static async getTalentCards (req, res) {
    const talentCards = await PeopleGetTalentCardsService.execute({ ...req.query, ...req.body })
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

  static async getJobSkills (req, res) {
    const skills = await PeopleGetJobSkillsService.execute({ ...req.body, ...req.params })
    if (skills.successful) {
      Responder.success(res, skills.result)
    } else {
      Responder.failed(res, skills.errors)
    }
  }
}
