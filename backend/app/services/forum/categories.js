import ServiceBase from '../../common/serviceBase'
import { getCategories, getChannels, getTopics } from '../helper/forum'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumCategories extends ServiceBase {
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
export function getForumData ({ categories, channels, topics }) {
  const forumData = categories.map(category => {
    return {
      id: category.category_id,
      title: category.category_title,
      channels: getFilteredChannels({ channels, topics, category_id: category.category_id })
    }
  })
  return forumData
}

export function getFilteredChannels ({ topics, channels, category_id }) {
  const filteredChannels = []
  for (const channel of channels) {
    if (channel.category_id === category_id) {
      filteredChannels.push({
        id: channel.channel_id,
        title: channel.channel_title,
        description: channel.channel_description,
        noOfTopics: getFilteredTopicsCount({ topics, channel_id: channel.channel_id })
      })
    }
  }
  return filteredChannels
}

export function getFilteredTopicsCount ({ topics, channel_id }) {
  return topics.filter(topic => topic.channel_id === channel_id).length
}
