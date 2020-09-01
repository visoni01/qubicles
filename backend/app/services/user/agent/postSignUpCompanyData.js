import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User } from '../../../db/models'
import { getOne, getErrorMessageForService } from '../../helper'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignUpCompanyDataService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      let data = {}
      const userDetailsData = await getOne({ model: UserDetail, data: { user_id: this.user_id } })
      if (!userDetailsData) {
        return data
      }

      const userData = await getOne({
        model: User,
        data: { user_id: this.user_id },
        attributes: ['user_code']
      })

      if (!userData) {
        return data
      }

      const {
        dob,
        ssn,
        gender,
        street_address,
        city,
        zip,
        state,
        home_phone,
        mobile_phone,
        years_of_experience,
        highest_education,
        primary_language,
        other_languages,
        source
      } = userDetailsData

      data = {
        dob,
        ssn,
        gender,
        street_address,
        city,
        zip,
        state,
        home_phone,
        mobile_phone,
        years_of_experience,
        highest_education,
        primary_language,
        other_languages,
        source,
        service: userData.user_code,
        user_code: userData.user_code
      }

      return data
    } catch (e) {
      logger.error(getErrorMessageForService('PostSignUpCompanyDataService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
