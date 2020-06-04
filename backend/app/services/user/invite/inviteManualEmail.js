import ServiceBase from '../../../common/serviceBase'
import config from '../../../../config/app'
import { UserContact, UserDetail } from '../../../db/models'
import SendEmailInvitationMail from '../../email/sendEmailInvitationMail'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  emails: {
    presence: { allowEmpty: false }
  }
}

const baseInviteUrl = config.get('invite.baseUrl')

export default class InviteManualService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, emails } = this.args
    const contacts = []
    emails.forEach(email => contacts.push({ name: '', email }))
    try {
      // Fetch User details
      const userDetails = await UserDetail.findOne({ where: { user_id }, raw: true, attributes: ['wallet_address', 'first_name', 'last_name'] })
      const walletAddress = userDetails.user
      userDetails.full_name = `${userDetails.first_name} ${userDetails.last_name}`
      const inviteLink = `${baseInviteUrl}/${walletAddress}`

      for (const contact of contacts) {
        // Add contactEmails to x_user_contacts
        await addEmailToContacts({ email: contact.email, user_id })
      }
      // Send Invitation link to contactEmails
      await SendEmailInvitationMail.execute({ contacts, inviteLink, user: userDetails.full_name, updateSent: true, user_id })
      return 'Sent Invitations successfully'
    } catch (err) {
      this.addError('error', err)
    }
  }
}

async function addEmailToContacts ({ email, user_id }) {
  const contactAlreadyExist = await UserContact.findOne({ where: { user_id, contact_email: email } })
  if (contactAlreadyExist === null) {
    await UserContact.create({
      user_id,
      contact_email: email
    })
  }
}
