import ServiceBase from '../../common/serviceBase'
import { XUserActivity } from '../../db/models'
import { createNewEntity, getErrorMessageForService } from '../helper'
import logger from '../../common/logger'
import { ERRORS } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export default class AddStatusService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const statusActivity = await createNewEntity({
        model: XUserActivity,
        data: {
          user_id: this.user_id,
          record_id: 0,
          record_type: 'activity',
          activity_type: 'status',
          activity_value: this.data.text,
          activity_custom: this.data.url || null,
          activity_permission: this.data.permission || 'public'
        }
      })

      return statusActivity
    } catch (e) {
      logger.error(getErrorMessageForService('AddStatusService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
