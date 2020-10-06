import ServiceBase from '../../../common/serviceBase'
import {
  getOneTopic,
  getTopicComments,
  getTopicLikesCount,
  getErrorMessageForService,
  updateTopicViews,
  getTopicDetails,
  isTopicLiked
} from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, topic_id } = this.filteredArgs
    const topicData = await getOneTopic({ topic_id })
    if (!topicData) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.TOPIC_NOT_EXIST)
      return
    }
    const promises = [
      () => updateTopicViews({ topic_id, currentViews: topicData.views }),
      () => getTopicComments({ topic_id }),
      () => getTopicLikesCount({ topic_id }),
      () => isTopicLiked({ user_id, topic_id })
    ]
    try {
      const [totalViews, topicComments, totalLikes, topicLiked] = await Promise.all(promises.map(promise => promise()))
      const topicDetails = await getTopicDetails({ user_id, topicData, topicComments, totalLikes, totalViews, topicLiked })
      return topicDetails
    } catch (err) {
      logger.error(`${getErrorMessageForService('ForumTopicService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
