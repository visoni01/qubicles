import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import logger from '../../common/logger'

const constraints = {
  'email': {
    presence: { allowEmpty: false }
  },
  'token': {
    presence: { allowEmpty: false }
  }
}
export default class SendEmailVerificationMailService extends ServiceBase {
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
    const verifyEmailPageUrl = `${config.get('webApp.baseUrl')}/auth/verifyToken/${this.token}`

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
      from: 'Qubicles <notifications@qubicles.io>',
      to: 'sjaiswal@qubicles.io',
      subject: 'Please confirm your email',
      html: `<p>Hello, Welcome to Qubicles! We are excited to have you on-board and there's just one step to verify if it's actually your e-mail address: </p>
      <p> <a href="${verifyEmailPageUrl}">Click Here</a> to verify your email address. </p>
      <p>Or, alternatively </br> aste the following link in your browser </br> ${verifyEmailPageUrl}</p>`
    }, (error, info) => {
      if (error) {
        logger.error(`Error in sending verification mail: ${error}`)
      }
      else {
        logger.info(`Verification email sent succesfully!! => ${JSON.stringify(info)}`);
      }
    });
  }
}
