import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const constraints = {
  'email': {
    presence: { allowEmpty: false }
  },
  'pass': {
    presence: { allowEmpty: false }
  },
  'full_name': {
    presence: { allowEmpty: false }
  }
}

const TOKEN_EXPIRY_TIME = 300
export default class CreateUsersAgentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const newUserAgent = this.args
    const salt = bcrypt.genSaltSync(10);
    newUserAgent.pass = bcrypt.hashSync(newUserAgent.pass, salt)
    newUserAgent.email_verified = false
    const user = await User.create(newUserAgent)
    const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
    await SendEmailVerificationMail.execute({ token, email: this.email })
    return user
  }
}
