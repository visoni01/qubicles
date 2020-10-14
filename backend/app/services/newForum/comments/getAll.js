import ServiceBase from '../../../common/serviceBase'
import { getForumTopicComments, getErrorMessageForService } from '../../helper'
import logger from '../../../common/logger'
import { ERRORS } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumGetTopicCommentsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { topic_id } = this.filteredArgs
    try {
      const comments = await getForumTopicComments({
        topic_id
      })

      return {
        message: 'GetAll Forum topic comments fetch successfully',
        comments: comments
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumGetAllGroupService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
