import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'
import GetSecurityContextService from '../user/getSecurityContext'

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
    const { currentClientId } = await GetSecurityContextService.run({ user: this.user })

    const newFlowData = {
      flow_name: this.flowName,
      flow_description: this.flowDescription,
      flow_changed: 'N',
      currentClientId: currentClientId
    }

    await Flow.create(newFlowData)

    return newFlowData
  }
}
