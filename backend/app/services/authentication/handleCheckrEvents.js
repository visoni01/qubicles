import ServiceBase from '../../common/serviceBase'
import VerifyCheckrReportService from './verifyCheckrReport'
import logger from '../../common/logger'

const constraints = {
  id: {
    presence: { allowEmpty: false }
  },
  object: {
    presence: { allowEmpty: false }
  },
  type: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export default class HandleCheckrEventService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { type, data } = this.filteredArgs
    switch (type) {
      // Invitation Events
      case ('invitation.created'): {
        logger.info('Checkr Invitation Creation Successful')
        return 'okay'
      }
      case ('invitation.completed'): {
        logger.info('Checkr Invitation Completed Successful')
        return 'okay'
      }
      case ('invitation.expired'): {
        logger.info('Checkr Invitation Expired')
        return 'okay'
      }
      case ('invitation.deleted'): {
        return 'okay'
      }
      // Report Events
      case ('report.created'): {
        logger.info('Checkr Report Created')
        return 'okay'
      }
      case ('report.completed'): {
        logger.info('Checkr Report Completed')
        // Check Report
        const {
          ssn_trace_id,
          national_criminal_search_id,
          sex_offender_search_id,
          global_watchlist_search_id
        } = data.object
        await VerifyCheckrReportService.execute({
          ssn_trace_id,
          national_criminal_search_id,
          sex_offender_search_id,
          global_watchlist_search_id
        })
        break
      }
      case ('report.pre_adverse_action'): {
        return 'okay'
      }
    }
  }
}
