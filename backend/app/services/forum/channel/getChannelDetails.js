import ServiceBase from '../../../common/serviceBase'
import {
  getOneChannel,
  getChannelTopicsCount,
  getChannelUsersCount,
  getChannelModerators,
  getErrorMessageForService
} from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'
import logger from '../../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumChannelDetailsService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { channel_id } = this.filteredArgs
    const channel = await getOneChannel({ channel_id })
    const promises = [
      () => getChannelUsersCount({ channel_id: channel.channel_id }),
      () => getChannelModerators({ channel_id: channel.channel_id }),
      () => getChannelTopicsCount({ channel_id: channel.channel_id })
    ]
    const [totalMembers, moderators, topicsCount] = await Promise.all(promises.map(promise => promise()))
    if (!channel) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CHANNEL_NOT_EXIST)
      return
    }
    try {
      const res = {
        channelId: channel.channel_id,
        channelTitle: channel.channel_title,
        channelDescription: channel.channel_description,
        totalMembers,
        topicsCount,
        moderators
      }
      return res
    } catch (err) {
      logger.error(`${getErrorMessageForService('ForumChannelDetailsService')} ${err}`)
      this.addError(ERRORS.INTERNAL)
    }
  }
}
