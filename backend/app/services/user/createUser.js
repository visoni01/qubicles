import ServiceBase from '../../common/serviceBase'
import { User, UserDetail } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const constraints = {
  email: {
    presence: { allowEmpty: false }
  },
  pass: {
    presence: { allowEmpty: false }
  },
  first_name: {
    presence: { allowEmpty: false }
  },
  last_name: {
    presence: { allowEmpty: false }
  }
}

const TOKEN_EXPIRY_TIME = 300
export default class CreateUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const salt = bcrypt.genSaltSync(10)
    const newUser = {
      email: this.email,
      pass: bcrypt.hashSync(this.pass, salt),
      full_name: this.first_name + ' ' + this.last_name,
      email_verified: false
    }
    try {
      const user = await User.create(newUser)
      await UserDetail.create({
        user_id: user.user_id,
        first_name: this.first_name,
        last_name: this.last_name
      })
      const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
      await SendEmailVerificationMail.execute({ token, email: this.email })
      return user
    } catch (e) {
      this.addError(e.message, e.errors[0].message)
    }
  }
}
