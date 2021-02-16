import bcrypt from 'bcrypt'
import { XClient, User, UserDetail, XUserActivity } from '../../db/models'
import { APP_ERROR_CODES } from '../../utils/errors'
import jwt from 'jsonwebtoken'
import config from '../../../config/app'
import { CONSTANTS } from '../../utils/success'
import SendResetEmailVerificationMailService from '../email/sendResetEmailVerificationMail'
import { getAll } from './crud'

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
      break
    }

    case 'Company Info': {
      result = await XClient.update({
        title: updatedData.title,
        summary: updatedData.summary
      },
      { where: { client_id: clientUser.client_id } })
      break
    }

    default : {
      break
    }
  }
  return result
}

export const addCompanyReviewAndRating = async ({ user_id, client_id, reviewData }) => {
  const ratingTypesActivity = {
    cultureRating: `culture|${reviewData.cultureRating}`,
    leadershipRating: `leadership|${reviewData.leadershipRating}`,
    careerRating: `career|${reviewData.careerRating}`,
    compensationRating: `compensation|${reviewData.compensationRating}`
  }
  const ratingActivities = Object.keys(ratingTypesActivity).map((key, index) => {
    const ratingActivity = {
      user_id,
      record_type: 'client',
      record_id: client_id,
      activity_type: 'rating',
      activity_value: ratingTypesActivity[key]
    }

    // Adding review text to first rating entity
    if (index === 0) {
      ratingActivity.activity_custom = reviewData.reviewText
    }

    return ratingActivity
  })
  return XUserActivity.bulkCreate(ratingActivities)
}

export const getSortedSubratings = ({ typeValues, ratingsActivities }) => {
  const ratingTypesValues = typeValues
  const types = Object.keys(ratingTypesValues)
  ratingsActivities.map(item => {
    const activityValue = item.activity_value
    if (activityValue.split('|').length === 2 && types.includes(activityValue.split('|')[0])) {
      const type = activityValue.split('|')[0]
      const value = activityValue.split('|')[1]
      ratingTypesValues[type].value += parseInt(value)
      ratingTypesValues[type].count += 1
    }
  })
  return ratingTypesValues
}

export const fetchCompanyRatings = async ({ client_id }) => {
  const ratings = await getAll({
    model: XUserActivity,
    data: {
      record_type: 'client',
      record_id: client_id,
      activity_type: 'rating'
    }
  })

  const typeValues = {
    culture: { value: 0, count: 0 },
    leadership: { value: 0, count: 0 },
    career: { value: 0, count: 0 },
    compensation: { value: 0, count: 0 }
  }

  const sortedSubRatings = getSortedSubratings({
    typeValues,
    ratingsActivities: ratings
  })

  const resultAverageSubRatings = {}
  let totalRating = 0
  let totalCount = 0
  const typeValuesKeys = Object.keys(typeValues)
  typeValuesKeys.map(key => {
    if (sortedSubRatings[key].count > 0) {
      resultAverageSubRatings[key] = parseFloat((sortedSubRatings[key].value / sortedSubRatings[key].count).toFixed(1))
      totalRating += sortedSubRatings[key].value
      totalCount += sortedSubRatings[key].count
    } else {
      resultAverageSubRatings[key] = 0
    }
  })
  return {
    ...resultAverageSubRatings,
    totalAverageRating: totalCount > 0 ? parseFloat((totalRating / totalCount).toFixed(1)) : 0,
    totalAverageRaters: typeValuesKeys.length > 0 ? parseInt(totalCount / typeValuesKeys.length) : 0
  }
}

export const getClientReviewByUser = ({ user_id, client_id }) => {
  const clientReview = getAll({
    model: XUserActivity,
    data: {
      user_id: user_id,
      record_type: 'client',
      record_id: client_id,
      activity_type: 'rating'
    }
  })
  return clientReview
}
