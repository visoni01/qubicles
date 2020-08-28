import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser } from '../../../db/models'
import { getOne } from '../../helper'
import { ERRORS } from '../../../utils/errors'

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
    const clientUserData = await getOne({
      model: XClientUser,
      data: { user_id: this.user_id },
      attributes: ['client_id']
    })

    if (!clientUserData) {
      this.addError(ERRORS.BAD_DATA)
      return
    }

    const clientData = await getOne({ model: XClient, data: { client_id: clientUserData.client_id } })

    if (!clientData) {
      this.addError(ERRORS.BAD_DATA)
      return
    }

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

    return {
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
    }
  }
}
