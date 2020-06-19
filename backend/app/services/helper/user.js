import { User } from '../../db/models'

export const getUserById = ({ userId }) => {
  return User.findOne({ where: {user_id: userId}, raw: true })
}