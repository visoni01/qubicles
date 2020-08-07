import ServiceBase from '../../common/serviceBase'
import { getOneChannel, getTopics, getChannelPage } from '../helper'
import { ERRORS, MESSAGES } from '../../utils/errors'

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

export default class ForumChannelService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, channel_id, search_keyword } = this.filteredArgs
    const promises = [
      () => getOneChannel({ channel_id, is_deleted: false }),
      () => getTopics({ user_id, search_keyword })
    ]
    const [channel, topics] = await Promise.all(promises.map(promise => promise()))
    if (!channel) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CHANNEL_NOT_EXIST)
      return
    }
    try {
      const res = await getChannelPage({ channel, topics })
      return res
    } catch (err) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}
