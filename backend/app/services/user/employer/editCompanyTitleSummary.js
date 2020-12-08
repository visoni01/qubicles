import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser } from '../../../db/models'
import { getOne, getErrorMessageForService } from '../../helper'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export class EditCompanyTitleSummaryService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const clientUserData = await getOne({
        model: XClientUser,
        data: { user_id: this.user_id },
        attributes: ['client_id']
      })

      if (!clientUserData) {
        this.addError(ERRORS.UNAUTHORIZED)
        return
      }

      const updatedData = await XClient.update(this.data, { where: { client_id: clientUserData.client_id } })
      console.log('updatedData ', updatedData)
      return this.data
    } catch (e) {
      logger.error(`${getErrorMessageForService('EditCompanyTitleSummaryService')} ${e}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
