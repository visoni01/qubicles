import ServiceBase from '../../common/serviceBase'
import { getClientRating, getClientLikesCount, getClientSubscribersCount } from '../user/activity/helper'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class CommunityRep extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const client = await getClientIdByUserId({ user_id: this.user_id })
    if (client && client.client_id) {
      const { client_id } = client
      const promises = [
        () => getClientRating({ client_id }),
        () => getClientLikesCount({ client_id }),
        () => getClientSubscribersCount({ client_id })
      ]
      const [{ rating, raters }, { likes }, { subscribers }] = await Promise.all(promises.map(promise => promise()))
      return {
        rating,
        raters,
        likes,
        subscribers
      }
    } else {
      return {
        rating: 0,
        raters: 0,
        likes: 0,
        subscribers: 0
      }
    }
  }
}
