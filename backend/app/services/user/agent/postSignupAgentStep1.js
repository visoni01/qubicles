import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
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
  }
}

export default class PostSignupAgentStep1Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Add user details
    await UserDetail.update({
      dob: this.dob,
      ssn: this.ssn,
      gender: this.gender
    }, { where: { user_id: this.user_id } })

    // Update user code in User model
    await User.update({
      user_code: this.user_code
    }, { where: { user_id: this.user_id } })

    // Verify SSN here
    return 'User Updated Successfully'
  }
}
