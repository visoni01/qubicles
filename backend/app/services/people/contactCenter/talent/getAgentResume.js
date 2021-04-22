import ServiceBase from '../../../../common/serviceBase'
import { getErrorMessageForService } from '../../../helper'
import { getAgentResume } from '../../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  candidate_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetAgentResumeService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { candidate_id } = this.filteredArgs
    try {
      const profile = await getAgentResume({ candidateId: candidate_id })
      if (profile) {
        const { UserDetail: userDetails } = profile
        const primaryLanguage = [userDetails.primary_language]
        const secondaryLanguages = userDetails.other_languages ? userDetails.other_languages.split(',') : []
        const languages = primaryLanguage.concat(secondaryLanguages)
        const agentResume = {
          candidateId: userDetails.user_id,
          candidateName: userDetails.first_name + ' ' + userDetails.last_name,
          location: userDetails.city + ', ' + userDetails.state,
          languages,
          highestEducation: userDetails.highest_education,
          yearsOfExperience: userDetails.years_of_experience,
          profileName: userDetails.work_title,
          profileImage: userDetails.profile_image,
          profileDescription: userDetails.work_overview,
          agentResourceId: profile.resource_def_id,
          ratePerHourDollar: profile.desired_min_pay,
          availability: profile.status,
          candidateRating: userDetails.rating,
          skills: userDetails.userSkills.map(userSkill => ({
            skillId: userSkill.skill_id,
            skillName: userSkill.skill.skill_name,
            endorsedCount: userSkill.endorsed
          }))
        }
        return agentResume
      }
    } catch (err) {
      console.log(err)
      getErrorMessageForService('PeopleGetAgentResumeService')
    }
  }
}
