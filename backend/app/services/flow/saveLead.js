import ServiceBase from '../../common/serviceBase'
import {
  getUserById,
  getLeadByLeadId,
  updateLead,
  updateLeadInCustomTable
} from '../helper'
import GetClientsService from '../user/getClients'
import logger from '../../common/logger'

const constraints = {
  lead: {
    presence: false
  }
}

export class SaveLeadService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if user_id and lead_id is valid or not
    if (this.lead && this.lead.user_id > 0 && this.lead.lead_id > 0) {
      const currentUser = await getUserById({ userId: this.lead.user_id })

      if (currentUser && currentUser['user_id']) {
        try {
          const { clients } = await GetClientsService.run({ userId: currentUser.user_id })

          let standardLead = await getLeadByLeadId({
            leadId: this.lead.lead_id,
            user: currentUser,
            clients
          })

          const {
            user,
            vendor_lead_code,
            source_id,
            phone_number,
            alt_phone,
            security_phrase,
            owner,
            rank
          } = this.lead

          if (standardLead && standardLead['lead_id']) {
            standardLead = {
              ...standardLead,
              user,
              vendor_lead_code,
              source_id,
              phone_number
            }

            if (this.lead.title) {
              standardLead.title = this.lead.title
            }
            if (this.lead.first_name) {
              standardLead.first_name = this.lead.first_name
            }
            if (this.lead.last_name) {
              standardLead.last_name = this.lead.last_name
            }
            if (this.lead.address1) {
              standardLead.address1 = this.lead.address1
            }
            if (this.lead.address2) {
              standardLead.address2 = this.lead.address2
            }
            if (this.lead.address3) {
              standardLead.address3 = this.lead.address3
            }
            if (this.lead.city) {
              standardLead.city = this.lead.city
            }
            if (this.lead.state) {
              standardLead.state = this.lead.state
            }
            if (this.lead.postal_code) {
              standardLead.postal_code = this.lead.postal_code
            }
            if (this.lead.country_code) {
              standardLead.country_code = this.lead.country_code
            }
            if (this.lead.gender) {
              standardLead.gender = this.lead.gender
            }
            if (this.lead.email) {
              standardLead.email = this.lead.email
            }
            if (this.lead.comments) {
              standardLead.comments = this.lead.comments
            }

            standardLead.alt_phone = alt_phone
            standardLead.security_phrase = security_phrase
            standardLead.owner = owner
            standardLead.rank = rank
            standardLead.modify_date = new Date()

            // Update Lead
            await updateLead({ lead: standardLead, user, clients })

            // Update Lead in custom table
            await updateLeadInCustomTable({ lead: this.lead })

            return standardLead
          } else {
            this.addError('InvalidLead', 'Standard Lead not found')
          }
        } catch (error) {
          logger.error(`Error in save lead service: ${error}`)
          this.addError('Error', 'Error occurred while saving lead')
        }
      } else {
        this.addError('InvalidUser', 'User is invalid')
      }
    } else {
      this.addError('InvalidUserOrLeadId', 'User or Lead Id is missing')
    }
  }
}
