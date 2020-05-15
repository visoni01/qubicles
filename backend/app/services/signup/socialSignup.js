import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import jwt from 'jsonwebtoken'

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

const TOKEN_EXPIRY_TIME = 300
export default class SocialSignupService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const whereCond = { email: this.email }
    whereCond[this.type] = this.id

    const user = await User.findOrCreate({
      where: whereCond,
      defaults: { full_name: this.full_name, email: this.email, email_verified: false }
    }).spread(function (user, created) {
      return user.get({
        plain: true
      })
    })
    if (!user.email_verified) {
      const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
      await SendEmailVerificationMail.execute({ token, email: this.email })
    }
  }
}
