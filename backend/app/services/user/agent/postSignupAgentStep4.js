import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  source: {
    presence: { allowEmpty: false }
  },
  service: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupAgentStep1Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Update user details
    await UserDetail.update({
      source: this.source
    }, { where: { user_id: this.user_id } })

    // Update user_code using service attribute
    await User.update({
      user_code: this.service
    }, { where: { user_id: this.user_id } })

    // Background check using Authenticating API

    return 'User Updated Successfully'
  }
}
