import ServiceBase from '../../../../common/serviceBase'
import { ERRORS } from '../../../../utils/errors'
import logger from '../../../../common/logger'
import { getErrorMessageForService, addJob, getClientIdByUserId, getClientData } from '../../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  category_id: {
    presence: { allowEmpty: false }
  },
  job_type: {
    presence: { allowEmpty: true }
  },
  duration_type: {
    presence: { allowEmpty: true }
  },
  duration_months: {
    presence: { allowEmpty: true }
  },
  experience_type: {
    presence: { allowEmpty: true }
  },
  title: {
    presence: { allowEmpty: false }
  },
  description: {
    presence: { allowEmpty: false }
  },
  needed: {
    presence: { allowEmpty: false }
  },
  required_courses: {
    presence: { allowEmpty: false }
  },
  bonus_courses: {
    presence: { allowEmpty: true }
  },
  required_skills: {
    presence: { allowEmpty: true }
  },
  bonus_skills: {
    presence: { allowEmpty: true }
  },
  pay_amount: {
    presence: { allowEmpty: false }
  },
  languages: {
    presence: { allowEmpty: true }
  },
  status: {
    presence: { allowEmpty: true }
  }
}

export default class PeopleAddNewJobService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, ...payload } = this.filteredArgs
      const { client_id } = await getClientIdByUserId({ user_id: this.user_id })
      const { city, state } = await getClientData({ client_id })
      const newJob = await addJob({ client_id, user_id, city, state, ...payload })
      return newJob
    } catch (err) {
      logger.error(`${getErrorMessageForService('PeopleAddNewJobService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
