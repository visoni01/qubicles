import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
import bcrypt from 'bcrypt'

const constraints = {
  'user': {
    presence: { allowEmpty: false }
  },
  'pass': {
    presence: { allowEmpty: false }
  },
  'full_name': {
    presence: { allowEmpty: false }
  }
}

export default class CreateUsersAgentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run() {
    const newUserAgent = this.args
    const salt = bcrypt.genSaltSync(10);
    newUserAgent.pass = bcrypt.hashSync(newUserAgent.pass, salt)
    return await User.create(newUserAgent)
  }
}
