import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'


const constraints = {
  'id': {
    presence: { allowEmpty: false }
  }
}

export default class SendEmailVerificationMailService extends ServiceBase {
  // get constraints () {
  //   return constraints
  // }

  async run () {
    const auth = {
      auth: {
        api_key: config.get('mailgun.apiKey'),
        domain: config.get('mailgun.domain')
      }
    }

    const nodemailerMailgun = nodemailer.createTransport(mg(auth));

    nodemailerMailgun.sendMail({
      from: 'myemail@example.com',
      to: 'sjaiswal@qubicles.io', // An array if you have multiple recipients.
      subject: 'Hey you, awesome!',
      //You can use "html:" to send HTML email content. It's magic!
      html: '<b>Wow Big powerful letters</b>',
      //You can use "text:" to send plain-text content. It's oldschool!
      text: 'Mailgun rocks, pow pow!'
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
