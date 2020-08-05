import ServiceBase from '../../common/serviceBase'
import { getErrorMessageForService, commentActivity, likeTopicActivity, unlikeTopicActivity } from '../helper'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  activity_type: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export default class ForumTopicActivityService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let activityResult
    try {
      const { user_id, activity_type, data } = this.filteredArgs
      switch (activity_type) {
        case 'reply':
          activityResult = await commentActivity({ user_id, data })
          break
        case 'like':
          activityResult = await likeTopicActivity({ user_id, data })
          break
        case 'unlike':
          activityResult = await unlikeTopicActivity({ user_id, data })
          break
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumTopicActivityService'), err)
      this.addError(ERRORS.INTERNAL)
    }
    return activityResult
  }
}
