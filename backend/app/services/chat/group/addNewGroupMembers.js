import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import _ from 'lodash'
import { fetchAllGroupMembers, addNewMembers, changeGroupMembersStatus, getErrorMessageForService } from '../../helper'

const constraints = {
  conversation_id: {
    presence: { allowEmpty: false }
  },
  user_ids: {
    presence: { allowEmpty: false }
  }
}

export class ChatAddNewGroupMembersService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { conversation_id, user_ids } = this.filteredArgs

      const groupMembersIds = await fetchAllGroupMembers({ conversation_id })

      if (groupMembersIds && groupMembersIds.length) {
        const newDataToBeAdded = _.difference(user_ids, groupMembersIds)
        const dataToBeUpdated = _.intersection(user_ids, groupMembersIds)

        await addNewMembers({ conversation_id, user_ids: newDataToBeAdded })
        await changeGroupMembersStatus({
          conversation_id,
          user_ids: dataToBeUpdated,
          is_removed: false
        })
      }
    } catch (e) {
      logger.error(getErrorMessageForService('ChatAddNewGroupMembersService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
