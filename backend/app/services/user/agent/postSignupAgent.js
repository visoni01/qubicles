import ServiceBase from '../../../common/serviceBase'
import { UserDetail, User, Server, Phone, XPhoneCodes } from '../../../db/models'
import CreateUserWallet from '../../wallet/createUserWallet'
import AddUserToActiveCampaign from '../../activeCampaign/addUserToActiveCampaign'
import { Op } from 'sequelize'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService, checkSpecificCountry, validateImageFile, uploadFileToIPFS } from '../../helper'
import { encryptData } from '../../../utils/encryption'
import _ from 'lodash'
import moment from 'moment'

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
    let encryptedDob
    let encryptedSSN

    if (!_.isEmpty(this.dob)) {
      encryptedDob = encryptData(moment(this.dob).format('YYYY-MM-DD'))
    }

    if (!_.isEmpty(this.ssn)) {
      encryptedSSN = encryptData(this.ssn)
    }

    await UserDetail.update({
      dob: encryptedDob,
      ssn: encryptedSSN,
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
    presence: { allowEmpty: true }
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
  home_phone: {
    presence: false
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
        if (!this.state && checkSpecificCountry(this.mobile_phone)) {
          const areaCode = this.mobile_phone.substring(3, 6)
          // using country_code = 1 specifically for US
          const phoneData = await XPhoneCodes.findOne({ where: { country_code: 1, areacode: areaCode }, raw: true })
          if (phoneData) {
            state = phoneData.state
          }
        }

        // Update user details
        await UserDetail.update({
          street_address: this.street_address,
          city: this.city,
          state: this.state || state,
          zip: this.zip,
          home_phone: this.home_phone ? this.home_phone.substring(1, 20) : null,
          mobile_phone: this.mobile_phone.substring(1, 20)
        }, { where: { user_id: this.user_id } })

        return 'User Updated Successfully'
      } else {
        this.addError(ERRORS.BAD_DATA, MESSAGES.PHONE_NUMBER_IS_INVALID)
        return
      }
    } catch (e) {
      logger.error(`${getErrorMessageForService('PostSignupAgentStep2Service')} ${e}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}

const constraintsStep3 = {
  user_id: {
    presence: { allowEmpty: false }
  },
  years_of_experience: {
    presence: { allowEmpty: true }
  },
  highest_education: {
    presence: { allowEmpty: true }
  },
  primary_language: {
    presence: { allowEmpty: false }
  },
  other_languages: {
    presence: false
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
  file: {
    presence: false
  }
}

export class PostSignupAgentStep4Service extends ServiceBase {
  get constraints () {
    return constraintsStep4
  }

  async run () {
    try {
      let url = null
      if (this.file) {
        const { isValidFileSize, isValidImage } = validateImageFile(this.file)
        if (!isValidImage) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.INVALID_IMAGE_FILE)
          return
        }

        if (!isValidFileSize) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.INVALID_IMAGE_FILE_SIZE)
          return
        }

        try {
          // upload file to IPFS
          url = await uploadFileToIPFS(this.file.buffer)
        } catch (e) {
          this.addError(ERRORS.BAD_DATA, MESSAGES.IPFS_FILE_UPLOAD_ERROR)
          return
        }
      }

      await UserDetail.update({
        id_url: url
      }, { where: { user_id: this.user_id } })

      return { url: url }
    } catch (e) {
      logger.error(getErrorMessageForService('PostSignupAgentStep4Service'), e)
      this.addError(ERRORS.INTERNAL)
    }
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
      user_level: this.service === 'agent' ? 2 : 7
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
    try {
      const xUser = await User.findOne({ where: { user_id: this.user_id }, raw: true })

      // Create wallet for user
      const walletAddress = xUser.user
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
        phone_login: phone.extension,
        phone_pass: phone.extension
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
        message: `Post Signup Completed for user ${this.user_id}`

      }
    } catch (e) {
      logger.error(`${getErrorMessageForService('PostSignupAgentStep6Service')} ${e}`)
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
