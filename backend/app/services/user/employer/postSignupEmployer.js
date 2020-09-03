import ServiceBase from '../../../common/serviceBase'
import { XClient, XClientUser, Server, XClientServer, User, UserDetail, XPhoneCodes } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import { findUniqueID, generateID } from '../../../utils/generateId'
import { generateUserWalletId } from '../../../utils/generateWalletId'
import SendEmailNotificationMail from '../../email/sendEmailNotificationMail'
import AddUserToActiveCampaign from '../../activeCampaign/addUserToActiveCampaign'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import { getErrorMessageForService, getOne } from '../../helper'
import logger from '../../../common/logger'
import { Op } from 'sequelize'
import config from '../../../../config/app'

const constraintsStep1 = {
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
    presence: { allowEmpty: true }
  },
  state: {
    presence: { allowEmpty: true }
  },
  zip: {
    presence: { allowEmpty: false }
  },
  phone_number: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupEmployerStep1Service extends ServiceBase {
  get constraints () {
    return constraintsStep1
  }

  async run () {
    let state
    if (!this.state) {
      const areaCode = this.phone_number.substring(0, 3)
      // using country_code = 1 specifically for US
      const phoneData = await XPhoneCodes.findOne({ where: { country_code: 1, areacode: areaCode }, raw: true })
      if (phoneData) {
        state = phoneData.state
      }
    }

    const clientObject = {
      client_name: this.client_name,
      address1: this.address1,
      city: this.city,
      state: this.state || state,
      zip: this.zip,
      phone_number: this.phone_number
    }

    try {
      const clientUserData = await getOne({ model: XClientUser, data: { user_id: this.user_id }, attributes: ['client_id'] })
      if (clientUserData && clientUserData.client_id) {
        // Generate Client username here
        clientObject.client_username = await generateClientUserName({ name: clientObject.client_name, maxLength: 100 })

        // Update the xClient record if already exists
        await XClient.update(clientObject, { where: { client_id: clientUserData.client_id } })
      } else {
        // Creating client in x_clients
        const xClient = await XClient.create(
          clientObject
        )

        // Generating client-user association in x_client_users
        await XClientUser.create({
          user_id: this.user_id,
          client_id: xClient.client_id
        })
      }

      // Update user code and set user_level = 8 for Employer in User model
      await User.update({
        user_code: this.user_code,
        user_level: 8
      }, { where: { user_id: this.user_id } })

      return `Post Signup Step 1 for user ${this.user_id} is completed`
    } catch (e) {
      logger.error(getErrorMessageForService('PostSignupEmployerStep1Service'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}

const constraintsStep2 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  client_ein: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupEmployerStep2Service extends ServiceBase {
  get constraints () {
    return constraintsStep2
  }

  async run () {
    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      const clientObject = {
        client_ein: this.client_ein
      }
      try {
        // Update client in x_clients
        await XClient.update(
          clientObject, {
            where: {
              client_id: xClientUserData.client_id
            }
          }
        )
        // Verify company EIN here

        return `Post signup step 2 for user ${this.user_id} is completed. Added EIN`
      } catch (e) {
        logger.error(getErrorMessageForService('PostSignupEmployerStep2Service'), e)
        this.addError(ERRORS.INTERNAL)
      }
    } else {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_FOUND)
    }
  }
}

const constraintsStep3 = {
  user_id: {
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

export class PostSignupEmployerStep3Service extends ServiceBase {
  get constraints () {
    return constraintsStep3
  }

  async run () {
    const xClientUserData = await XClientUser.findOne({ where: { user_id: this.user_id }, raw: true })
    if (xClientUserData) {
      try {
        const clientObject = {
          source: this.source,
          interactions_per_month: this.interactions_per_month,
          website: this.website
        }

        // Update client in x_clients
        await XClient.update(
          clientObject, {
            where: {
              client_id: xClientUserData.client_id
            }
          }
        )

        return `Post signup step 3 for user ${this.user_id} is completed`
      } catch (e) {
        logger.error(getErrorMessageForService('PostSignupEmployerStep3Service'), e)
        this.addError(ERRORS.INTERNAL)
      }
    } else {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_FOUND)
    }
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

const constraintsStep4 = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupEmployerStep4Service extends ServiceBase {
  get constraints () {
    return constraintsStep4
  }

  async run () {
    const baseInviteUrl = `${config.get('webApp.baseUrl')}/invite`
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
        const inviteLink = `${baseInviteUrl}/${walletAddress}`

        // Update User and UserDetails for wallet
        await User.update({
          user: walletAddress
        }, { where: { user_id: this.user_id } })
        await UserDetail.update({
          wallet_address: walletAddress
        }, { where: { user_id: this.user_id } })

        // Add user to active campaign
        await AddUserToActiveCampaign.execute(
          {
            user_id: this.user_id,
            email,
            phone_number: clientInfo.phone_number,
            name: clientInfo.client_name,
            list_id: 19,
            first_name: full_name.split(' ')[0],
            last_name: full_name.split(' ')[1]
          })

        return {
          successful: true,
          message: `Post signup step 4 for user ${this.user_id} is completed. Assigned telephone server, Sent email notification, Created wallet, `,
          inviteLink
        }
      } catch (e) {
        logger.error(getErrorMessageForService('PostSignupEmployerStep4Service'), e)
        this.addError(ERRORS.INTERNAL)
      }
    } else {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CLIENT_NOT_FOUND)
    }
  }
}

async function getServerWithLeastClients () {
  let agentLoginServers = await getServersByAgentLoginServers()
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
  return Server.findAll({ where: { active: 'Y', active_agent_login_server: 'Y', active_twin_server_ip: { [Op.not]: 'DEDICATED' } }, raw: true })
}

async function getClientServers () {
  return XClientServer.findAll({ raw: true })
}
