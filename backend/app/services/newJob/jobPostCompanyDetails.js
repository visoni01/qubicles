import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { getErrorMessageForService, getClientData } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  client_id: {
    presence: { allowEmpty: false }
  }
}

export default class JobPostCompanyDetailsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { client_id } = this.filteredArgs
      const clientDetails = await getClientData({ client_id })
      console.log('clientDetails in JobPostCompanyDetailsService====>>>>>', clientDetails)
      const companyDetails = {
        registrationDate: clientDetails.registration_date,
        companyName: clientDetails.client_name,
        clientId: clientDetails.client_id,
        title: clientDetails.title,
        summary: clientDetails.summary,
        city: clientDetails.city,
        state: clientDetails.state
      }
      return companyDetails
    } catch (err) {
      logger.error(`${getErrorMessageForService('JobPostCompanyDetailsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
