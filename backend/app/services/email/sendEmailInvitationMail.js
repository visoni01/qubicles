import ServiceBase from '../../common/serviceBase'
import logger from '../../common/logger'
import { notificationEmailTemplate } from '../../templates/notificationEmailTemplate'
import { UserContact } from '../../db/models'
import NodeMailer from '../../utils/getNodeMailer'

const constraints = {
  contacts: {
    presence: { allowEmpty: false }
  },
  inviteLink: {
    presence: { allowEmpty: false }
  },
  inviter_first_name: {
    presence: { allowEmpty: false }
  },
  inviter_last_name: {
    presence: { allowEmpty: false }
  },
  updateSent: {
    presence: { allowEmpty: false }
  },
  user_id: {
    presence: { allowEmpty: false }
  }
}
export default class SendEmailInvitationMailService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { inviteLink, user_id, updateSent, contacts, inviter_first_name, inviter_last_name } = this.args

    for (const contact of contacts) {
      NodeMailer.sendMail({
        from: 'Qubicles <invitations@qubicles.io>',
        to: contact.email,
        subject: `${inviter_first_name} has invited you to join Qubicles!`,
        html: getHtml({ inviteUrl: inviteLink, name: contact.name, inviter_first_name, inviter_last_name })
      }, (error, info) => {
        if (error) {
          logger.error(`Error in sending Invitation mail: ${error}`)
        } else {
          logger.info(`Invitation email sent succesfully!! to ${contact.email} => ${JSON.stringify(info)}`)
        }
      })
      // Update x_user_contacts for invite
      if (updateSent) {
        await UserContact.update(
          { sent: Date.now() },
          { where: { user_id, referral_email: contact.email } })
      }
    }
  }
}

function getHtml ({ inviteUrl, name, inviter_first_name, inviter_last_name }) {
  const EMAIL_TEMPLATE_GREETING = name ? `Hi ${name}`: `Hi`
  const EMAIL_TEMPLATE_BODY = `
  ${inviter_first_name} ${inviter_last_name} has invited you to join Qubicles!
  <br /><br />
  Qubicles is a revolutionary contact center service
  that allows businesses to easily find customer service, sales and support talent
  at any time, from any where in the world.
  <br /><br />
  It is so unique that it runs on a revolutionary technology called "blockchain"! That just means it's
  trustworthy and reliable, and there are no middlemen like staffing companies taking 15-25%
  of your hard earned money.
  <br />
  <p style='font-weight:bold;font-size:12pt;color:#23945b'>Earn $5 when you register
  and up to $100 for referring your friends!
  </p>
  We hope you sign up today - even if it's just to collect this free money!
  <a href=${inviteUrl}>Click here to register for free and get paid.</a>
  `
  const EMAIL_TEMPLATE_CLOSING = `Once you\'ve signed up, connect with
    ${inviter_first_name} inside Qubicles. See you there!`
  return notificationEmailTemplate(EMAIL_TEMPLATE_GREETING, EMAIL_TEMPLATE_BODY, EMAIL_TEMPLATE_CLOSING)
}
