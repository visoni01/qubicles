import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User, Server, Phone, XPhoneCodes } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import { generateUserWalletId } from '../../../utils/generateWalletId'
import AddUserToActiveCampaign from '../../activeCampaign/addUserToActiveCampaign'
import { Op } from 'sequelize'
import config from '../../../../config/app'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService } from '../../helper'

const constraintsStep1 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  dob: {
    presence: { allowEmpty: false }
  },
  ssn: {
    presence: { allowEmpty: false }
  },
  gender: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep1Service extends ServiceBase {
  get constraints () {
    return constraintsStep1
  }

  async run () {
    // Add user details
    await UserDetail.update({
      dob: this.dob,
      ssn: this.ssn,
      gender: this.gender
    }, { where: { user_id: this.user_id } })

    // Update user code and set user_level = 2 for Agent in User model
    await User.update({
      user_code: this.user_code,
      user_level: 2
    }, { where: { user_id: this.user_id } })

    // Verify SSN here
    return 'User Updated Successfully'
  }
}

const constraintsStep2 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  street_address: {
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
  home_phone: {
    presence: { allowEmpty: false }
  },
  mobile_phone: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep2Service extends ServiceBase {
  get constraints () {
    return constraintsStep2
  }

  async run () {
    try {
      // Verify Mobile phone here
      if (this.mobile_phone) {
        let state
        if (!this.state) {
          const result = this.mobile_phone.split(' ')
          const phoneData = await XPhoneCodes.findOne({ where: { country_code: result[0], area_code_: result[1] }, raw: true })
          if (phoneData) {
            state = phoneData.state
          }
          this.addError(ERRORS.BAD_DATA, MESSAGES.PHONE_NUMBER_IS_INVALID)
          return
        }

        // Update user details
        await UserDetail.update({
          street_address: this.street_address,
          city: this.city,
          state: this.state || state,
          zip: this.zip,
          home_phone: this.home_phone,
          mobile_phone: this.mobile_phone
        }, { where: { user_id: this.user_id } })

        return 'User Updated Successfully'
      } else {
        this.addError(ERRORS.BAD_DATA, MESSAGES.PHONE_NUMBER_IS_INVALID)
        return
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PostSignupAgentStep2Service'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}

const constraintsStep3 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  years_of_experience: {
    presence: { allowEmpty: false }
  },
  highest_education: {
    presence: { allowEmpty: false }
  },
  primary_language: {
    presence: { allowEmpty: false }
  },
  other_languages: {
    presence: { allowEmpty: true }
  }
}

export class PostSignupAgentStep3Service extends ServiceBase {
  get constraints () {
    return constraintsStep3
  }

  async run () {
    // Update user details
    await UserDetail.update({
      years_of_experience: this.years_of_experience,
      highest_education: this.highest_education,
      primary_language: this.primary_language,
      other_languages: this.other_languages
    }, { where: { user_id: this.user_id } })

    // Verify Govt Identification here
    return 'User Updated Successfully'
  }
}

const constraintsStep4 = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep4Service extends ServiceBase {
  get constraints () {
    return constraintsStep4
  }

  async run () {
    // TODO: Upload copy of governmentID
  }
}

const constraintsStep5 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  source: {
    presence: { allowEmpty: false }
  },
  service: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep5Service extends ServiceBase {
  get constraints () {
    return constraintsStep5
  }

  async run () {
    // Update user details
    await UserDetail.update({
      source: this.source
    }, { where: { user_id: this.user_id } })

    // Update user_code and user level using service attribute

    await User.update({
      user_code: this.service,
      user_level: this.service === 'Agent' ? 2 : 7
    }, { where: { user_id: this.user_id } })

    // Background check using Authenticating API

    return 'User Updated Successfully'
  }
}

const constraintsStep6 = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep6Service extends ServiceBase {
  get constraints () {
    return constraintsStep6
  }

  async run () {
    const baseInviteUrl = `${config.get('webApp.baseUrl')}/invite`
    try {
      const xUser = await User.findOne({ where: { user_id: this.user_id }, raw: true })

      // Create wallet for user
      const walletAddress = (await generateUserWalletId(xUser.full_name)).toLowerCase() + '.qbe'
      await CreateUserWallet.execute({ walletAddress })
      const inviteLink = `${baseInviteUrl}/${walletAddress}`

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

      // Add user to Active Campaign
      const xUserDetails = await UserDetail.findOne({ where: { user_id: this.user_id }, raw: true })
      await AddUserToActiveCampaign.execute(
        {
          user_id: this.user_id,
          email: xUser.email,
          phone_number: xUserDetails.mobile_phone,
          name: xUser.full_name,
          list_id: 18,
          first_name: xUserDetails.first_name,
          last_name: xUserDetails.last_name
        })
      return {
        successful: true,
        message: `Post Signup Completed for user ${this.user_id}`,
        inviteLink
      }
    } catch (e) {
      logger.error(getErrorMessageForService('PostSignupAgentStep6Service'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}

async function getServerWithLeastPhones () {
  let agentLoginServers = await getServersByAgentLoginServers()
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
  return Server.findAll({ where: { active: 'Y', active_agent_login_server: 'Y', active_twin_server_ip: { [Op.not]: 'DEDICATED' } }, raw: true })
}
