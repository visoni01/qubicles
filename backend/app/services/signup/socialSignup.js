import ServiceBase from '../../common/serviceBase'
import { User } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import { createNewEntity } from '../helper'
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
        email_verified: false,
        [this.type]: this.id
      }
      const user = await createNewEntity({ model: User, data: userObj })
      this.generateAndSendToken(userObj.email, this.full_name, user.user_id)
      return user
    } else {
      if (!Object.is(existingUser[this.id], null)) {
        const updateObj = {}
        updateObj[this.type] = this.id
        await this.updateUserIfAlreadyExist(this.email, updateObj)
      }
      if (!existingUser.email_verified) {
        this.generateAndSendToken(this.email, this.full_name, this.id)
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

  async generateAndSendToken (email, full_name, user_id) {
    const token = jwt.sign({ email, full_name, user_id }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
    await SendEmailVerificationMail.execute({ token, email })
  }
}
