import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User } from '../../../db/models'
import { getOne } from '../../helper'

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
    let data = {}
    const userDetailsData = await getOne({ model: UserDetail, data: { user_id: this.user_id } })
    if (!userDetailsData) {
      return data
    }

    const userData = await getOne({
      model: User,
      data: { user_id: this.user_id },
      attributes: ['service', 'user_code']
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
      service: userData.service,
      user_code: userData.user_code
    }

    return data
  }
}
