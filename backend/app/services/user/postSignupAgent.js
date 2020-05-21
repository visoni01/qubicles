import ServiceBase from '../../common/serviceBase'
import { UserDetails } from '../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  first_name: {
    presence: { allowEmpty: false }
  },
  last_name: {
    presence: { allowEmpty: false }
  },
  dob: {
    presence: { allowEmpty: false }
  },
  ssn: {
    presence: { allowEmpty: false }
  },
  gender: {
    presence: { allowEmpty: false }
  },
  street_address: {
    presence: { allowEmpty: false }
  },
  city: {
    presence: { allowEmpty: false }
  },
  state: {
    presence: { allowEmpty: false }
  },
  zip: {
    presence: { allowEmpty: false }
  },
  home_phone: {
    presence: { allowEmpty: false }
  },
  mobile_phone: {
    presence: { allowEmpty: false }
  },
  years_of_expirience: {
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
  },
  source: {
    presence: { allowEmpty: false }
  },
  service: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupAgentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    await UserDetails.create(
      this.filteredArgs
    )
  }
}
