import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
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
    const newUser = this.args
    const salt = bcrypt.genSaltSync(10)
    newUser.pass = bcrypt.hashSync(newUser.pass, salt)
    newUser.email_verified = false
    const user = await User.create(newUser)
    const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
    await SendEmailVerificationMail.execute({ token, email: this.email })
    return user
  }
}
