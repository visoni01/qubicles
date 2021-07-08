import ServiceBase from '../../../../common/serviceBase'
import { getConnectionType, getErrorMessageForService, getNoOfFollowersAndFollowings } from '../../../helper'
import { getAgentResume } from '../../../helper/people'
import logger from '../../../../common/logger'
import { ERRORS } from '../../../../utils/errors'

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
    const { candidate_id, user_id } = this.filteredArgs
    try {
      const promises = [
        () => getAgentResume({ candidateId: candidate_id }),
        () => getNoOfFollowersAndFollowings({ user_id: candidate_id }),
        () => getConnectionType({ follower_id: user_id, following_id: candidate_id })
      ]
      const [
        profile,
        { noOfFollowers, noOfFollowings },
        connectionType
      ] = await Promise.all(promises.map((promise) => promise()))

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
          })),
          followers: noOfFollowers,
          following: noOfFollowings,
          isFollowing: ['following', 'connected'].includes(connectionType)
        }
        return agentResume
      }
    } catch (err) {
      logger.error(getErrorMessageForService('PeopleGetAgentResumeService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
