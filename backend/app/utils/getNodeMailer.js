import config from '../../config/app'
import nodemailer from 'nodemailer'
import mg from 'nodemailer-mailgun-transport'

const auth = {
  auth: {
    api_key: config.get('mailgun.apiKey'),
    domain: config.get('mailgun.domain')
  }
}
export default function getNodeMailerObject () {
  const nodemailerMailgun = nodemailer.createTransport(mg(auth))
  return nodemailerMailgun
}
