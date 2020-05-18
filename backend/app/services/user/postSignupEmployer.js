import ServiceBase from '../../common/serviceBase'
import { UserDetails } from '../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  company_name: {
    presence: { allowEmpty: false }
  },
  company_address: {
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
  contact_phone: {
    presence: { allowEmpty: false }
  },
  company_ein: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    await UserDetails.create(
      this.filteredArgs
    )
  }
}
