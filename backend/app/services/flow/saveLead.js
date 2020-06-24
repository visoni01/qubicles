import ServiceBase from '../../common/serviceBase'
import {
  getUserById,
  getListByLeadId,
  updateList,
  updateLeadInCustomTable
} from '../helper'
import GetClientsService from '../user/getClients'
import logger from '../../common/logger'

const constraints = {
  user_id: {
    presence: false
  },
  user: {
    presence: false
  },
  lead_id: {
    presence: false
  },
  vendor_lead_code: {
    presence: false
  },
  source_id: {
    presence: false
  },
  phone_number: {
    presence: false
  },
  alt_phone: {
    presence: false
  },
  security_phrase: {
    presence: false
  },
  owner: {
    presence: false
  },
  rank: {
    presence: false
  },
  title: {
    presence: false
  },
  first_name: {
    presence: false
  },
  last_name: {
    presence: false
  },
  address1: {
    presence: false
  },
  address2: {
    presence: false
  },
  address3: {
    presence: false
  },
  city: {
    presence: false
  },
  state: {
    presence: false
  },
  postal_code: {
    presence: false
  },
  country_code: {
    presence: false
  },
  gender: {
    presence: false
  },
  email: {
    presence: false
  },
  comments: {
    presence: false
  }
}

export class SaveLeadService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    // Check if user_id and lead_id is valid or not
    if (this.user_id > 0 && this.lead_id > 0) {
      const currentUser = await getUserById({ userId: this.user_id })

      if (currentUser && currentUser['user_id']) {
        try {
          const { clients } = await GetClientsService.run({ userId: currentUser.user_id })

          let standardLead = await getListByLeadId({
            leadId: this.lead_id,
            user: currentUser.user_id,
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
          } = this.args

          if (standardLead && standardLead['lead_id']) {
            standardLead = {
              ...standardLead,
              user,
              vendor_lead_code,
              source_id,
              phone_number
            }

            if (this.title) {
              standardLead.title = this.title
            }
            if (this.first_name) {
              standardLead.first_name = this.first_name
            }
            if (this.last_name) {
              standardLead.last_name = this.last_name
            }
            if (this.address1) {
              standardLead.address1 = this.address1
            }
            if (this.address2) {
              standardLead.address2 = this.address2
            }
            if (this.address3) {
              standardLead.address3 = this.address3
            }
            if (this.city) {
              standardLead.city = this.city
            }
            if (this.state) {
              standardLead.state = this.state
            }
            if (this.postal_code) {
              standardLead.postal_code = this.postal_code
            }
            if (this.country_code) {
              standardLead.country_code = this.country_code
            }
            if (this.gender) {
              standardLead.gender = this.gender
            }
            if (this.email) {
              standardLead.email = this.email
            }
            if (this.comments) {
              standardLead.comments = this.comments
            }

            standardLead.alt_phone = alt_phone
            standardLead.security_phrase = security_phrase
            standardLead.owner = owner
            standardLead.rank = rank
            standardLead.modify_date = new Date()

            // Update List
            await updateList({ list: standardLead, user, clients })

            // Update Lead in custom table
            await updateLeadInCustomTable({ lead: this.args })

            return standardLead
          } else {
            this.addError('InvalidLead', 'Standard Lead not found')
          }
        } catch (error) {
          logger.error(`Error in save lead service: ${error}`)
          this.addError('Error', 'Error occuring while processing this request!')
        }
      } else {
        this.addError('InvalidUser', 'User is invalid')
      }
    } else {
      this.addError('InvalidUserOrLeadId', 'User or Lead Id is missing')
    }
  }
}
