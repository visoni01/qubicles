import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { createOrFindChat, formatMessagesOrder, getErrorMessageForService, getReadMessages } from '../helper'
import { SqlHelper } from '../../utils/sql'

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

      let readMessages = []

      if (conversation && conversation.conversation_id) {
        readMessages = await SqlHelper.select(getReadMessages({
          conversation_id: conversation.conversation_id,
          user_id,
          is_group: false,
          is_removed: false,
          offset: 0
        }))
      }

      let messages = []

      if (readMessages && readMessages.length) {
        messages = formatMessagesOrder({
          messageArray: messages,
          messages: readMessages.slice(0, 10)
        })
      }

      if (conversation && conversation.messages && conversation.messages.length) {
        messages = formatMessagesOrder({
          messageArray: messages,
          messages: conversation.messages
        })
      }

      return {
        conversationId: conversation && conversation.conversation_id,
        messages,
        allRead: conversation && conversation.allRead && conversation.allRead[0]
          ? conversation.allRead[0].all_read
          : true,
        more: readMessages && readMessages.length > 10
      }
    } catch (e) {
      logger.error(getErrorMessageForService('StartNewChatService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
