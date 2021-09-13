import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { markAsUnread, getErrorMessageForService } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  conversation_id: {
    presence: { allowEmpty: false }
  }
}

export class ChatMarkAsUnreadService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, conversation_id } = this.filteredArgs
      await markAsUnread({ user_id, conversation_id })
    } catch (e) {
      logger.error(getErrorMessageForService('ChatMarkAsUnreadService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
