import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, deleteTopicComment, getUserActivityDataById } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  post_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumDeleteTopicCommentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, post_id } = this.filteredArgs
      const userActivityData = await getUserActivityDataById({ user_activity_id: post_id })
      if (userActivityData) {
        if (userActivityData.user_id === user_id) {
          await deleteTopicComment({ post_id })
          return {
            post_id: userActivityData.user_activity_id,
            message: MESSAGES.COMMENT_DELETED_SUCCESSFULLY
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
      logger.error(getErrorMessageForService('ForumDeleteTopicCommentService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
