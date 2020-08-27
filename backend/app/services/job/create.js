import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { getErrorMessageForService, addJob, getClientIdByUserId } from '../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  category_id: {
    presence: { allowEmpty: false }
  },
  position_id: {
    presence: { allowEmpty: false }
  },
  job_type: {
    presence: { allowEmpty: true }
  },
  employment_type: {
    presence: { allowEmpty: true }
  },
  duration_type: {
    presence: { allowEmpty: true }
  },
  experience_type: {
    presence: { allowEmpty: true }
  },
  location_type: {
    presence: { allowEmpty: true }
  },
  title: {
    presence: { allowEmpty: false }
  },
  description: {
    presence: { allowEmpty: true }
  },
  city: {
    presence: { allowEmpty: true }
  },
  state: {
    presence: { allowEmpty: true }
  },
  country: {
    presence: { allowEmpty: true }
  }
}

export default class PeopleAddJobService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, ...payload } = this.filteredArgs
      const { client_id } = await getClientIdByUserId({ user_id: this.user_id })
      const newJob = await addJob({ client_id, user_id, ...payload })
      return newJob
    } catch (err) {
      logger.error(getErrorMessageForService('ForumAddJobService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
