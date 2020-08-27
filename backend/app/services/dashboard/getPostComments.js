import ServiceBase from '../../common/serviceBase'
import logger from '../../common/logger'
import {
  checkVisibility,
  getErrorMessageForService,
  getUserActivityById,
  getUserById,
  getStatusCommentsInBatch
} from '../helper'
import { ERRORS, MESSAGES } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_activity_id: {
    presence: { allowEmpty: false }
  },
  limit: {
    presence: { allowEmpty: false }
  },
  offset: {
    presence: { allowEmpty: false }
  }
}

export class GetPostCommentsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, user_activity_id, limit, offset } = this.filteredArgs
      const activityData = await getUserActivityById({ user_activity_id })
      if (!activityData) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.POST_STATUS_NOT_EXIST)
        return
      }

      if (user_id !== activityData.user_id) {
        const isValidPermission = await checkVisibility({ activity_permission: activityData.activity_permission, user_id, owner_id: activityData.user_id })
        if (!isValidPermission) {
          this.addError(ERRORS.UNAUTHORIZED, MESSAGES.UNAUTHORIZED_MSG)
          return
        }
      }
      let commentsData = await getStatusCommentsInBatch({
        user_id,
        record_id: user_activity_id,
        limit: JSON.parse(limit),
        offset: JSON.parse(offset)
      })
      const count = commentsData.count
      commentsData = await Promise.all(commentsData.comments.map(async (comment) => {
        const user = await getUserById({ user_id: comment.user_id })
        comment['owner'] = user.full_name
        return {
          user_activity_id: comment.user_activity_id,
          owner_id: comment.user_id,
          activity_value: comment.activity_value,
          owner: comment.owner,
          createdAt: comment.createdAt
        }
      }))
      return { commentsData, count }
    } catch (error) {
      logger.error(getErrorMessageForService('GetPostCommentsService'), error)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
