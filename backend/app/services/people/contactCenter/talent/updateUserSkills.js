import logger from '../../../../common/logger'
import ServiceBase from '../../../../common/serviceBase'
import { ERRORS } from '../../../../utils/errors'
import { getErrorMessageForService } from '../../../helper'
import { updateUserSkills, addUserEndorsement, removeUserEndorsement } from '../../../helper/people'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
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
    const { user_id, candidate_id, updatedData, updatedDataType } = this.filteredArgs

    try {
      if (updatedDataType === 'Skills') {
        const userSkills = await updateUserSkills({ user_id, candidate_id, updatedData })
        return userSkills
      } else if (updatedDataType === 'AddEndorse') {
        await addUserEndorsement({ user_id, candidate_id, updatedData })
      } else if (updatedDataType === 'RemoveEndorse') {
        await removeUserEndorsement({ user_id, candidate_id, updatedData })
      }
    } catch (err) {
      logger.error(`${getErrorMessageForService('PeopleUpdateUserSkillsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
