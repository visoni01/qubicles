import {
  PeopleGetTalentCardsService,
  PeopleGetUserSkillsService
} from '../services/newPeople/contactCenter/talent'
import Responder from '../../server/expressResponder'

export default class TalentController {
  static async getTalentCards (req, res) {
    const talentCards = await PeopleGetTalentCardsService.execute({ ...req.body })
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
}
