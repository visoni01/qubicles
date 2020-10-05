import ServiceBase from '../../../common/serviceBase'
import { createForumGroup, getErrorMessageForService } from '../../helper'
import logger from '../../../common/logger'
import { ERRORS } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  description: {
    presence: { allowEmpty: false }
  },
  permission: {
    presence: { allowEmpty: false }
  }
}

export class ForumCreateGroupService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, title, description, permission } = this.filteredArgs
    try {
      const newForumGroup = await createForumGroup({
        group_title: title,
        owner_id: user_id,
        group_description: description,
        permission: permission
      })

      return {
        message: 'Forum Group created Successfully',
        data: newForumGroup
      }
    } catch (err) {
      logger.error(getErrorMessageForService('ForumCreateGroupService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
