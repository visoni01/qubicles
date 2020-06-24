import ServiceBase from '../../common/serviceBase'
import { getClientRating, getClientLikesCount, getClientSubscribersCount } from '../user/activity/helper'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class CommunityRep extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const userClientId = await getClientIdByUserId({ userId: this.user_id })
    const totalRating = await getClientRating({ client_id: userClientId })
    const totalLikes = await getClientLikesCount({ client_id: userClientId })
    const totalSubscribers = await getClientSubscribersCount({ client_id: userClientId })
    return {
      rating: totalRating.rating,
      likes: totalLikes.likes,
      subscribers: totalSubscribers.subscribers
    }
  }
}
