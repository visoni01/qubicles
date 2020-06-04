import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User, Server, Phone } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import { generateUserWalletId } from '../../../utils/generateWalletId'
import AddUserToActiveCampaign from '../../activeCampaign/addUserToActiveCampaign'
import { Op } from 'sequelize'

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

    // Update user code in User model
    await User.update({
      user_code: this.user_code
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
    // Update user details
    await UserDetail.update({
      street_address: this.street_address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      home_phone: this.home_phone,
      mobile_phone: this.mobile_phone
    }, { where: { user_id: this.user_id } })

    // Verify Mobile phone here
    return 'User Updated Successfully'
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
  },
  source: {
    presence: { allowEmpty: false }
  },
  service: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep4Service extends ServiceBase {
  get constraints () {
    return constraintsStep4
  }

  async run () {
    // Update user details
    await UserDetail.update({
      source: this.source
    }, { where: { user_id: this.user_id } })

    // Update user_code using service attribute
    await User.update({
      user_code: this.service
    }, { where: { user_id: this.user_id } })

    // Background check using Authenticating API

    return 'User Updated Successfully'
  }
}

const constraintsStep5 = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PostSignupAgentStep5Service extends ServiceBase {
  get constraints () {
    return constraintsStep5
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
    } catch (e) {
      this.addError(e.message, e.json || e.errors[0].message)
    }
    return 'User Updated Successfully'
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
