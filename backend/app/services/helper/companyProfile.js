import bcrypt from 'bcrypt'
import { XClient, User } from '../../db/models'

export const updateProfileSettings = async ({ user_id, updatedData, updatedDataType }) => {
  let result
  switch (updatedDataType) {
    // Update Password
    case 'password' : {
      const salt = bcrypt.genSaltSync(10)
      const newPassword = bcrypt.hashSync(updatedData.password, salt)

      result = await User.update({
        pass: newPassword
      },
      { where: { user_id } })
      break
    }
    // Update Address
    case 'address' : {
      result = await XClient.update({
        address1: updatedData.address,
        city: updatedData.city,
        state: updatedData.state,
        zip: updatedData.zip
      },
      { where: { user_id } })
      break
    }

    default : {
      break
    }
  }
  return result
}
