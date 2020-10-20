import ServiceBase from '../../../common/serviceBase'
import { getForumGroupTopics, getErrorMessageForService } from '../../helper'
import logger from '../../../common/logger'
import { ERRORS } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  group_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumGetGroupTopicsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, group_id } = this.filteredArgs
    try {
      const forumGroupTopics = await getForumGroupTopics({
        user_id,
        group_id
      })

      return {
        message: 'GetAll Forum Group\'s topics fetch successfully',
        topics: forumGroupTopics
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumGetAllGroupService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
