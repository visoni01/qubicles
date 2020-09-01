import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser, User } from '../../../db/models'
import { getOne } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignUpEmployeeDataService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let data = {}

    const clientUserData = await getOne({
      model: XClientUser,
      data: { user_id: this.user_id },
      attributes: ['client_id']
    })

    if (!clientUserData) {
      return data
    }

    const clientData = await getOne({ model: XClient, data: { client_id: clientUserData.client_id } })

    if (!clientData) {
      return data
    }

    const userData = await getOne({ model: User, data: { user_id: this.user_id }, attributes: ['user_code'] })

    const {
      client_name,
      address1,
      city,
      state,
      zip,
      phone_number,
      client_ein,
      source,
      interactions_per_month,
      website
    } = clientData

    data = {
      client_name,
      address1,
      city,
      state,
      zip,
      phone_number,
      client_ein,
      source,
      user_code: userData.user_code,
      interactions_per_month,
      website
    }

    return data
  }
}
