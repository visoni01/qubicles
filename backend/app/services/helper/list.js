import { XLeadsList } from '../../db/models'
import { SqlHelper } from '../../utils/sql'
import _ from 'lodash'

export const getListByListId = ({ list_id }) => {
  return XLeadsList.findOne({ where: { list_id }, raw: true })
}

export const listsFieldsTableExists = async ({ listId }) => {
  // const dbName = config.get('sequelize.name')
  const sql = `SHOW TABLES LIKE \"x_leads_custom_${listId}\";`
  const data = await SqlHelper.showTables(sql)
  const isTableExist = !_.isEmpty(data)
  return isTableExist
}
