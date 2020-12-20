import bcrypt from 'bcrypt'
import { XClient, User, UserDetail } from '../../db/models'
import { APP_ERROR_CODES } from '../../utils/errors'
import jwt from 'jsonwebtoken'
import config from '../../../config/app'
import { CONSTANTS } from '../../utils/success'
import SendResetEmailVerificationMailService from '../email/sendResetEmailVerificationMail'

export const updateProfileSettings = async ({ user, clientUser, updatedData, updatedDataType }) => {
  let result
  switch (updatedDataType) {
    // Update Password
    case 'password' : {
      if (!await user.comparePassword(updatedData.currentPassword)) {
        throw new Error(APP_ERROR_CODES.INCORRECT_PASSWORD)
      }

      const salt = bcrypt.genSaltSync(10)
      const newPassword = bcrypt.hashSync(updatedData.newPassword, salt)

      result = await User.update({
        pass: newPassword
      },
      { where: { user_id: user.user_id } })
      break
    }

    // Update Address
    case 'address' : {
      result = await XClient.update({
        address1: updatedData.street,
        city: updatedData.city,
        state: updatedData.state,
        zip: updatedData.zip
      },
      { where: { client_id: clientUser.client_id } })
      break
    }

    // Update Sms Notifications
    case 'Sms Notification': {
      result = await UserDetail.update({
        notify_sms: updatedData.smsNotification
      },
      { where: { user_id: user.user_id } })
      break
    }

    // Update Email Notifications
    case 'Email Notification': {
      result = await UserDetail.update({
        notify_email: updatedData.emailNotification
      },
      { where: { user_id: user.user_id } })
      break
    }

    default : {
      break
    }

    // Update Phone number
    case 'number': {
      result = await XClient.update({
        phone_number: updatedData.phoneNumber
      },
      { where: { client_id: clientUser.client_id } })
      break
    }

    // Update Website
    case 'website': {
      result = await XClient.update({
        website: updatedData.website
      },
      { where: { client_id: clientUser.client_id } })
      break
    }

    // Update Email
    case 'email': {
      if (await User.findOne({ where: { email: updatedData.email }, raw: true })) {
        throw new Error(APP_ERROR_CODES.EMAIL_NOT_AVAILABLE)
      } else {
        const token = jwt.sign({
          email: user.email,
          user_id: user.user_id,
          user_code: user.user_code,
          token_type: CONSTANTS.RESET_EMAIL_TOKEN_TYPE,
          newEmail: updatedData.email
        },
        config.get('jwt.emailVerificationTokenSecret'),
        { expiresIn: config.get('jwt.emailVerificationTokenExpiry') })

        SendResetEmailVerificationMailService.execute({
          email: updatedData.email,
          token
        })
      }
    }
  }
  return result
}
