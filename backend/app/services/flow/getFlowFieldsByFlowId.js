import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import { getUserById, getFlowFieldsByFlowId } from '../helper'
import GetClientsService from '../user/getClients'
import { USER_LEVEL } from '../user/getSecurityContext'
import _ from 'lodash'

const constraints = {
  flowId: {
    presence: { allowEmpty: false }
  },
  userId: {
    presence: false
  }
}

export class GetFlowFieldsByFlowIdService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const flow = await Flow.findOne({ where: { flow_id: this.flowId }, raw: true} ) 
    
    if (!(flow && flow['flow_id'])) {
      this.addError('InvalidField', 'Flow does not exist')
      return
    }

    if (this.userId) {
      const currentUser = await getUserById({ userId: this.userId })
      const { clients } = await GetClientsService.run({ userId: this.userId })
      const firstClient = (clients && clients.length) ? clients[0] : ''

      if (flow.client_id != firstClient.client_id && currentUser.user_level != USER_LEVEL.SYSTEM) {
        this.addError('Unauthorized', 'Not authorized')
        return
      }
    }

    let fields = await getFlowFieldsByFlowId({ flowId: flow.flow_id })
    fields = _.orderBy(fields, 'page', 'ASC')
    fields = _.sortBy(fields, 'field_rank')
    fields = _.sortBy(fields, 'field_id')

    return fields
  }
}
