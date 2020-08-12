import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, getOneTopic, deleteTopic } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumDeleteTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, topic_id } = this.filteredArgs
      const topicData = await getOneTopic({ topic_id })
      if (topicData) {
        if (topicData.owner_id === user_id) {
          await deleteTopic({ topic_id: topicData.topic_id })
          return {
            topic_id: topicData.topic_id
          }
        } else {
          this.addError(ERRORS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED_MSG)
          return
        }
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.TOPIC_NOT_EXIST)
        return
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumDeleteTopicService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
