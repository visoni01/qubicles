import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { blockOrUnblockUser, getErrorMessageForService } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  block_user_id: {
    presence: { allowEmpty: false }
  }
}

export class UserBlockService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { block_user_id, user_id } = this.filteredArgs
      await blockOrUnblockUser({ block_user_id, user_id })
    } catch (e) {
      logger.error(getErrorMessageForService('UserBlockService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
