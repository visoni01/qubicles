import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import { getUserById, getFlowFieldsByFlowId, isAuthorizedForClient } from '../helper'
import GetClientsService from '../user/getClients'
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
      const isInvalid = !isAuthorizedForClient({ 
        clients, 
        client_id: flow.client_id, 
        user_level:  currentUser.user_level
      })

      if (isInvalid) {
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
