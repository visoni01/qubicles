import ServiceBase from '../../../../common/serviceBase'
import { getErrorMessageForService } from '../../../helper'
import { getUserSkills } from '../../../helper/newPeople'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  candidate_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetUserSkillsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { candidate_id } = this.filteredArgs
    try {
      const userSkills = await getUserSkills({ user_id: candidate_id })
      const skills = userSkills.map(skill => {
        return ({
          skillId: skill.user_skill_id,
          skillName: skill['XQodSkill.skill_name'],
          endorsedCount: skill.endorsed
        })
      })
      const candidateSkills = {
        candidateId: parseInt(candidate_id),
        skills
      }
      return candidateSkills
    } catch (err) {
      console.log(err)
      getErrorMessageForService('PeopleGetUserSkillsService')
    }
  }
}
