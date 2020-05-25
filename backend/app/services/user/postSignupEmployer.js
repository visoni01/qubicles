import ServiceBase from '../../common/serviceBase'
import { XClient, XClientUser, Server, XClientServer, User } from '../../db/models'
import { findUniqueID, generateID } from '../../utils/generateId'
import SendEmailNotificationMail from '../email/sendEmailNotificationMail'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  client_name: {
    presence: { allowEmpty: false }
  },
  address1: {
    presence: { allowEmpty: false }
  },
  city: {
    presence: { allowEmpty: false }
  },
  state: {
    presence: { allowEmpty: false }
  },
  zip: {
    presence: { allowEmpty: false }
  },
  phone_number: {
    presence: { allowEmpty: false }
  },
  client_ein: {
    presence: { allowEmpty: false }
  },
  source: {
    presence: { allowEmpty: false }
  },
  interactions_per_month: {
    presence: { allowEmpty: false }
  },
  website: {
    presence: { allowEmpty: false }
  }
}

async function generateClientUserName ({ name, maxLength }) {
  let isUnique = false
  let id = await generateID(name, maxLength)
  let chkID = id
  let appendCount = 0
  const allUsernames = await XClient.findAll({ attributes: ['client_username'], raw: true })
  while (!isUnique) {
    const current = allUsernames.find(obj => obj.client_username !== null && obj.client_username.toLowerCase() === chkID.toLowerCase())
    if (current === undefined || current === null) {
      // We have no existing username with same id
      id = chkID
      isUnique = true
    } else {
      // We have an existing username with same id
      appendCount += 1
      chkID = await findUniqueID(id, appendCount, maxLength)
    }
  }
  return id
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

export default class PostSignupEmployerService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const clientObject = {
      client_name: this.client_name,
      address1: this.address1,
      city: this.city,
      state: this.state,
      zip: this.zip,
      phone_number: this.phone_number,
      client_ein: this.client_ein,
      source: this.source,
      interactions_per_month: this.interactions_per_month,
      website: this.website
    }

    // Generate client Id here
    clientObject.client_username = await generateClientUserName({ name: this.client_name, maxLength: 100 })

    // Creating client in x_clients
    const xClient = await XClient.create(
      clientObject
    )
    const xClientData = xClient.get({ plain: true })

    // Generating client-user association in x_client_users
    await XClientUser.create({
      user_id: this.user_id,
      client_id: xClientData.client_id
    })

    // Assigning client to a telephone server and saving association in x_client_servers
    let serverPrivateIP = ''
    let serverPublicIP = ''
    const leastClientServer = await getServerWithLeastClients()
    if (leastClientServer !== null) {
      serverPrivateIP = leastClientServer.server_ip
      serverPublicIP = leastClientServer.external_server_ip
      await XClientServer.create({
        client_id: xClientData.client_id,
        server_ip: leastClientServer.server_ip
      })
    }
    if (leastClientServer === null || leastClientServer === '') {
      serverPrivateIP = 'ALERT!!! Client was not assigned to a telephony server. Something is wrong - please check it out.'
      serverPublicIP = 'ALERT!!!ALERT!!!ALERT'
    }
    // Send Email Notification for new Client Registration
    const { email } = await User.findOne({ where: { user_id: this.user_id }, raw: true })
    await SendEmailNotificationMail.execute({ ...clientObject, email, serverPrivateIP, serverPublicIP })

    return `Post signup for user ${this.user_id} is completed`
  }
}
