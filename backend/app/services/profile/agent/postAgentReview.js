import ServiceBase from '../../../common/serviceBase'
import { ERRORS } from '../../../utils/errors'
import logger from '../../../common/logger'
import { getErrorMessageForService } from '../../helper'
import { addAgentReviewAndRating, fetchAgentRatings, fetchAgentReviews } from '../../helper/agentProfile'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  agent_user_id: {
    presence: { allowEmpty: false }
  },
  reviewData: {
    presence: { allowEmpty: false }
  }
}

export default class PostAgentReviewService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const { user_id, agent_user_id, reviewData } = this.filteredArgs
      await addAgentReviewAndRating({ user_id, agent_user_id, reviewData })

      const promises = [
        () => fetchAgentRatings({ agent_user_id }),
        () => fetchAgentReviews({ agent_user_id, type: 'recieved' })
      ]
      const [ratings, reviews] = await Promise.all(promises.map(promise => promise()))

      // WIP add review access
      return { ratings, reviews, addReviewAccess: false }
    } catch (err) {
      logger.error(`${getErrorMessageForService('PostAgentReviewService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
