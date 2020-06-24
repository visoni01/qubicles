import { User, XClientUser } from '../../db/models'

export const getUserById = ({ userId }) => {
  return User.findOne({ where: { user_id: userId }, raw: true })
}
export const getClientIdByUserId = ({ userId }) => {
  return XClientUser.findOne({ where: { user_id: userId }, raw: true })
}
