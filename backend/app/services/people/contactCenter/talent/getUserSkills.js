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
    const { user_id, candidate_id } = this.filteredArgs

    try {
      const candidateSkills = await getUserSkills({ user_id, candidate_id })
      return candidateSkills
    } catch (err) {
      console.log(err)
      getErrorMessageForService('PeopleGetUserSkillsService')
    }
  }
}
