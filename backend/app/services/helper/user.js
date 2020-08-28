import { User, XClientUser, UserDetail } from '../../db/models'
import config from '../../../config/app'
import jwt from 'jsonwebtoken'

export const getUserById = ({ user_id }) => {
  return User.findOne({ where: { user_id }, raw: true })
}

export const getClientIdByUserId = ({ user_id }) => {
  return XClientUser.findOne({ where: { user_id }, raw: true })
}

export const getClientUsers = ({ client_id }) => {
  return XClientUser.findAll({
    where: { client_id },
    raw: true
  })
}

export const getUserDetails = ({ user_id }) => {
  return UserDetail.findOne({ where: { user_id }, raw: true })
}

export const getTokenAfterPostSignupCompleted = async ({ email, user_id, full_name }) => {
  await UserDetail.update({ is_post_signup_completed: true }, { where: { user_id } })
  const jwtToken = await jwt.sign({
    email,
    user_id,
    full_name,
    is_post_signup_completed: 1
  },
  config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })

  return jwtToken
}
