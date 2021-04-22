import ServiceBase from '../../../../common/serviceBase'
import { ERRORS } from '../../../../utils/errors'
import logger from '../../../../common/logger'
import { getErrorMessageForService, getTopTalent } from '../../../helper'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export class PeopleGetTopTalentService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      const topTalentData = await getTopTalent()
      const topTalentCards = topTalentData.map(talent => {
        return {
          userId: talent.user_id,
          fullName: talent.user.full_name,
          title: talent.work_title,
          rating: talent.rating,
          profilePic: talent.profile_image
        }
      })
      return topTalentCards
    } catch (e) {
      logger.error(`${getErrorMessageForService('PeopleGetTopTalentService')} ${e}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
