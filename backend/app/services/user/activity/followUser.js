import ServiceBase from '../../../common/serviceBase'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'
import { followOrUnfollowUser, getErrorMessageForService } from '../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  following_id: {
    presence: { allowEmpty: false }
  },
  userCode: {
    presence: { allowEmpty: false }
  }
}

export class UserFollowService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { following_id, user_id, userCode } = this.filteredArgs
      const followFlag = await followOrUnfollowUser({ following_id, follower_id: user_id, userCode })

      if (!followFlag) {
        this.addError(ERRORS.NOT_FOUND, MESSAGES.CANNOT_FOLLOW)
      }

      return followFlag
    } catch (e) {
      logger.error(getErrorMessageForService('UserFollowService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
