import { LiveAgent } from '../../db/models'

export async function getLiveAgentByUser ({ user }) {
  const liveAgent = await LiveAgent.findOne({ where: { user: user }, raw: true })
  return liveAgent
}
