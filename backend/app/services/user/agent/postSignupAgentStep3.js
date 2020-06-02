import ServiceBase from '../../../common/serviceBase'
import { UserDetail } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  years_of_experience: {
    presence: { allowEmpty: false }
  },
  highest_education: {
    presence: { allowEmpty: false }
  },
  primary_language: {
    presence: { allowEmpty: false }
  },
  other_languages: {
    presence: { allowEmpty: true }
  }
}

export default class PostSignupAgentStep3Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Update user details
    await UserDetail.update({
      years_of_experience: this.years_of_experience,
      highest_education: this.highest_education,
      primary_language: this.primary_language,
      other_languages: this.other_languages
    }, { where: { user_id: this.user_id } })

    // Verify Govt Identification here
    return 'User Updated Successfully'
  }
}
