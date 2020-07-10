import { User, XClientUser, UserDetail } from '../../db/models'

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
