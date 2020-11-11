import { User, XClientUser, UserDetail, XClient } from '../../db/models'
import config from '../../../config/app'
import jwt from 'jsonwebtoken'
import { getOne } from './crud'

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

export const getClientData = ({ client_id }) => {
  return XClient.findOne({
    where: { client_id },
    raw: true
  })
}

export const getUserDetails = ({ user_id }) => {
  return UserDetail.findOne({ where: { user_id }, raw: true })
}

export const getTokenAfterPostSignupCompleted = async ({ email, user_id, full_name, user_code }) => {
  await UserDetail.update({ is_post_signup_completed: true }, { where: { user_id } })
  const inviteLink = await getInviteLink({ user_id })
  const jwtToken = await jwt.sign({
    email,
    user_id,
    full_name,
    is_post_signup_completed: true,
    user_code,
    inviteLink
  },
  config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })

  return jwtToken
}

export const getNewTokenAfterUserCodeChanged = async ({ email, user_id, full_name, user_code }) => {
  const jwtToken = await jwt.sign({
    email,
    user_id,
    full_name,
    is_post_signup_completed: false,
    user_code
  },
  config.get('jwt.loginTokenSecret'), {
    expiresIn: config.get('jwt.loginTokenExpiry')
  })

  return jwtToken
}

export const getInviteLink = async ({ user_id }) => {
  const baseInviteUrl = `${config.get('webApp.baseUrl')}/invite`
  let inviteLink = ''
  const { user: walletAddress } = await getOne({
    model: User,
    data: { user_id },
    attributes: ['user']
  })
  if (walletAddress) {
    inviteLink = `${baseInviteUrl}/${walletAddress}`
    return inviteLink
  }
}
