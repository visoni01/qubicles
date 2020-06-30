import { User, XClientUser } from '../../db/models'

export const getUserById = ({ user_id }) => {
  return User.findOne({ where: { user_id }, raw: true })
}

export const getClientIdByUserId = ({ user_id }) => {
  return XClientUser.findOne({ where: { user_id }, raw: true })
}

export const getUserIdsByClientId = async ({ client_id }) => {
  const clientUsers = await XClientUser.findAll({
    where: { client_id },
    raw: true
  })
  return clientUsers.map(user => user.user_id)
}
