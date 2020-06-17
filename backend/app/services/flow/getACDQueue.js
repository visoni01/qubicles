import ServiceBase from '../../common/serviceBase'
import { getLiveAgentByUser, getXferInboundGroups, getInboundGroupsByUser } from '../helper'
import GetSecurityContextService from '../user/getSecurityContext'
import _ from 'lodash'

const constraints = {
  user: {
    presence: { allowEmpty: false }
  }
}

export class GetACDQueueService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let queues = []
    const { clientIngroups, currentClientId, clients } = await GetSecurityContextService.run({ user: this.user })
    const liveAgentData = await getLiveAgentByUser({ user: this.user.user, clients })

    if (liveAgentData) {
      queues = await getXferInboundGroups({ campaignId: liveAgentData.campaign_id, clientIngroups })
    } else {
      queues = await getInboundGroupsByUser({ user: this.user, clientId: currentClientId, clientIngroups })
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
