import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, getClientData } from '../../helper'
import { addCompanyReviewAndRating } from '../../helper/companyProfile'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  client_id: {
    presence: { allowEmpty: false }
  },
  reviewData: {
    presence: { allowEmpty: false }
  }
}

export default class PostCompanyReviewService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, client_id, reviewData } = this.filteredArgs
      const clientDetails = await getClientData({ client_id })
      if (!clientDetails) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_EXIST)
        return
      }
      const newReview = await addCompanyReviewAndRating({ user_id, client_id, reviewData })
      return newReview
    } catch (err) {
      logger.error(`${getErrorMessageForService('PostCompanyReviewService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
