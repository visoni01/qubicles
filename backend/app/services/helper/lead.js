import { getListByListId } from './list'
import { getEditableFlowFieldsByFlowId } from './flow'
import { listsFieldsColumnExists, formatDate } from './common'
import moment from 'moment'
import { SqlHelper } from '../../utils/sql'
import { USER_LEVEL } from '../user/getSecurityContext'
import { executeSelectQuery, executeUpdateQuery } from '../../utils/queryManager'
import { Lead } from '../../db/models'

export const getLeadByLeadId = async ({ leadId, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  const lead = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable,
    columnName: 'lead_id',
    columnValue: leadId
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

export const updateLeadInCustomTable = async ({ lead }) => {
  const listId = lead['list_id']
  // send custom fields update
  let onDuplicateUpdateSQL = ' ON DUPLICATE KEY UPDATE '
  const insertSql = `INSERT INTO x_leads_custom_${listId} SET `
  let sql

  // get all fields in this list to aide with data type checks
  const leadList = await getListByListId({ listId })
  const flowFields = await getEditableFlowFieldsByFlowId({ flowId: leadList.flow_id })

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
      isKeyValid = await listsFieldsColumnExists(lead['list_id'], key)
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
