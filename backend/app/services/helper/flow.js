import { FlowField } from '../../db/models'

export const getFlowFieldsByFlowAndPageId =  async ({ page, flow_id }) => {
  const FlowFields = await FlowField.findAll({
    where: { page, flow_id },
    raw: true
  })

  return FlowFields
}