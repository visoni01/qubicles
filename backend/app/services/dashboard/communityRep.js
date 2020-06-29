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
    const { client_id } = await getClientIdByUserId({ userId: this.user_id })
    const { rating, raters } = await getClientRating({ client_id })
    const { likes } = await getClientLikesCount({ client_id })
    const { subscribers } = await getClientSubscribersCount({ client_id })
    return {
      rating,
      raters,
      likes,
      subscribers
    }
  }
}
