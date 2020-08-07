import ServiceBase from '../../common/serviceBase'
import { XUserActivity } from '../../db/models'
import logger from '../../common/logger'
import { getErrorMessageForService } from '../helper'
import { ERRORS } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class GellAllStatusListService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const statusList = await XUserActivity.findAll({
        where: {
          record_id: 0,
          record_type: 'activity',
          activity_type: 'status'
        },
        order: [['created_on', 'DESC']],
        raw: true
      })
      // TODO: status

      return statusList
    } catch (e) {
      logger.error(getErrorMessageForService('GellAllStatusListService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
