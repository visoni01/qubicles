import ServiceBase from '../../common/serviceBase'
import { Flow } from '../../db/models'

const constraints = {
  flowId: {
    presence: { allowEmpty: false }
  },
  flowName: {
    presence: false
  },
  flowDescription: {
    presence: false
  }
}

export class UpdateFlowService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if flowId is valid or not
    const flowData = await Flow.findOne({ where: { flow_id: this.flowId }, raw: true })

    if (!(flowData && flowData['flow_id'])) {
      this.addError('InvalidField', '\'flow_id\' is not valid')
      return
    }

    const updatedFlowData = {
      flow_name: this.flowName,
      flow_description: this.flowDescription
    }

    // Updaing the flow data
    await Flow.update(updatedFlowData, { where: { flow_id: this.flowId }, raw: true })

    return updatedFlowData
  }
}
