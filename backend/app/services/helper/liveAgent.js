import { USER_LEVEL } from '../../services/user/getSecurityContext'
import { executeSelectQuery, executeUpdateQuery } from '../../utils/queryManager'
import { LiveAgent } from '../../db/models'

export const LIVE_AGENT_STATUS = {
  READY: 'READY',
  QUEUE: 'QUEUE',
  INCALL: 'INCALL',
  PAUSED: 'PAUSED',
  CLOSER: 'CLOSER',
  MQUEUE: 'MQUEUE'
}

export const getLiveAgentByUser = async ({ user, clients }) => {
  const sourceTable = getLiveAgentsTableName({ user, clients })
  const liveAgent = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable,
    columnName: 'user',
    columnValue: user
  })

  return liveAgent
}

export const getLiveAgentsTableName = ({ user, clients }) => {
  if (user.user_level < USER_LEVEL.SYSTEM) {
    return getLiveAgentsTableNameByClient({ clientUserName: clients[0].client_username, clientId: clients[0].client_id })
  } else {
    return 'x_live_agents_fenero_1'
  }
}

export function getLiveAgentsTableNameByClient ({ clientUserName, client_id }) {
  return `x_live_agents_${clientUserName}_${client_id}`
}

export const updateLiveAgent = async ({ liveAgent, user, clients }) => {
  const sourceTable = getLiveAgentsTableName({ liveAgent, user, clients })
  await executeUpdateQuery({
    method: 'update',
    sourceTable,
    model: LiveAgent,
    data: liveAgent
  })
}
