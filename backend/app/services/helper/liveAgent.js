import { USER_LEVEL } from '../../services/user/getSecurityContext'
import { executeSelectQuery } from '../../utils/queryManager'

export async function getLiveAgentByUser ({ user, clients }) {
  const sourceTable = getLiveAgentsTableName({ user, clients })
  const liveAgent = await executeSelectQuery({
    method: 'getDataByColumnName',
    sourceTable,
    columnName: 'user',
    columnValue: user
  })

  return liveAgent
}

export function getLiveAgentsTableName ({ user, clients }) {
  if (user.user_level < USER_LEVEL.SYSTEM) {
    return getLiveAgentsTableNameByClient({ clientUserName: clients[0].client_username, clientId: clients[0].client_id })
  } else {
    return 'x_live_agents_fenero_1'
  }
}

export function getLiveAgentsTableNameByClient ({ clientUserName, clientId }) {
  return `x_live_agents_${clientUserName}_${clientId}`
}
