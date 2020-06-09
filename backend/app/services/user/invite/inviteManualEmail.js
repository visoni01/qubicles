import ServiceBase from '../../../common/serviceBase'
import config from '../../../../config/app'
import { UserDetail } from '../../../db/models'
import SendEmailInvitationMail from '../../email/sendEmailInvitationMail'
import AddUserContact from '../addUserContact'

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
      const walletAddress = userDetails.wallet_address

      const inviteLink = `${baseInviteUrl}/${walletAddress}`

      for (const contact of contacts) {
        // Add contactEmails to x_user_contacts
        await AddUserContact.execute({ email: contact.email, user_id })
      }
      // Send Invitation link to contactEmails
      await SendEmailInvitationMail.execute({
        contacts,
        inviteLink,
        inviter_first_name: userDetails.first_name,
        inviter_last_name: userDetails.last_name,
        updateSent: true,
        user_id
      })
      return 'Sent Invitations successfully'
    } catch (err) {
      this.addError('error', err)
    }
  }
}
