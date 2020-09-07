import ServiceBase from '../../common/serviceBase'
import { User, UserDetail } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import { createNewEntity } from '../helper'
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
    if (!existingUser) {
      const userObj = {
        full_name: this.full_name,
        email: this.email,
        email_verified: false,
        [this.type]: this.id
      }
      const user = await createNewEntity({ model: User, data: userObj })
      await createNewEntity({
        model: UserDetail,
        data: {
          user_id: user.user_id,
          first_name: this.first_name,
          last_name: this.last_name
        }
      })
      await this.generateAndSendToken(
        {
          email: userObj.email,
          full_name: userObj.full_name,
          user_id: user.user_id,
          user_code: user.user_code
        })
      return user
    } else {
      if (existingUser[this.type] == null) {
        const updateObj = {}
        updateObj[this.type] = this.id
        await this.updateUserIfAlreadyExist(this.email, updateObj)
      }
      if (!existingUser.email_verified) {
        await this.generateAndSendToken(
          {
            email: existingUser.email,
            full_name: this.full_name,
            user_id: existingUser.user_id,
            user_code: existingUser.user_code
          })
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

  async generateAndSendToken ({ email, full_name, user_id, user_code }) {
    const token = jwt.sign({ email, full_name, user_id, user_code },
      config.get('jwt.emailVerificationTokenSecret'),
      { expiresIn: config.get('jwt.emailVerificationTokenExpiry') })
    await SendEmailVerificationMail.execute({ token, email })
  }
}
