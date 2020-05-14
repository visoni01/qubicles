import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'

const constraints = {
  'type': {
    presence: { allowEmpty: false }
  },
  'id': {
    presence: { allowEmpty: false }
  },
  'full_name': {
    presence: { allowEmpty: false }
  },
  'email': {
    presence: { allowEmpty: false }
  }
}

export default class SocialSignupService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    const whereCond = {}
    whereCond[this.type] = this.id
    const user = await User.findOrCreate({ where: whereCond})
    return
  }
}
