import ServiceBase from '../../common/serviceBase'
import { EmailTemplate } from '../../db/models'
import GetUserDetailsService, { USER_LEVEL } from '../user/getUserDetails'

const constraints = {
  user: {
    presence: { allowEmpty: false }
  }
}

export class GetEmailTemplatesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let query = {}
    let currentClientId = 0

    // We'll get details i.e userRef, username, clientsData
    // and clientIds
    const { clientIds } = await GetUserDetailsService.run({ user: this.user })
    if (clientIds && clientIds.length) {
      currentClientId = clientIds[0]
    }

    if (this.user.user_level < USER_LEVEL.SYSTEM) {
      query = {
        where: { client_id: currentClientId },
        order: [['description', 'ASC']],
        raw: true
      }
    } else {
      query = { raw: true }
    }

    const emailTemplateData = await EmailTemplate.findAll(query)

    return emailTemplateData
  }
}
