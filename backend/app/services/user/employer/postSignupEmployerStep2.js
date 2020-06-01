import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  client_ein: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerStep2Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      const clientObject = {
        client_ein: this.client_ein
      }
      try {
        // Update client in x_clients
        const xClient = await XClient.update(
          clientObject, {
            where: {
              client_id: xClientUserData.client_id
            }
          }
        )
        // Verify company EIN here

        return `Post signup step 2 for user ${this.user_id} is completed. Added EIN`
      } catch (e) {
        this.addError(e.message, e.json || e.errors[0].message)
      }
    } else {
      this.addError('xClient', 'Client does not exist for this user, Please complete step 1 First')
    }
  }
}
