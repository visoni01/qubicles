import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'
import jwt from 'jsonwebtoken'

const constraints = {
  'id': {
    presence: { allowEmpty: false }
  },
  'email': {
    presence: { allowEmpty: false }
  }
}
const TOKEN_EXPIRY_TIME = 300
export default class SendEmailVerificationMailService extends ServiceBase {
  get constraints() {
    return constraints
  }

  async run() {
    const auth = {
      auth: {
        api_key: config.get('mailgun.apiKey'),
        domain: config.get('mailgun.domain')
      }
    }

    const token = jwt.sign({ email: this.args.email }, 'secret', { expiresIn: TOKEN_EXPIRY_TIME })
    const verifyEmailPageUrl = `https://localhost:4000/api/v1/auth/verifyToken/${token}`

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
      from: 'Qubicles <notifications@qubicles.io>',
      to: 'sjaiswal@qubicles.io', 
      subject: 'Please confirm your email',
      html:`<p>Hello, Welcome to Qubicles! We are excited to have you on-board and there's just one step to verify if it's actually your e-mail address: </p> <p> <a href="${verifyEmailPageUrl}">Click Here</a> to verify your email address. </p> <p>Or, alternatively </br> aste the following link in your browser </br> ${verifyEmailPageUrl}</p>`
    }, (err, info) => {
      if (err) {
        console.log(`Error: ${err}`);
      }
      else {
        console.log(`Response: ${JSON.stringify(info)}`);
      }
    });
  }
}
