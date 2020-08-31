import ServiceBase from '../../common/serviceBase'
import { ERRORS } from '../../utils/errors'
import logger from '../../common/logger'
import { getErrorMessageForService, updateJob } from '../helper'

const constraints = {
  job_id: {
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

export default class UpdateJobService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const updatedJob = await updateJob(this.args)
      return updatedJob
    } catch (err) {
      logger.error(getErrorMessageForService('ForumAddJobService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
