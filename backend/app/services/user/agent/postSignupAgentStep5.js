import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import { generateUserWalletId } from '../../../utils/generateWalletId'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupAgentStep1Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const xUser = await User.findOne({ where: { user_id: this.user_id }, raw: true })

      // Create wallet for user
      const walletAddress = (await generateUserWalletId(xUser.full_name)).toLowerCase() + '.qbe'
      // await CreateUserWallet.execute({ walletAddress })

      // Update User and UserDetails for wallet
      await User.update({
        user: walletAddress
      }, { where: { user_id: this.user_id } })
      await UserDetail.update({
        wallet_address: walletAddress
      }, { where: { user_id: this.user_id } })

      // Assign user to SIP media server
    } catch (e) {
      this.addError(e.message, e.json || e.errors[0].message)
    }
    return 'User Updated Successfully'
  }
}
