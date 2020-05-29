import ServiceBase from '../../../common/serviceBase'
import { Server, UserDetail, User, Phone } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import { generateUserWalletId } from '../../../utils/generateWalletId'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupAgentStep5Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const xUser = await User.findOne({ where: { user_id: this.user_id }, raw: true })

      // Create wallet for user
      const walletAddress = (await generateUserWalletId(xUser.full_name)).toLowerCase() + '.qbe'
      await CreateUserWallet.execute({ walletAddress })

      // Assign SIP phone server to Agent
      const leastUsedPhoneServer = await getServerWithLeastPhones()
      const phone = await Phone.create({
        extension: walletAddress,
        dialplan_number: walletAddress,
        voicemail_id: walletAddress,
        login: walletAddress,
        pass: walletAddress,
        fullname: xUser.full_name,
        conf_secret: `X!X!X${walletAddress}X!X!X`,
        server_ip: leastUsedPhoneServer.server_ip
      })

      // Update User Details
      await User.update({
        user: walletAddress,
        phone_login: phone.extension,
        phone_pass: phone.extension
      }, { where: { user_id: this.user_id } })

      await UserDetail.update({
        wallet_address: walletAddress
      }, { where: { user_id: this.user_id } })

    } catch (e) {
      this.addError(e.message, e.json || e.errors[0].message)
    }
    return 'User Updated Successfully'
  }
}

async function getServerWithLeastPhones () {
  let agentLoginServers = await getServersByAgentLoginServers()
  agentLoginServers = agentLoginServers.filter(server => server.active_twin_server_ip !== 'DEDICATED')
  let lowUsageServer = agentLoginServers[0]
  const allPhones = await getPhones()
  let leastPhones = allPhones.filter(phone => phone.server_ip === lowUsageServer.server_ip).length
  agentLoginServers = agentLoginServers.filter(server => server.server_ip !== lowUsageServer.server_ip)
  agentLoginServers.forEach(server => {
    const totalCurrentPhones = allPhones.filter(phone => phone.server_ip === lowUsageServer.server_ip).length
    if (totalCurrentPhones < leastPhones) {
      leastPhones = totalCurrentPhones
      lowUsageServer = server
    }
  })
  return lowUsageServer
}

async function getPhones () {
  return Phone.findAll({ attributes: ['server_ip'], raw: true })
}

async function getServersByAgentLoginServers () {
  return Server.findAll({ where: { active: 'Y', active_agent_login_server: 'Y' }, raw: true })
}
