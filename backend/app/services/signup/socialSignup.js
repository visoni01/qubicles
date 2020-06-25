import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import jwt from 'jsonwebtoken'

const constraints = {
  type: {
    presence: { allowEmpty: false }
  },
  id: {
    presence: { allowEmpty: false }
  },
  full_name: {
    presence: { allowEmpty: false }
  },
  email: {
    presence: { allowEmpty: false }
  }
}

const TOKEN_EXPIRY_TIME = 300
export default class SocialSignupService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const existingUser = await User.findOne({ where: { email: this.email }, raw: true })
    if (Object.is(existingUser, null)) {
      const userObj = {
        full_name: this.full_name,
        email: this.email,
        email_verified: false
      }
      userObj[this.type] = this.id
      const user = await User.create(userObj)
      this.generateAndSendToken(userObj.email)
      return user.get({ plain: true })
    } else {
      if (!Object.is(existingUser[this.id], null)) {
        const updateObj = {}
        updateObj[this.type] = this.id
        await this.updateUserIfAlreadyExist(this.email, updateObj)
      }
      if (!existingUser.email_verified) {
        this.generateAndSendToken(this.email)
      }
      return existingUser
    }
  }

  async updateUserIfAlreadyExist (email, updateObj) {
    await User.update(updateObj, {
      where: {
        email
      }
    })
  }

  async generateAndSendToken (email) {
    const token = jwt.sign({ email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
    await SendEmailVerificationMail.execute({ token, email })
  }
}
