import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, getClientData, getUserDetailsByClientId } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  client_id: {
    presence: { allowEmpty: false }
  }
}

export default class CompanyDetailsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { client_id } = this.filteredArgs
      const clientDetails = await getClientData({ client_id })
      if (!clientDetails) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_EXIST)
        return
      }
      const userDetails = await getUserDetailsByClientId({ client_id: clientDetails.client_id })
      const companyDetails = {
        registrationDate: clientDetails.registration_date,
        companyName: clientDetails.client_name,
        clientId: clientDetails.client_id,
        title: clientDetails.title,
        summary: clientDetails.summary,
        location: `${clientDetails.city}, ${clientDetails.state}`,
        companyImg: userDetails.profile_image
      }
      return companyDetails
    } catch (err) {
      logger.error(`${getErrorMessageForService('CompanyDetailsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
