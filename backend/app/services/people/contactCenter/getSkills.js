import ServiceBase from '../../../common/serviceBase'
import { getErrorMessageForService, getSkills } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetJobSkillsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const skills = await getSkills()
      const jobSkills = skills.map(skill => {
        return ({
          skillId: skill.skill_id,
          skillName: skill.skill_name
        })
      })
      return jobSkills
    } catch (err) {
      console.log(err)
      getErrorMessageForService('PeopleGetJobSkillsService')
    }
  }
}
