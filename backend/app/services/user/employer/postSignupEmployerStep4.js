import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser, Server, XClientServer, User, UserDetail } from '../../../db/models'
import SendEmailNotificationMail from '../../email/sendEmailNotificationMail'
import CreateUserWallet from '../../wallet/createUserWallet'
import { generateUserWalletId } from '../../../utils/generateWalletId'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerStep4Service extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      const clientInfo = await XClient.findOne({ where: { client_id: xClientUserData.client_id }, raw: true })
      try {
        // Assigning client to a telephone server and saving association in x_client_servers
        let serverPrivateIP = ''
        let serverPublicIP = ''
        const leastClientServer = await getServerWithLeastClients()
        if (leastClientServer !== null) {
          serverPrivateIP = leastClientServer.server_ip
          serverPublicIP = leastClientServer.external_server_ip
          await XClientServer.create({
            client_id: clientInfo.client_id,
            server_ip: leastClientServer.server_ip
          })
        }
        if (leastClientServer === null || leastClientServer === '') {
          serverPrivateIP = 'ALERT!!! Client was not assigned to a telephony server. Something is wrong - please check it out.'
          serverPublicIP = 'ALERT!!!ALERT!!!ALERT'
        }

        // Send Email Notification for new Client Registration
        const { email, full_name } = await User.findOne({ where: { user_id: this.user_id }, raw: true })
        await SendEmailNotificationMail.execute({ ...clientInfo, email, serverPrivateIP, serverPublicIP })

        // Create Wallet for user
        const walletAddress = (await generateUserWalletId(full_name)).toLowerCase() + '.qbe'
        await CreateUserWallet.execute({ walletAddress })

        // Update User and UserDetails for wallet
        await User.update({
          user: walletAddress
        }, { where: { user_id: this.user_id } })
        await UserDetail.update({
          wallet_address: walletAddress
        }, { where: { user_id: this.user_id } })

        return `Post signup step 4 for user ${this.user_id} is completed. Assigned telephone server, Sent email notification, Created wallet, `
      } catch (e) {
        this.addError(e.message, e.json || e.errors[0].message)
      }
    } else {
      this.addError('xClient', 'Client does not exist for this user, Please complete step 1 First')
    }
  }
}
async function getServerWithLeastClients () {
  let agentLoginServers = await getServersByAgentLoginServers()
  agentLoginServers = agentLoginServers.filter(server => server.active_twin_server_ip !== 'DEDICATED')
  let lowUsageServer = agentLoginServers[0]
  const clientServers = await getClientServers()
  let leastClients = clientServers.filter(cs => cs.server_ip === lowUsageServer.server_ip).length
  agentLoginServers = agentLoginServers.filter(server => server.server_ip !== lowUsageServer.server_ip)
  agentLoginServers.forEach(server => {
    const totalCurrentClients = clientServers.filter(cs => cs.server_ip === server.server_ip).length
    if (totalCurrentClients < leastClients) {
      leastClients = totalCurrentClients
      lowUsageServer = server
    }
  })
  return lowUsageServer
}

async function getServersByAgentLoginServers () {
  return Server.findAll({ where: { active: 'Y', active_agent_login_server: 'Y' }, raw: true })
}

async function getClientServers () {
  return XClientServer.findAll({ raw: true })
}
