import ServiceBase from '../../../common/serviceBase'
import { getTopics, getTopicsSubDetails, getErrorMessageForService } from '../../helper'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  },
  search_keyword: {
    presence: false
  }
}

export class ForumChannelTopicsListService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, channel_id, search_keyword } = this.filteredArgs
    const promises = [
      () => getTopics({ user_id, search_keyword, channel_id })
    ]
    const [topics] = await Promise.all(promises.map(promise => promise()))
    try {
      const res = await getTopicsSubDetails({ topics })
      return res
    } catch (err) {
      logger.error(`${getErrorMessageForService('ForumChannelTopicsListService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
