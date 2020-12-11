import { ERRORS, MESSAGES } from '../../../utils/errors'
import ServiceBase from '../../../common/serviceBase'
import {
  getErrorMessageForService,
  getClientIdByUserId, getUserById, getClientData, getUserDetails
} from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class GetCompanyProfileSettingsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs

    try {
      const promises = [
        () => getUserById({ user_id }),
        () => getClientIdByUserId({ user_id }),
        () => getUserDetails({ user_id })
      ]
      const [user, clientUser, userDetails] = await Promise.all(promises.map(promise => promise()))

      if (!user) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.USER_NOT_FOUND)
      }
      if (!(clientUser && clientUser.client_id)) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_FOUND)
      }
      const clientDetails = await getClientData({ client_id: clientUser.client_id })

      const companyAccountSettings = {
        companyId: userDetails.wallet_address,
        companyName: clientDetails.client_name,
        password: '',
        address: clientDetails.address1,
        city: clientDetails.city,
        state: clientDetails.state,
        zip: clientDetails.zip,
        email: user.email,
        homePhone: '9342144124',
        mobilePhone: '956472334',
        smsNotification: userDetails.notify_email,
        emailNotification: userDetails.notify_sms,
        website: clientDetails.website,
        summary: clientDetails.summary,
        title: clientDetails.title,
        timezone: ''
      }

      return companyAccountSettings
    } catch (err) {
      console.log(err)
      getErrorMessageForService('GetCompanyProfileSettingsService')
    }
  }
}
