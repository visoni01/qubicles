import logger from '../../../../common/logger'
import ServiceBase from '../../../../common/serviceBase'
import { ERRORS } from '../../../../utils/errors'
import { getErrorMessageForService } from '../../../helper'
import { XQodUserSkill } from '../../../../db/models'

const constraints = {
  candidate_id: {
    presence: { allowEmpty: false }
  },
  updatedData: {
    presence: { allowEmpty: false }
  }
}

export class PeopleUpdateUserSkillsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { candidate_id, updatedData: updatedSkills } = this.filteredArgs
    console.log(updatedSkills)
    try {
      const promises = [
        () => XQodUserSkill.findAll({
          attributes: ['user_skill_id', 'skill_id'],
          where: { user_id: candidate_id }
        })
      ]

      let [userSkills] = await Promise.all(promises.map(promise => promise()))
      userSkills = userSkills.map(item => item.get({ plain: true }))

      let promiseArray = null

      if (!userSkills.length) {
        const bulkDataToBeAdded = updatedSkills.map(item => {
          return {
            user_id: candidate_id,
            skill_id: item
          }
        })

        promiseArray = [() => XQodUserSkill.bulkCreate(bulkDataToBeAdded)]
      } else {
        const currentSkills = userSkills.map(item => item.skill_id)

        const flagToBeChanged = currentSkills.filter(item => updatedSkills.includes(item))

        const skillsToBeAdded = updatedSkills.filter(item => !currentSkills.includes(item))

        const skillsToBeRemoved = currentSkills.filter(item => !updatedSkills.includes(item))

        const bulkDataToBeAdded = skillsToBeAdded.map(item => {
          return {
            user_id: candidate_id,
            skill_id: item
          }
        })

        promiseArray = [
          () => XQodUserSkill.update({
            is_deleted: false
          }, {
            where: {
              user_id: candidate_id,
              skill_id: flagToBeChanged
            }
          }),
          () => XQodUserSkill.bulkCreate(bulkDataToBeAdded),
          () => XQodUserSkill.update({
            is_deleted: true
          }, {
            where: {
              user_id: candidate_id,
              skill_id: skillsToBeRemoved
            }
          })
        ]
      }

      await Promise.all(promiseArray.map(promise => promise()))
    } catch (err) {
      logger.error(`${getErrorMessageForService('PeopleUpdateUserSkillsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
