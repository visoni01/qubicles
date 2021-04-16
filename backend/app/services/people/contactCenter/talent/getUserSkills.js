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
        const { skill, endorsement } = userSkill
        return ({
          skillId: skill.skill_id,
          skillName: skill.skill_name,
          endorsedCount: userSkill.endorsed,
          endorsements: endorsement.map(user => {
            return {
              id: user.user_id,
              comment: user.activity_value,
              userProfile: {
                name: user.userData.first_name + ' ' + user.userData.last_name,
                profilePic: user.userData.profile_image
              },
              rating: user.userData.rating,
              workTitle: user.userData.work_title
            }
          })
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
