import { FlowPage, FlowField } from '../../db/models'
import { Op } from 'sequelize'

export const getFlowFieldsByFlowAndPageId = async ({ page, flow_id }) => {
  const FlowFields = await FlowField.findAll({
    where: { page, flow_id },
    raw: true
  })

  return FlowFields
}

export const getFlowPagesByFlowId = ({ flowId }) => {
  return FlowPage.findAll({ where: { flow_id: flowId }, raw: true })
}

export const getFlowFieldsByFlowId = ({ flowId }) => {
  return FlowField.findAll({ where: { flow_id: flowId }, raw: true })
}

export const getEditableFlowFieldsByFlowId = ({ flowId }) => {
  const excludedFieldTypes = [
    'NAVIGATION',
    'SCRIPT',
    'CONDITION',
    'CALCULATION',
    'IFRAME',
    'IMAGE',
    'SPACE',
    'ACTION'
  ]

  return FlowField.findAll({
    where: { flow_id: flowId, field_type: { [Op.notIn]: excludedFieldTypes } },
    raw: true
  })
}
