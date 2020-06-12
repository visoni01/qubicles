import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import GetUserDetailsService from '../../services/user/getUserDetails'

const constraints = {
  flowName: {
    presence: false
  },
  flowDescription: {
    presence: false
  },
  user: {
    presence: { allowEmpty: false }
  }
}

export class AddFlowService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { clientIds } = await GetUserDetailsService.run({ user: this.user })

    const newFlowData = {
      flow_name: this.flowName,
      flow_description: this.flowDescription,
      flow_changed: 'N'
    }

    if (clientIds && clientIds.length) {
      newFlowData['client_id'] = clientIds[0]
    }

    await Flow.create(newFlowData)

    return newFlowData
  }
}
