import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import { google } from 'googleapis'

const constraints = {
}

export default class InviteService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const SCOPES = ['https://www.googleapis.com/auth/contacts.readonly']
    const clientId = config.get('google.clientId')
    const clientSecret = config.get('google.clientSecret')
    const redirectUri = config.get('google.callbackURL')
    try {
      const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
      const authUrl = oauth2Client.generateAuthUrl({
        access_type: 'offline',
        scope: SCOPES
      })
      console.log('AUTH URL=============', authUrl)

      return authUrl
    } catch (err) {
      this.addError('error', err)
    }
  }
}
