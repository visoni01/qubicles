import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { createNewGroup, addNewMembers, getErrorMessageForService } from '../../helper'

const constraints = {
  user_ids: {
    presence: { allowEmpty: false }
  },
  group_title: {
    presence: { allowEmpty: true }
  }
}

export class ChatCreateNewGroupService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_ids, group_title } = this.filteredArgs

      const group = await createNewGroup({ group_title })

      if (group) {
        const { conversation_id } = group

        await addNewMembers({ conversation_id, user_ids })

        return conversation_id
      }
    } catch (e) {
      logger.error(getErrorMessageForService('ChatCreateNewGroupService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
