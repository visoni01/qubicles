import { XLeadsList, Lead } from '../../db/models'
import { USER_LEVEL } from '../user/getSecurityContext'
import { executeUpdateQuery, executeSelectQuery } from '../../utils/queryManager'

export const getListByListId = ({ listId }) => {
  return XLeadsList.findOne({ where: { list_id: listId }, raw: true })
}

export const getLeadsTableName = ({ user, clients }) => {
  if (user && user.user_level < USER_LEVEL.SYSTEM) {
    return `x_leads_${clients[0].client_username}_${clients[0].client_id}`
  } else {
    return 'x_leads_fenero_1'
  }
}

export const getListByLeadId = async ({ leadId, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  const list = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable,
    columnName: 'lead_id',
    columnValue: leadId
  })
  return list
}

export const updateList = async ({ list, user, clients }) => {
  const sourceTable = getLeadsTableName({ user, clients })
  await executeUpdateQuery({
    method: 'update',
    sourceTable,
    model: Lead,
    data: list
  })
}
