import ServiceBase from '../../../../common/serviceBase'
import { getErrorMessageForService } from '../../../helper'
import { getAgentJobProfiles } from '../../../helper/newPeople'
import _ from 'lodash'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  filter: {
    presence: { allowEmpty: false }
  },
  requiredSkills: {
    presence: { allowEmpty: true }
  }
}

export class PeopleGetTalentCardsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let { requiredSkills } = this.filteredArgs
    requiredSkills = JSON.parse(requiredSkills)
    try {
      const agentJobProfiles = await getAgentJobProfiles()
      let talentCards = agentJobProfiles.map(profile => {
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
      if (requiredSkills.length > 0) {
        talentCards = talentCards.filter(profile => {
          const userSkills = profile.skills.map(skill => skill.skillId)
          return (
            _.intersection(requiredSkills, userSkills).length > 0
          )
        })
      }
      return talentCards
    } catch (err) {
      getErrorMessageForService('PeopleGetTalentCardsService')
    }
    return 'okay'
  }
}
