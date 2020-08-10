import ServiceBase from '../../common/serviceBase'
import { getCategories, getChannels } from '../helper/forum'
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
      () => getChannels({ user_id })
    ]
    const [{ categories, count }, channels] = await Promise.all(promises.map(promise => promise()))
    const forumCategories = await getForumData({ categories, channels })
    return { categories: forumCategories, count }
  }
}
