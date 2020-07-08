import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import { getUserById, getFlowFieldsByFlowId, isAuthorizedForClient } from '../helper'
import GetClientsService from '../user/getClients'
import _ from 'lodash'
import { ERRORS, MESSAGES } from '../../utils/errors'

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
    const flow = await Flow.findOne({ where: { flow_id: this.flowId }, raw: true })

    if (!(flow && flow['flow_id'])) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.FLOW_NOT_EXIST)
      return
    }

    if (this.userId) {
      const currentUser = await getUserById({ user_id: this.userId })
      const { clients } = await GetClientsService.run({ user_id: this.userId })
      const isInvalid = !isAuthorizedForClient({
        clients,
        client_id: flow.client_id,
        user_level: currentUser.user_level
      })

      if (isInvalid) {
        this.addError(ERRORS.UNAUTHORIZED)
        return
      }
    }

    let fields = await getFlowFieldsByFlowId({ flow_id: flow.flow_id })
    fields = _.orderBy(fields, 'page', 'ASC')
    fields = _.sortBy(fields, 'field_rank')
    fields = _.sortBy(fields, 'field_id')

    return fields
  }
}
