import ServiceBase from '../../../common/serviceBase'
import { FlowField } from '../../../db/models'

const constraints = {
  flowFieldId: {
    presence: { allowEmpty: false }
  }
}

export class DeleteFlowFieldService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if field_id is valid or not
    const flowFieldData = await FlowField.findOne({ where: { field_id: this.flowFieldId }, raw: true })

    if (!(flowFieldData && flowFieldData.field_id)) {
      this.addError('InvalidField', '\'field_id\' is not valid')
      return
    }

    // Delete field_id
    await FlowField.destroy({ where: { field_id: this.flowFieldId } })

    return flowFieldData
  }
}
