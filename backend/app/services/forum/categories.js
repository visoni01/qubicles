import ServiceBase from '../../common/serviceBase'
import { getCategories, getChannels, getTopics } from '../helper/forum'
import { getForumData } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumCategoriesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id } = this.filteredArgs
    const promises = [
      () => getCategories({ user_id }),
      () => getChannels({ user_id }),
      () => getTopics({ user_id })
    ]
    const [categories, channels, topics] = await Promise.all(promises.map(promise => promise()))
    return getForumData({ categories, channels, topics })
  }
}
