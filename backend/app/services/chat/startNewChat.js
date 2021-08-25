import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { createOrFindChat, formatChatMessage, getErrorMessageForService } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  candidate_id: {
    presence: { allowEmpty: false }
  }
}

export class StartNewChatService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, candidate_id } = this.filteredArgs
      const conversation = await createOrFindChat({ user_id, candidate_id })
      const messages = []

      if (conversation && conversation.messages && conversation.messages.length) {
        for (let index = conversation.messages.length - 1; index >= 0; index -= 1) {
          messages.push(formatChatMessage({ message: conversation.messages[index] }))
        }
      }

      return {
        conversationId: conversation && conversation.conversation_id,
        messages,
        allRead: conversation && conversation.allRead && conversation.allRead[0]
          ? conversation.allRead[0].all_read
          : true
      }
    } catch (e) {
      logger.error(getErrorMessageForService('StartNewChatService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
