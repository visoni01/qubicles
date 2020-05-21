import ServiceBase from '../../common/serviceBase'
import { XClient, XClientUser, Server, XClientServer } from '../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  company_name: {
    presence: { allowEmpty: false }
  },
  company_address: {
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
  company_ein: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupEmployerService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const clientObject = {
      client_name: this.company_name,
      address1: this.company_address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      phone_number: this.phone_number,
      client_ein: this.company_ein
    }
    // Generate Company Id here
    clientObject.client_username = generateID(this.company_name, 20)

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
    const leastClientServer = await getServerWithLeastClients()
    await XClientServer.create({
      client_id: xClientData.client_id,
      server_ip: leastClientServer.server_ip
    })
    return `Post signup for user ${this.user_id} is completed`
  }
}

function generateID (text, maxLength) {
  // Remove special characters and spaces
  const textWithoutSpecialCharacters = text.replace(/[^a-zA-Z0-9 /]/g, ' ')
  const textWithoutSpaces = textWithoutSpecialCharacters.replace(/\s+/g, ' ').trim()
  // Split text into array of words
  const words = textWithoutSpaces.split(' ')
  // Capitalize first letter
  const capitalwords = words.map((word) => word[0].toUpperCase() + word.slice(1))
  // Join words in array
  const joinedWords = capitalwords.join('')
  // slice upto maxlength
  const sliced = joinedWords.slice(0, maxLength + 1)
  return sliced
}

async function getServerWithLeastClients () {
  let agentLoginServers = await getServersByAgentLoginServers()
  agentLoginServers = agentLoginServers.filter(server => server.active_twin_server_ip !== 'DEDICATED')
  let lowUsageServer = agentLoginServers[0]
  const clientServers = await getClientServers()
  let leastClients = clientServers.filter(cs => cs.server_ip === lowUsageServer.server_ip).length
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
