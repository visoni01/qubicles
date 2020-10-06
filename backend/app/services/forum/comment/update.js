import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, updateTopicComment, getUserActivityDataById } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  post_id: {
    presence: { allowEmpty: false }
  },
  post_data: {
    presence: { allowEmpty: false }
  }
}

export class ForumUpdateTopicCommentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, post_id, post_data } = this.filteredArgs
      const userActivityData = await getUserActivityDataById({ user_activity_id: post_id })
      if (userActivityData) {
        if (userActivityData.user_id === user_id) {
          const data = await updateTopicComment({ post_id, post_data })

          return {
            post: data,
            message: MESSAGES.COMMENT_UPDATED_SUCCESSFULLY
          }
        } else {
          this.addError(ERRORS.UNAUTHORIZED)
          return
        }
      } else {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.TOPIC_COMMENT_NOT_EXIST)
        return
      }
    } catch (err) {
      logger.error(`${getErrorMessageForService('ForumUpdateTopicCommentService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
