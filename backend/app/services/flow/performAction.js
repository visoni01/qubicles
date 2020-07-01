import ServiceBase from '../../common/serviceBase'
import {
  getUserById,
  getLiveAgentByUser,
  updateLiveAgent,
  getFlowPageByPageId,
  getLeadByLeadId,
  updateLead,
  getLeadCustomData,
  deleteLead,
  deleteLeadCustomData,
  getCampaigns,
  getLists,
  getContactOutboundCallLog,
  updateOutboundLog,
  getContactInboundCallLog,
  updateInboundLog
} from '../helper'

import getSecurityContext from '../user/getSecurityContext'
import moment from 'moment'
import _ from 'lodash'

const constraints = {
  userId: {
    presence: { allowEmpty: false }
  },
  action: {
    presence: { allowEmpty: false }
  },
  value: {
    presence: false
  },
  leadData: {
    presence: false
  },
  leadId: {
    presence: false
  },
  pageId: {
    presence: false
  },
  goToPause: {
    presence: false
  }
}

export class PerformActionService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Get User by userId
    const user = await getUserById({ user_id: this.userId })
    const { clients, currentClientId } = await getSecurityContext.run({ user })

    switch (this.action) {
      case 'DISPOSITION': {
        const liveAgent = await getLiveAgentByUser({ user, clients })
        if (liveAgent) {
          liveAgent.external_hangup = '1'
          liveAgent.external_status = this.value
          liveAgent.external_timer_action_destination = 'Flow'

          if (this.goToPause) {
            liveAgent.external_pause = 'PAUSE'
          }

          await updateLiveAgent({ liveAgent, user, clients })

          // if this was a repeat contact, need to also dispo it as as default dispo sdr set on page
          if (this.leadId && this.pageId) {
            const page = await getFlowPageByPageId({ page_id: this.pageId })
            const lead = await getLeadByLeadId({ lead_id: this.leadId })
            const customLead = await getLeadCustomData({ list_id: lead.list_id, lead_id: lead.lead_id })

            if (this.isValidLead(customLead)) {
              const sysRepeatNew = customLead['sys_repeat_new']
              const sysRepeatExisting = customLead['sys_repeat_existing']

              if (sysRepeatNew === 'true' || sysRepeatExisting === 'true') {
                lead.status = page.default_disposition_sdr
                lead.modify_date = new Date()
                await updateLead({ lead, user, clients })
              }
            }
          } else if (this.leadId) {
            // if this was a repeat contact and we got here, this is not a valid SDR...delete it
            const lead = await getLeadByLeadId({ lead_id: this.leadId })
            const customLead = await getLeadCustomData({ list_id: lead.list_id, lead_id: lead.lead_id })

            if (this.isValidLead(customLead)) {
              const sysRepeatNew = customLead['sys_repeat_new']
              const sysRepeatExisting = customLead['sys_repeat_existing']

              if (sysRepeatNew === 'true' || sysRepeatExisting === 'true') {
                await deleteLead({ lead, user, clients })
                if (sysRepeatNew === 'true') {
                  await deleteLeadCustomData({ list_id: lead.list_id, lead_id: lead.lead_id })
                }
              }
            }
          } else if (this.leadId && this.value) {
            const lead = await getLeadByLeadId({ lead_id: this.leadId, user, clients })
            if (lead) {
              lead.status = this.value
              lead.modify_date = new Date()
              await updateLead({ lead })

              // full day's range from last call time to make sure we update the very last call log(s) for this lead
              const callStart = moment(lead.last_local_call_time.Value).add(-1, 'day')
              const callEnd = moment(lead.last_local_call_time.Value).add(1, 'day')

              // Since in both the below methods i.e getContactOutboundCallLog
              // & getContactInboundCallLog we need campaigns and lists.
              // So for reducing the database query fetching, we're fetching the
              // respective details in the service.

              const campaigns = await getCampaigns({ user, clients, client_id: currentClientId })
              const lists = await getLists({ campaigns })

              // change the disposition on the call logs (in/out) as well
              const lastOBLog = await getContactOutboundCallLog({
                lead_id: lead.lead_id,
                startDate: callStart,
                endDate: callEnd,
                user,
                clients,
                clientId: currentClientId,
                campaigns,
                lists
              })

              if (lastOBLog) {
                lastOBLog.status = this.value
                await updateOutboundLog({ lastOBLog, user, clients })
              }

              const lastIBLog = await getContactInboundCallLog({
                lead_id: lead.lead_id,
                startDate: callStart,
                endDate: callEnd,
                user,
                clients,
                clientId: currentClientId,
                campaigns,
                lists
              })

              if (lastIBLog) {
                lastIBLog.status = this.value
                await updateInboundLog({ lastIBLog, user, clients })
              }
            }
          }
        }
        break
      }
    }
  }

  isValidLead (lead) {
    return _.has(lead, 'sys_repeat_new') && _.has(lead, 'sys_repeat_existing')
  }
}
