import ServiceBase from '../../common/serviceBase'
import { User, UserDetail } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import { createNewEntity, getOne } from '../helper'
import jwt from 'jsonwebtoken'
import config from '../../../config/app'

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
      this.generateAndSendToken(userObj.email, this.full_name, user.user_id, user.user_code)
      return user
    } else {
      if (!Object.is(existingUser[this.id], null)) {
        const updateObj = {}
        updateObj[this.type] = this.id
        await this.updateUserIfAlreadyExist(this.email, updateObj)
      }
      if (!existingUser.email_verified) {
        const userDetailsData = await getOne({ model: UserDetail, data: { user_id: existingUser.user_id }, attributes: ['is_post_signup_completed'] })
        this.generateAndSendToken(this.email, this.full_name, this.id, this.user_code, userDetailsData.is_post_signup_completed)
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

  async generateAndSendToken (email, full_name, user_id, user_code, is_post_signup_completed) {
    const token = jwt.sign({ email, full_name, user_id, user_code, is_post_signup_completed },
      config.get('jwt.emailVerificationTokenSecret'),
      { expiresIn: config.get('jwt.emailVerificationTokenExpiry') })
    await SendEmailVerificationMail.execute({ token, email })
  }
}
