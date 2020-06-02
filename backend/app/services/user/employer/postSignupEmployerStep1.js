import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser, User } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  client_name: {
    presence: { allowEmpty: false }
  },
  address1: {
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
  phone_number: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerStep1Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const clientObject = {
      client_name: this.client_name,
      address1: this.address1,
      city: this.city,
      state: this.state,
      zip: this.zip,
      phone_number: this.phone_number
    }

    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      this.addError('xClient', 'Client Already Exist for this User, You have already completed Step 1')
      return
    }

    try {
      // Creating client in x_clients
      const xClient = await XClient.create(
        clientObject
      )

      // Generating client-user association in x_client_users
      await XClientUser.create({
        user_id: this.user_id,
        client_id: xClient.client_id
      })

      // Update user code in User model
      await User.update({
        user_code: this.user_code
      }, { where: { user_id: this.user_id } })

      return `Post Signup Step 1 for user ${this.user_id} is completed`
    } catch (e) {
      this.addError(e.message, e.json || e.errors[0].message)
    }
  }
}
