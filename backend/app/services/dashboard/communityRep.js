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
    const { client_id } = await getClientIdByUserId({ user_id: this.user_id })
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
  }
}
