import ServiceBase from '../../common/serviceBase'
import { getClientIdByUserId } from '../helper/user'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class ActiveUsers extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const userClientId = await getClientIdByUserId({ userId: this.user_id })
    // TODO
  }
}