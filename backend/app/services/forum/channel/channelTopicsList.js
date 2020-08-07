import ServiceBase from '../../../common/serviceBase'
import { getTopics, getTopicsSubDetails } from '../../helper'
import { ERRORS } from '../../../utils/errors'

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

export default class ForumChannelTopicsListService extends ServiceBase {
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
      const res = await getChannelTopics({ topics })
      return res
    } catch (err) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}

export async function getChannelTopics ({ topics }) {
  return await getTopicsSubDetails({ topics })
}
