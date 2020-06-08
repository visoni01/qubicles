import ServiceBase from '../../common/serviceBase'
import { User, UserDetail, UserContact } from '../../db/models'
import SendEmailVerificationMail from '../email/sendEmailVerificationMail'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import config from '../../../config/app'

const constraints = {
  email: {
    presence: { allowEmpty: false }
  },
  pass: {
    presence: { allowEmpty: false }
  },
  first_name: {
    presence: { allowEmpty: false }
  },
  last_name: {
    presence: { allowEmpty: false }
  },
  with_invite: {
    presence: { allowEmpty: false }
  },
  inviter_id: {
    presence: { allowEmpty: true }
  }
}

const MAX_USER_CREDIT = parseInt(config.get('invite.max_user_credit'))
const USER_CREDIT = parseInt(config.get('invite.user_credit'))
const REFERREL_CREDIT = parseInt(config.get('invite.referral_credit'))
const TOKEN_EXPIRY_TIME = 300

export default class CreateUserService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const salt = bcrypt.genSaltSync(10)
    const newUser = {
      email: this.email,
      pass: bcrypt.hashSync(this.pass, salt),
      full_name: this.first_name + ' ' + this.last_name,
      email_verified: false
    }
    try {
      const user = await User.create(newUser)
      await UserDetail.create({
        user_id: user.user_id,
        first_name: this.first_name,
        last_name: this.last_name
      })
      const token = jwt.sign({ email: this.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
      await SendEmailVerificationMail.execute({ token, email: this.email })

      // Check for invited Registration
      if (this.with_invite) {
        const { inviter_id } = this.args
        // Check for existing contact
        await findOrCreateContact({ user_id: inviter_id, referral_email: this.email })
        // Assign User and Referrel Credits rewards
        await assignCredits({ user_id: inviter_id, referral_email: this.email })
      }
      return user
    } catch (e) {
      this.addError(e.message, e.errors[0].message)
    }
  }
}

async function findOrCreateContact ({ user_id, referral_email }) {
  const contact = await UserContact.findOne({ where: { user_id, referral_email }, raw: true })
  if (contact === null) {
    // Create new Contact
    await UserContact.create({ user_id, referral_email, created_on: Date.now() })
  }
}

async function assignCredits ({ user_id, referral_email }) {
  const currentUserCredit = await getCurrentUserCredit({ user_id })
  // Check for maximum user_credit
  const newUserCredit = currentUserCredit + USER_CREDIT > MAX_USER_CREDIT ? (MAX_USER_CREDIT - currentUserCredit) : USER_CREDIT
  // Update user_credit and referral_credit
  await UserContact.update({ user_credit: newUserCredit, referral_credit: REFERREL_CREDIT }, { where: { user_id, referral_email } })
}

async function getCurrentUserCredit ({ user_id }) {
  const contacts = await UserContact.findAll({ where: { user_id }, raw: true, attributes: ['user_credit'] })
  let totalUserCredits = 0
  if (contacts !== null) {
    for (const contact of contacts) {
      totalUserCredits += contact.user_credit
    }
  }
  return totalUserCredits
}
