import ServiceBase from '../../common/serviceBase'
import { XUserActivity } from '../../db/models'
import logger from '../../common/logger'
import {
  getErrorMessageForService,
  checkVisibility,
  getUserById, isUserLikedPost, getStatusLikesCount,
  getStatusCommentsCount
} from '../helper'
import { ERRORS } from '../../utils/errors'
import _ from 'lodash'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  }
}

export default class GellAllPostStatusListService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    try {
      let statusList = await XUserActivity.findAll({
        where: {
          record_id: 0,
          record_type: 'activity',
          activity_type: 'status',
          is_deleted: false
        },
        order: [['created_on', 'DESC']],
        raw: true
      })

      statusList = await Promise.all(statusList.map(async (data) => {
        const isValidUser = await checkVisibility({
          activity_permission: data.activity_permission,
          user_id: this.user_id,
          owner_id: data.user_id
        })

        if (isValidUser) {
          const user = await getUserById({ user_id: data.user_id })
          data['owner'] = user.full_name
          data['likesCount'] = await getStatusLikesCount({ record_id: data.user_activity_id })
          data['isPostLiked'] = await isUserLikedPost({ user_id: this.user_id, user_activity_id: data.user_activity_id })
          data['commentsCount'] = await getStatusCommentsCount({ record_id: data.user_activity_id })
          return data
        } else {
          return false
        }
      }))

      return _.compact(statusList)
    } catch (e) {
      logger.error(getErrorMessageForService('GellAllPostStatusListService'), e)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
