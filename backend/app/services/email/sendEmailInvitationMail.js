import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import logger from '../../common/logger'

const constraints = {
  emails: {
    presence: { allowEmpty: false }
  },
  inviteLink: {
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
    const inviteLink = this.inviteLink
    const emails = this.emails
    emails.forEach(mail => {
      nodemailerMailgun.sendMail({
        from: 'Qubicles <notifications@qubicles.io>',
        to: mail,
        subject: 'Invitation from Qubicles',
        html: getHtml(inviteLink)
      }, (error, info) => {
        if (error) {
          logger.error(`Error in sending Invitation mail: ${error}`)
        } else {
          logger.info(`Invitation email sent succesfully!! to ${mail} => ${JSON.stringify(info)}`)
        }
      })
    })
  }
}

function getHtml (inviteLink) {
  return `<h3>Your friend has Invited you ${inviteLink}</h3>`
}
