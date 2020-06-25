import ServiceBase from '../../common/serviceBase'
import {
  getUserById,
  getLiveAgentByUser,
  LIVE_AGENT_STATUS,
  getCallByCallerId,
  getLeadByLeadId,
  getListByListId
} from '../helper'
import GetClientsService from '../user/getClients'

const constraints = {
  userId: {
    presence: { allowEmpty: false }
  },
  uniqueId: {
    presence: false
  }
}

export class CheckUserStatusService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const user = await getUserById({ userId: this.userId })
    const { clients } = await GetClientsService.run({ userId: this.userId })
    const liveAgent = await getLiveAgentByUser({ user, clients })

    const statusResponse = {
      leadId: 0,
      flowId: 0,
      listId: 0,
      status: ''
    }

    if (liveAgent) {
      statusResponse.status = liveAgent.status
      statusResponse.leadId = liveAgent.lead_id

      // if we're on a lead, and did not get an API hangup/dispo, get the flow and list info
      const isValidLiveAgent = liveAgent.lead_id > 0 &&
                                (liveAgent.Status === LIVE_AGENT_STATUS.INCALL ||
                                liveAgent.Status === LIVE_AGENT_STATUS.QUEUE) &&
                                !liveAgent.external_status

      if (isValidLiveAgent) {
        // make sure this is still a live call
        const isLiveCall = liveAgent.callerid &&
                            (liveAgent.uniqueid != this.uniqueId ||
                            this.uniqueId == '0' ||
                            !this.uniqueId)
        if (isLiveCall) {
          const liveCall = await getCallByCallerId({ calledId: liveAgent.callerid })

          if (liveCall && liveCall.auto_call_id) {
            const leadData = await getLeadByLeadId({ leadId: liveAgent.lead_id })

            if (leadData && leadData.list_id > 999) {
              const leadList = await getListByListId({ listId: leadData.list_id })

              if (leadList && leadList.list_id) {
                statusResponse.flowId = leadList.flow_id
                statusResponse.listId = leadList.list_id
              }
            }
          }
        }
      }
    }

    return statusResponse
  }
}
