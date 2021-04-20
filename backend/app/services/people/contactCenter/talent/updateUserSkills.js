import logger from '../../../../common/logger'
import ServiceBase from '../../../../common/serviceBase'
import { ERRORS } from '../../../../utils/errors'
import { getErrorMessageForService } from '../../../helper'
import { updateUserSkills } from '../../../helper/people'

const constraints = {
  candidate_id: {
    presence: { allowEmpty: false }
  },
  updatedData: {
    presence: { allowEmpty: true }
  },
  updatedDataType: {
    presence: { allowEmpty: false }
  }
}

export class PeopleUpdateUserSkillsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { candidate_id, updatedData, updatedDataType } = this.filteredArgs

    try {
      if (updatedDataType === 'Skills') {
        const userSkills = await updateUserSkills({ candidate_id, updatedData })
        return userSkills
      }
    } catch (err) {
      logger.error(`${getErrorMessageForService('PeopleUpdateUserSkillsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
