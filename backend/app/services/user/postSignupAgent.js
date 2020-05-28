import ServiceBase from '../../common/serviceBase'
import { UserDetail, User } from '../../db/models'
import { generateUserWalletId } from '../../utils/generateWalletId'
import { CreateUserWallet } from '../wallet/createUserWallet'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  user_code: {
    presence: { allowEmpty: false }
  },
  first_name: {
    presence: { allowEmpty: false }
  },
  last_name: {
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
  },
  source: {
    presence: { allowEmpty: false }
  }
}

export default class PostSignupAgentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { full_name } = await User.findOne({ where: { user_id: this.user_id }, raw: true })
    const walletAddress = (await generateUserWalletId(full_name)).toLowerCase() + '.qbe'

    await CreateUserWallet.execute({ walletAddress })
    await User.update({
      user: walletAddress,
      user_code: this.user_code
    }, { where: { user_id: this.user_id } })

    await UserDetail.update({
      first_name: this.first_name,
      last_name: this.last_name,
      wallet_address: walletAddress,
      dob: this.dob,
      ssn: this.ssn,
      gender: this.gender,
      street_address: this.street_address,
      city: this.city,
      state: this.state,
      zip: this.zip,
      home_phone: this.home_phone,
      mobile_phone: this.mobile_phone,
      years_of_experience: this.years_of_experience,
      highest_education: this.highest_education,
      primary_language: this.primary_language,
      other_languages: this.other_languages,
      source: this.source
    }, { where: { user_id: this.user_id } })
  }
}
