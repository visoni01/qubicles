import ServiceBase from '../../common/serviceBase'
import { getLiveAgentByUser, getXferInboundGroups, getInboundGroupsByUser } from '../helper'
import GetSecurityContextService from '../user/getSecurityContext'
import _ from 'lodash'

const constraints = {
  user: {
    presence: { allowEmpty: false }
  }
}

export class GetACDQueuesService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let queues = []
    const liveAgentData = await getLiveAgentByUser({ user: this.user.user })
    const { clientIngroups: clientInboundGroups, currentClientId: clientId } = await GetSecurityContextService.run({ user: this.user })

    if (liveAgentData) {
      queues = await getXferInboundGroups({ compaignId: liveAgentData.campaign_id, clientInboundGroups })
    } else {
      queues = await getInboundGroupsByUser({ user: this.user, clientId, clientInboundGroups })
    }

    queues = queues.map((queueData) => {
      return {
        group_id: queueData['group_id'], 
        group_name: queueData['group_name'] 
      }
    })

    const sortedQueue = _.orderBy(queues, 'group_name', 'asc')

    return sortedQueue
  }
}
