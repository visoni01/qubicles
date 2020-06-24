import ServiceBase from '../../common/serviceBase'
import { getRecentTopics } from '../forum/helper'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class LatestAnnouncements extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const userClientId = await getClientIdByUserId({ userId: this.user_id })
    const recentTopics = await getRecentTopics({ client_id: userClientId })
    const latestAnnouncements = []
    for (const topic of recentTopics) {
      latestAnnouncements.push({
        topic_id: topic.topic_id,
        title: topic.topic_title,
        date: topic.created_on
      })
    }
    return latestAnnouncements
  }
}
