import { USER_LEVEL } from '../user/getSecurityContext'
import { executeUpdateQuery, executeSelectQuery } from '../../utils/queryManager'
import { getLists, DEFAULT_SYSTEM_LIST_IB, DEFAULT_SYSTEM_LIST_OB } from './list'
import { getCampaigns } from './campaign'
import { getInboundGroups } from './group'
import moment from 'moment'
import { XLogOutbound, XLogInbound } from '../../db/models'
import { formatDate } from './common'

export const updateOutboundLog = async ({ log, user, clients }) => {
  const currentDate = moment()
  const callDate = moment(log.call_date)
  const daysPast = currentDate.diff(callDate, 'days', true)
  let sourceTable = getOBLogTableName({ user, clients })

  if (daysPast > 59) {
    sourceTable = 'x_log_outbound_historical'
  } else if (daysPast > 1) {
    sourceTable = 'x_log_outbound_archive'
  }

  await updateOutLog({ log, sourceTable })
}

export const updateInboundLog = async ({ log }) => {
  const currentDate = moment()
  const callDate = moment(log.call_date)
  const daysPast = currentDate.diff(callDate, 'days', true)
  let sourceTable = 'x_log_inbound'

  if (daysPast > 59) {
    sourceTable = 'x_log_inbound_historical'
  } else if (daysPast > 1) {
    sourceTable = 'x_log_inbound_archive'
  }

  await updateInLog({ log, sourceTable })
}

export const updateOutLog = async ({ log, sourceTable }) => {
  await executeUpdateQuery({
    method: 'update',
    sourceTable,
    model: XLogOutbound,
    data: log
  })
}

export const updateInLog = async ({ log, sourceTable }) => {
  await executeUpdateQuery({
    method: 'update',
    sourceTable,
    model: XLogInbound,
    data: log
  })
}

export function getOBLogTableName ({ user, clients }) {
  if (user.user_level < USER_LEVEL.SYSTEM) {
    return `x_log_outbound_${clients.clientUserName}_${clients.clientId}`
  } else {
    return 'x_log_outbound_fenero_1'
  }
}

export const getContactOutboundCallLog = async ({ lead_id, campaigns, lists, startDate, endDate, user, clients, client_id }) => {
  if (!campaigns) {
    campaigns = await getCampaigns({ user, clients, client_id })
  }

  if (!lists) {
    lists = await getLists({ campaigns })
  }

  const listIds = lists.map(list => list.list_id)
  const campaignIds = campaigns.map(campaign => campaign.campaign_id.toLowerCase())

  // for leads not associated with a list
  listIds.unshift(DEFAULT_SYSTEM_LIST_OB)
  listIds.unshift(DEFAULT_SYSTEM_LIST_IB)

  const sourceTable = getOBLogTableName({ user, clients })
  const log = await getLogForContactByDates({ lead_id, startDate, endDate, sourceTable })

  return log.filter((data) => {
    return (data.list_id && listIds.includes(data.list_id) && campaignIds.includes(data.campaign_id.toLowerCase()))
  })
}

export const getLogForContactByDates = async ({ lead_id, startDate, endDate, sourceTable }) => {
  const logForContactByDates = await executeSelectQuery({
    method: 'getLogForContactByDates',
    sourceTable,
    lead_id,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  })
  return logForContactByDates
}

export const getContactInboundCallLog = async ({ lead_id, campaigns, lists, startDate, endDate, user, clients, client_id }) => {
  if (!campaigns) {
    campaigns = await getCampaigns({ user, clients, client_id })
  }

  if (!lists) {
    lists = await getLists({ campaigns })
  }

  const myQueues = await getInboundGroups({ user, client_id })
  let queues = []

  if (myQueues.length > 0) {
    queues = myQueues.map(queue => queue.group_id.toLowerCase())
  }

  const listIds = lists.map(list => list.list_id)

  // for leads not associated with a list
  listIds.unshift(DEFAULT_SYSTEM_LIST_OB)
  listIds.unshift(DEFAULT_SYSTEM_LIST_IB)

  const logs = await getCloserLogForContactByDates({ lead_id, startDate, endDate })

  return logs.filter((log) => {
    return (log.list_id && listIds.includes(log.list_id) && queues.includes(log.campaign_id.toLowerCase()))
  })
}

export const getCloserLogForContactByDates = async ({ lead_id, startDate, endDate }) => {
  const closerLogForContactByDates = await executeSelectQuery({
    method: 'getCloserLogForContactByDates',
    sourceTable: XLogInbound.tableName,
    lead_id,
    startDate: formatDate(startDate),
    endDate: formatDate(endDate)
  })

  return closerLogForContactByDates
}
