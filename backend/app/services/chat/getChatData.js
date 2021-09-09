import _ from 'lodash'
import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import { SqlHelper } from '../../utils/sql'
import logger from '../../common/logger'
import {
  getChatData, getReadMessages, fetchAllGroupMembersIds, getCandidatesInfo, getErrorMessageForService,
  formatMessagesOrder, formatChatData
} from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  conversation_id: {
    presence: { allowEmpty: false }
  }
}

export class GetChatDataService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { conversation_id, user_id } = this.filteredArgs

      const conversationDataWithUnReadMessages = await getChatData({ conversation_id, user_id })

      let allMessages = []
      let user_ids = []

      if (conversationDataWithUnReadMessages && conversationDataWithUnReadMessages.length) {
        const {
          is_group, user_one_id, user_two_id, message_id, is_removed, updated_on, all_read
        } = conversationDataWithUnReadMessages[0]

        if (is_group) {
          user_ids = await fetchAllGroupMembersIds({ conversation_id, is_removed: false })
        } else {
          user_ids = [_.isEqual(user_one_id, user_id) ? user_two_id : user_one_id]
        }

        const promiseArray = [
          () => SqlHelper.select(getCandidatesInfo({ user_ids })),
          () => SqlHelper.select(getReadMessages({ conversation_id, user_id, is_group, is_removed, updated_on }))
        ]

        const [candidateInfo, readMessages] = await Promise.all(promiseArray.map(promise => promise()))

        if (readMessages && readMessages.length) {
          allMessages = formatMessagesOrder({
            messageArray: allMessages, messages: readMessages && readMessages.slice(0, 10)
          })
        }

        if (message_id) {
          allMessages = formatMessagesOrder({ messageArray: allMessages, messages: conversationDataWithUnReadMessages })
        }

        const formattedChatData = formatChatData({
          conversation_id,
          conversation: conversationDataWithUnReadMessages[0],
          messages: allMessages,
          candidateInfo,
          more: readMessages && readMessages.length > 10,
          allRead: all_read
        })

        return formattedChatData
      }
    } catch (e) {
      logger.error(getErrorMessageForService('GetChatDataService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
