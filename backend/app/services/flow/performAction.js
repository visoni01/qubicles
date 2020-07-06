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
  updateInboundLog,
  getFirstElement,
  getLeadByPhone,
  addListLead,
  getListByListId,
  getCampaignStatusesByCampaignId,
  addLeadToCustomTable,
  updateLeadInCustomTable,
  getEditableFlowFieldsByFlowId
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

          if (!!this.goToPause) {
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
            const lastOBLogs = await getContactOutboundCallLog({
              lead_id: lead.lead_id,
              startDate: callStart,
              endDate: callEnd,
              user,
              clients,
              client_id: currentClientId,
              campaigns,
              lists
            })

            const OBLog = getFirstElement(lastOBLogs)

            if (OBLog) {
              OBLog.status = this.value
              await updateOutboundLog({ log: OBLog, user, clients })
            }

            const lastIBLogs = await getContactInboundCallLog({
              lead_id: lead.lead_id,
              startDate: callStart,
              endDate: callEnd,
              user,
              clients,
              client_id: currentClientId,
              campaigns,
              lists
            })

            const IBLog = getFirstElement(lastIBLogs)

            if (IBLog) {
              IBLog.status = this.value
              await updateInboundLog({ log: IBLog, user, clients })
            }
          }
        }
        break
      }

      case 'ENDCALL': {
        const liveAgent = await getLiveAgentByUser({ user, clients })
        if (liveAgent) {
          liveAgent.external_hangup = this.value
          await updateLiveAgent({ liveAgent })
        }
        break
      }

      case 'SENDDTMF': {
        const liveAgent = await getLiveAgentByUser({ user, clients })
        if (liveAgent) {
          liveAgent.external_dtmf = this.value
          await updateLiveAgent({ liveAgent, user, clients })
        }
        break
      }

      case 'HANGUP_XFER':
      case 'HANGUP_BOTH':
      case 'LEAVE_3WAY_CALL': {
        const liveAgent = await getLiveAgentByUser({ user, clients })
        if (liveAgent) {
          liveAgent.external_transferconf = `${this.action}------------`
          await updateLiveAgent({ liveAgent, user, clients })
        }
        break
      }

      case 'XFERCALL': {
        const liveAgent = await getLiveAgentByUser({ user, clients })
        if (liveAgent) {
          const xferOpts = this.value && this.value.split('~')
          switch (xferOpts[0]) {
            case 'BlindXfer':
              xferOpts[0] = 'BLIND_TRANSFER'
              break
            case 'InternalXfer':
              xferOpts[0] = 'LOCAL_CLOSER'
              break
            case 'WarmXfer':
              xferOpts[0] = 'DIAL_WITH_CUSTOMER'
              break
            case 'HoldDialXfer':
              xferOpts[0] = 'PARK_CUSTOMER_DIAL'
              break
          }

          liveAgent.external_transferconf = `${xferOpts[0]}---${xferOpts[2]}---${xferOpts[1]}---NO---`
          await updateLiveAgent({ liveAgent, user, clients })
        }
        break
      }

      case 'NEWLEAD': {
        const existingLeadId = parseInt(this.value)
        if (existingLeadId > 0) {
          // get our current lead
          let lead = await getLeadByLeadId({ lead_id: existingLeadId, user, clients })
          if (lead) {
            // find matching phone numbers
            const records = await getLeadByPhone({ phone_number: lead.phone_number, user, clients })

            const allRecords = []
            const noCurrentLeadRecords = []

            // The below loop is used for optimizing the re-iteration
            // https://github.com/qubicles/manager/blob/master/FC2.Web/Controllers/FlowController.cs#L728
            // https://github.com/qubicles/manager/blob/master/FC2.Web/Controllers/FlowController.cs#L738
            // https://github.com/qubicles/manager/blob/master/FC2.Web/Controllers/FlowController.cs#L753

            records.forEach((record) => {
              if (record.list_id === lead.list_id) {
                allRecords.push(record)
                // do we have any other records that doesn't match the current lead?
                if (record.lead_id !== lead.lead_id) {
                  noCurrentLeadRecords.push(record)
                }
              }
            })

            // find the campaign associated with the list
            const leadList = await getListByListId({ list_id: lead.list_id })
            let isNewLead = true

            if (leadList) {
              if (noCurrentLeadRecords.length > 0) {
                // get our list of non-finalized dispositions and match the leads against those
                const callableStatuses = await getCampaignStatusesByCampaignId({ campaign_id: leadList.campaign_id })
                  .filter(campaign => (!campaign.category || campaign.category === 'UNDEFINED') && campaign.unworkable === 'N')
                  .map((s) => s.status)

                // add system NEW as callable
                callableStatuses.push('NEW')
                callableStatuses.push('AA')
                callableStatuses.push('A')
                callableStatuses.push('NA')
                callableStatuses.push('N')

                // do we have one of these leads in a call-able disposition status?
                const callableLead = this.findCallableLead(noCurrentLeadRecords, callableStatuses)

                if (callableLead) {
                  isNewLead = false
                  lead = callableLead
                }
              }

              const customLead = this.leadData

              if (isNewLead) {
                // save our new lead, copying standard data as well
                if (!lead.vendor_lead_code) {
                  lead.vendor_lead_code = ''
                }

                lead.vendor_lead_code = `${lead.vendor_lead_code}_2`

                lead.lead_id = 0
                lead.entry_date = new Date()
                lead.modify_date = new Date()
                await addListLead({ lead, user, clients, client_id: currentClientId })

                // save custom data to new lead's record
                await addLeadToCustomTable({ list_id: lead.list_id, lead_id: lead.lead_id })
              }

              customLead['lead_id'] = lead.lead_id

              // system contact fields supported for creating new contacts
              const spokeToFirstName = 'SpokeToFirstName'
              const spokeToLastName = 'SpokeToLastName'
              const spokeToTitle = 'SpokeToTitle'
              const ogFirstName = 'og_fname'
              const ogLastName = 'og_lname'
              const ogTitle = 'og_title'
              const firstName = 'FirstName'
              const lastName = 'LastName'
              const title = 'Title'
              const fName = 'fname'
              const lName = 'lname'
              const lCTitle = 'title'
              const newFirstName = 'NewFirstName'
              const newLastName = 'NewLastName'
              const newTitle = 'NewTitle'

              // change some fields, if present, to indicate second lead
              // any spoke tos?
              if (_.has(customLead, spokeToFirstName)) {
                let newValue = customLead[spokeToFirstName]
                if (_.has(customLead, firstName)) {
                  newValue = customLead[firstName]
                } else if (_.has(customLead, fName)) {
                  newValue = customLead[fName]
                }

                customLead[spokeToFirstName] = newValue
              }

              if (_.has(customLead, spokeToLastName)) {
                let newValue = customLead[spokeToLastName]
                if (_.has(customLead, lastName)) {
                  newValue = customLead[lastName]
                } else if (_.has(customLead, lName)) {
                  newValue = customLead[lName]
                }

                customLead[spokeToLastName] = newValue
              }

              if (_.has(customLead, spokeToTitle)) {
                let newValue = customLead[spokeToTitle]
                if (_.has(customLead, title)) {
                  newValue = customLead[title]
                } else if (_.has(customLead, lCTitle)) {
                  newValue = customLead[lCTitle]
                }

                customLead[spokeToTitle] = newValue
              }

              if (_.has(customLead, ogFirstName)) {
                let newValue = customLead[ogFirstName]
                if (_.has(customLead, firstName)) {
                  newValue = customLead[firstName]
                } else if (_.has(customLead, fName)) {
                  newValue = customLead[fName]
                }

                customLead[ogFirstName] = newValue
              }

              if (_.has(customLead, ogLastName)) {
                let newValue = customLead[ogLastName]
                if (_.has(customLead, lastName)) {
                  newValue = customLead[lastName]
                } else if (_.has(customLead, lName)) {
                  newValue = customLead[lName]
                }

                customLead[ogLastName] = newValue
              }

              if (_.has(customLead, ogTitle)) {
                let newValue = customLead[ogTitle]
                if (_.has(customLead, title)) {
                  newValue = customLead[title]
                } else if (_.has(customLead, lCTitle)) {
                  newValue = customLead[lCTitle]
                }

                customLead[ogTitle] = newValue
              }

              // clear out
              if (_.has(customLead, firstName)) {
                customLead[firstName] = ''
              }

              if (_.has(customLead, lastName)) {
                customLead[lastName] = ''
              }

              if (_.has(customLead, title)) {
                customLead[title] = ''
              }

              if (_.has(customLead, fName)) {
                customLead[fName] = ''
              }

              if (_.has(customLead, lName)) {
                customLead[lName] = ''
              }

              if (_.has(customLead, lCTitle)) {
                customLead[lCTitle] = ''
              }

              if (_.has(customLead, newFirstName)) {
                customLead[newFirstName] = ''
              }

              if (_.has(customLead, newLastName)) {
                customLead[newLastName] = ''
              }

              if (_.has(customLead, newTitle)) {
                customLead[newTitle] = ''
              }

              // let's clear any data that isn't set to copy on existing contact
              const flowFields = await getEditableFlowFieldsByFlowId({ flow_id: leadList.flow_id })
              flowFields.forEach((field) => {
                // we use the unused goto_field to track whether to
                // copy on Repeat Contact to avoid recreating table structure
                if (!(field.goto_field === 'True')) {
                  if (_.has(customLead, field.field_label)) {
                    customLead[field.field_label] = ''
                  }
                }
              })

              await updateLeadInCustomTable({ lead: customLead })

              return {
                leadId: lead.lead_id,
                isNewLead
              }
            }
          }
        }

        break
      }

      // TODO: In progress
    }
  }

  isValidLead (lead) {
    return _.has(lead, 'sys_repeat_new') && _.has(lead, 'sys_repeat_existing')
  }

  findCallableLead (noCurrentLeadRecords, callableStatuses) {
    return noCurrentLeadRecords.find((record) => callableStatuses.includes(record.status))
  }
}
