import ServiceBase from '../../common/serviceBase'
import { getCategories, getChannels, getTopics } from '../helper/forum'
import { getForumData } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  search_keyword: {
    presence: false
  },
  limit: {
    presence: false
  },
  offset: {
    presence: false
  }
}

export default class ForumCategoriesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, search_keyword, limit, offset } = this.filteredArgs
    const promises = [
      () => getCategories({
        user_id,
        search_keyword,
        limit: JSON.parse(limit),
        offset: JSON.parse(offset)
      }),
      () => getChannels({ user_id }),
      () => getTopics({ user_id })
    ]
    const [{ categories, count }, channels, topics] = await Promise.all(promises.map(promise => promise()))
    return { categories: getForumData({ categories, channels, topics }), count }
  }
}
