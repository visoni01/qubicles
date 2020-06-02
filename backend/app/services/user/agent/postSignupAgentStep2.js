import ServiceBase from '../../../common/serviceBase'
import { UserDetail } from '../../../db/models'

const constraints = {
  user_id: {
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
  }
}

export default class PostSignupAgentStep2Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Update user details
    await UserDetail.update({
      street_address: this.street_address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      home_phone: this.home_phone,
      mobile_phone: this.mobile_phone
    }, { where: { user_id: this.user_id } })

    // Verify Mobile phone here
    return 'User Updated Successfully'
  }
}
