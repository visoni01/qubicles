import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import { google } from 'googleapis'
import { UserContact } from '../../db/models'
import SendEmailInvitationMail from '../email/sendEmailInvitationMail'

const constraints = {
  code: {
    presence: { allowEmpty: false }
  }
}

const baseInviteUrl = 'https://app.qubicles.io/invite/'
const userId = '1'
export default class InviteResponseService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const walletAddress = 'williamk.qbe'
    const code = this.filteredArgs
    const clientId = config.get('google.clientId')
    const clientSecret = config.get('google.clientSecret')
    const redirectUri = config.get('google.callbackURL')
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    const emails = []
    try {
      const { tokens } = await oauth2Client.getToken(code)
      await oauth2Client.setCredentials(tokens)
      const service = google.people({ version: 'v1', auth: oauth2Client })
      const { data } = await service.people.connections.list({
        resourceName: 'people/me',
        personFields: 'names,emailAddresses'
      })
      if (data !== null || data !== undefined) {
        data.connections.forEach(contact => {
          const contactEmails = contact.emailAddresses
          if (contactEmails !== undefined) {
            const primaryEmail = contactEmails[0]
            if (primaryEmail.value) {
              const emailAddress = primaryEmail.value
              console.log('EMAIL ADDRESS!!!!!=====', emailAddress)
              emails.push(emailAddress)
            }
          }
        })
      }
    } catch (err) {
      this.addError('error', err)
    }
    // Add contactEmails to x_user_contacts
    console.log('ALL CONTACTSSS===', emails)
    emails.forEach(email => {
      addEmailToContacts(email)
    })
    // Send Invitation link to contactEmails
    const inviteLink = baseInviteUrl + walletAddress
    SendEmailInvitationMail.execute({ emails, inviteLink })
  }
}
async function addEmailToContacts (email) {
  console.log('USER IS CREATING=====')
  await UserContact.create({
    user_id: userId,
    contact_email: email
  })
}
