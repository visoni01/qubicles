import ServiceBase from '../../../../common/serviceBase'
import { getErrorMessageForService } from '../../../helper'
import { getUserSkills } from '../../../helper/people'

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
      const skills = userSkills.map(userSkill => {
        const { skill } = userSkill
        return ({
          skillId: skill.skill_id,
          skillName: skill.skill_name,
          endorsedCount: userSkill.endorsed
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
