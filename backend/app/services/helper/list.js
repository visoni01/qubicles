import { XLeadsList } from '../../db/models'
import { SqlHelper } from '../../utils/sql'
import { getArchiveTableName } from './common'
import { executeSelectQuery } from '../../utils/queryManager'
import _ from 'lodash'

export const DEFAULT_SYSTEM_LIST_OB = 998
export const DEFAULT_SYSTEM_LIST_IB = 999

export const getListByListId = ({ list_id }) => {
  return XLeadsList.findOne({ where: { list_id }, raw: true })
}

export const listsFieldsTableExists = async ({ list_id }) => {
  const sql = `SHOW TABLES LIKE 'x_leads_custom_${list_id}'`
  const data = await SqlHelper.showTables(sql)
  const isTableExist = !_.isEmpty(data)
  return isTableExist
}

export const getLists = async ({ campaigns }) => {
  const promises = []
  if (campaigns && campaigns.length) {
    campaigns.forEach((campaign) => {
      promises.push(() => getAllLists({ campaign_id: campaign.campaign_id }))
    })
  }

  let lists = await Promise.all(promises.map((promise) => promise()))

  if (lists && lists.length) {
    lists = lists.flat()
  }

  return lists
}

export const getAllLists = async ({ campaign_id }) => {
  let lists = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable: getArchiveTableName(XLeadsList),
    columnName: 'campaign_id',
    columnValue: campaign_id
  })

  const listByCampaignId = await getListsByCampaignId({ campaign_id })
  lists = [...lists, ...listByCampaignId]

  return lists.filter((list) => {
    return (list.list_id !== DEFAULT_SYSTEM_LIST_OB && list.list_id !== DEFAULT_SYSTEM_LIST_IB)
  })
}

export const getListsByCampaignId = async ({ campaign_id }) => {
  const lists = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable: XLeadsList.tableName,
    columnName: 'campaign_id',
    columnValue: campaign_id
  })

  return lists
}
