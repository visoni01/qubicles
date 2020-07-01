import { getListByListId } from './list'
import { getEditableFlowFieldsByFlowId } from './flow'
import { listsFieldsColumnExists, listsFieldsTableExists, formatDate } from './index'
import moment from 'moment'
import { SqlHelper } from '../../utils/sql'
import { USER_LEVEL } from '../user/getSecurityContext'
import { executeSelectQuery, executeUpdateQuery, executeDeleteQuery } from '../../utils/queryManager'
import { Lead } from '../../db/models'

export const getLeadByLeadId = async ({ lead_id, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  const lead = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable,
    columnName: 'lead_id',
    columnValue: lead_id
  })
  return lead
}

export const getLeadsTableName = ({ user, clients }) => {
  if (user && user.user_level < USER_LEVEL.SYSTEM) {
    return `x_leads_${clients[0].client_username}_${clients[0].client_id}`
  } else {
    return 'x_leads_fenero_1'
  }
}

export const updateLead = async ({ lead, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  await executeUpdateQuery({
    method: 'update',
    sourceTable,
    model: Lead,
    data: lead
  })
}

export const deleteLead = async ({ lead, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  await executeDeleteQuery({
    method: 'delete',
    sourceTable,
    model: Lead,
    data: lead
  })
}

export const getLeadCustomData = async ({ list_id, lead_id }) => {
  let lead = {}
  const isTableExist = await listsFieldsTableExists({ list_id })
  if (isTableExist) {
    lead = await executeSelectQuery({
      method: 'getLeadCustomData',
      sourceTable: `x_leads_custom_${list_id}`,
      lead_id
    })
  }
  return lead
}

export const deleteLeadCustomData = async ({ list_id, lead_id }) => {
  let lead = {}
  const isTableExist = await listsFieldsTableExists({ list_id })
  if (isTableExist) {
    lead = await executeDeleteQuery({
      method: 'deleteLeadCustomData',
      sourceTable: `x_leads_custom_${list_id}`,
      lead_id
    })
    return lead
  }
}

export const updateLeadInCustomTable = async ({ lead }) => {
  const list_id = lead['list_id']
  // send custom fields update
  let onDuplicateUpdateSQL = ' ON DUPLICATE KEY UPDATE '
  const insertSql = `INSERT INTO x_leads_custom_${list_id} SET `
  let sql

  // get all fields in this list to aide with data type checks
  const leadList = await getListByListId({ list_id })
  const flowFields = await getEditableFlowFieldsByFlowId({ flow_id: leadList.flow_id })

  // build dynamic SQL to do so
  let customFieldValuesSet = false
  const fieldsProcessed = []

  Object.keys(lead).forEach(async (key) => {
    const keyInLowerCase = key.toLowerCase()
    const flowFieldDefinition = flowFields.find((f) => f.field_label.toLowerCase() === keyInLowerCase)
    // save this field to our custom table
    let isKeyValid = !fieldsProcessed.includes(keyInLowerCase) &&
      key !== 'lead_id' &&
      lead[key] &&
      flowFieldDefinition

    if (isKeyValid) {
      isKeyValid = await listsFieldsColumnExists({ list_id: lead['list_id'], columnName: key })
    }

    if (isKeyValid) {
      let fieldValue = lead[key] || ''

      if (fieldValue) {
        fieldValue = fieldValue.replace(new RegExp('[{}]', 'g'), '')
      }

      if (moment(fieldValue).isValid() && flowFieldDefinition.field_type === 'DATEPICKER') {
        sql += `\`${key}\` = '${formatDate(fieldValue)}',`
      } else {
        sql += `\`${key}\` = '${fieldValue}'`
      }

      onDuplicateUpdateSQL += `\`${key}\` = VALUES(\`${key}\`)`
      customFieldValuesSet = true
      fieldsProcessed.push(keyInLowerCase)
    }
  })

  // send update
  if (customFieldValuesSet) {
    sql += `lead_id = '${lead.lead_id}'`
    onDuplicateUpdateSQL += 'lead_id = VALUES(lead_id)'
    const fullQuery = insertSql + sql + onDuplicateUpdateSQL
    await SqlHelper.insert(fullQuery)
  }
}
