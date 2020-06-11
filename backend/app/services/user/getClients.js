import ServiceBase from '../../common/serviceBase'
import { XClient, XClientUser } from '../../db/models'

const constraints = {
  userId: {
    presence: { allowEmpty: false }
  }
}

export default class GetClientsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const clientIdsData = await XClientUser.findAll({
      where: { user_id: this.userId },
      attributes: ['client_id'],
      raw: true
    })

    const clientIds = clientIdsData.map((client) => client['client_id'])

    const clients = await XClient.findAll({ where: { client_id: clientIds }, raw: true })

    return { clients, clientIds }
  }
}
