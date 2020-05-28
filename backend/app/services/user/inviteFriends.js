import ServiceBase from '../../common/serviceBase'
import config from '../../../config/app'
import { google } from 'googleapis'

const constraints = {
}

export default class InviteFriendsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const SCOPES = ['https://www.googleapis.com/auth/contacts']
    const clientId = config.get('google.clientId')
    const clientSecret = config.get('google.clientSecret')
    const redirectUri = config.get('google.callbackURL')
    // const people = google.people({
    //   version: 'v1'
    // })
    // people.contactGroups()
    const oauth2Client = new google.auth.OAuth2(clientId, clientSecret, redirectUri)
    const authUrl = oauth2Client.generateAuthUrl({
      scopes: SCOPES,
      access_type: 'offline'
      // prompt: 'consent'
    })
    console.log('AUTH_URL===========', authUrl)

    // const auth = new google.auth.GoogleAuth({
    //   // Scopes can be specified either as an array or as a single, space-delimited string.
    //   scopes: ['https://www.googleapis.com/auth/contacts']
    // })
    // const authClient = await auth.getClient();
    // console.log('AUTH_CLIENTS=====', authClient)

    return 'Hello Invitation link'
  }
}
