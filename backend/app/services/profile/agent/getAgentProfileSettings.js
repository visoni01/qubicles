import { ERRORS, MESSAGES } from '../../../utils/errors'
import ServiceBase from '../../../common/serviceBase'
import {
  getErrorMessageForService,
  getUserById,
  getUserDetails
} from '../../helper'
import { decryptData } from '../../../utils/encryption'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class GetAgentProfileSettingsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs

    try {
      const promises = [
        () => getUserById({ user_id }),
        () => getUserDetails({ user_id })
      ]
      const [user, userDetails] = await Promise.all(promises.map(promise => promise()))

      if (!user) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.USER_NOT_FOUND)
      }

      const dob = decryptData(userDetails.dob);
      const ssn = decryptData(userDetails.ssn);
      const userName = user.user.replace('.qbe', '');
      const agentAccountSettings = {
        userName,
        fullName: user.full_name,
        street: userDetails.address1,
        city: userDetails.city,
        state: userDetails.state,
        zip: userDetails.zip,
        dob,
        ssn,
        gender: userDetails.gender,
        active: !!userDetails.is_online,
        email: user.email,
        homePhone: userDetails.home_phone,
        mobileNumber: userDetails.mobile_phone,
        smsNotification: !!userDetails.notify_sms,
        emailNotification: !!userDetails.notify_email,
        title: userDetails.work_title,
        summary: userDetails.work_overview,
        education: user.highest_education,
        yearsOfExperience: userDetails.years_of_experience,
        profilePic: userDetails.profile_image
      }

      return agentAccountSettings;
    } catch (err) {
      console.log(err)
      getErrorMessageForService('GetAgentProfileSettingsService')
    }
  }
}