import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, likeTopicComment, getUserActivityDataById } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  post_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumLikeTopicCommentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, post_id } = this.filteredArgs
      const userActivityData = await getUserActivityDataById({ user_activity_id: post_id })
      if (userActivityData) {
        const res = await likeTopicComment({ user_id, topic_comment_id: post_id })
        return res
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.TOPIC_COMMENT_NOT_EXIST)
        return
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumDeleteTopicCommentService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
