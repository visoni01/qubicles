import { FlowPage, FlowField } from '../../db/models'
import { Op } from 'sequelize'

export const getFlowFieldsByFlowAndPageId = async ({ page, flow_id }) => {
  const FlowFields = await FlowField.findAll({
    where: { page, flow_id },
    raw: true
  })

  return FlowFields
}

export const getFlowPagesByFlowId = ({ flow_id }) => {
  return FlowPage.findAll({ where: { flow_id }, raw: true })
}

export const getFlowFieldsByFlowId = ({ flow_id }) => {
  return FlowField.findAll({ where: { flow_id }, raw: true })
}

export const getEditableFlowFieldsByFlowId = ({ flow_id }) => {
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
    where: { flow_id, field_type: { [Op.notIn]: excludedFieldTypes } },
    raw: true
  })
}

export const getFlowPageByPageId = ({ pageId }) => {
  return FlowPage.findOne({ where: { page_id: pageId }, raw: true })
}
