import ServiceBase from '../../../../common/serviceBase'
import { getErrorMessageForService } from '../../../helper'
import { getAgentJobProfiles } from '../../../helper/newPeople'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetTalentCardsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const agentJobProfiles = await getAgentJobProfiles()
      const talentCards = agentJobProfiles.map(profile => {
        const { UserDetail: userDetails } = profile
        return (
          {
            candidateId: userDetails.user_id,
            candidateName: userDetails.first_name + ' ' + userDetails.last_name,
            location: userDetails.city + ', ' + userDetails.state,
            languages: profile.desired_languages,
            profileName: userDetails.work_title,
            profileDescription: userDetails.work_overview,
            agentResourceId: profile.resource_def_id,
            ratePerHourDollar: profile.desired_min_pay,
            availability: profile.status,
            candidateRating: profile.avg_peer_rating,
            skills: userDetails.userSkills.map(userSkill => ({
              skillId: userSkill.skill_id,
              skillName: userSkill.skill.skill_name,
              endorsedCount: userSkill.endorsed
            }))
          }
        )
      })
      return talentCards
    } catch (err) {
      getErrorMessageForService('PeopleGetTalentCardsService')
    }
    return 'okay'
  }
}
