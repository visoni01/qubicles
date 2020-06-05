import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import logger from '../../common/logger'
import { notificationEmailTemplate } from '../../templates/notificationEmailTemplate'
import { UserContact } from '../../db/models'

const constraints = {
  contacts: {
    presence: { allowEmpty: false }
  },
  inviteLink: {
    presence: { allowEmpty: false }
  },
  user: {
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
    const auth = {
      auth: {
        api_key: config.get('mailgun.apiKey'),
        domain: config.get('mailgun.domain')
      }
    }
    const nodemailerMailgun = nodemailer.createTransport(mg(auth))
    const { inviteLink, user_id, updateSent, contacts, user } = this.args

    for (const contact of contacts) {
      nodemailerMailgun.sendMail({
        from: 'Qubicles <invitaions@qubicles.io>',
        to: contact.email,
        subject: `${user.split(' ')[0]} has invited you to join Qubicles!`,
        html: getHtml({ inviteUrl: inviteLink, name: contact.name, user })
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

function getHtml ({ inviteUrl, name, user }) {
  const EMAIL_TEMPLATE_GREETING = `Hi ${name}`
  const EMAIL_TEMPLATE_BODY = `
  ${user} has invited you to join Qubicles!
  <br />
  You can earn $5 in free Qubicle (QBE) tokens just for signing up!”
  <br />
  Click the link below to Register
  <br />
  ${inviteUrl}
  <br /><br />
  *********************************************************************
  `
  const EMAIL_TEMPLATE_CLOSING = 'What are you waiting for? Collect your free $5 in cryptocurrency tokens now!'
  return notificationEmailTemplate(EMAIL_TEMPLATE_GREETING, EMAIL_TEMPLATE_BODY, EMAIL_TEMPLATE_CLOSING)
}
