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
    const updateObj = {}
    updateObj[this.type] = this.id
    const existingUser = await User.findOne({ where: { email: this.email }, raw: true })
    if (existingUser !== null && existingUser[this.type] !== null) {
      const updatedUser = await this.updateUserIfAlreadyExist(this.email, updateObj)
    } else {
      const userObj = {
        full_name: this.full_name,
        email: this.email,
        email_verified: false
      }
      userObj[this.type] = this.id
      const createdUser = await User.create(userObj)
      const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
      await SendEmailVerificationMail.execute({ token, email: this.email })
    }
  }

  async updateUserIfAlreadyExist (email, updateObj) {
    return await User.update(updateObj, {
      where: {
        email
      }
    })
  }
}
