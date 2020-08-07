import ServiceBase from '../../../common/serviceBase'
import { getOneChannel, getChannelTopicsCount, getChannelUsersCount, getChannelModerators } from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumChannelDetailsService extends ServiceBase {
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
      const res = await getChannelDetails({ channel, totalMembers, moderators, topicsCount })
      return res
    } catch (err) {
      this.addError(ERRORS.INTERNAL)
    }
  }
}

export async function getChannelDetails ({ channel, totalMembers, moderators, topicsCount }) {
  return {
    channelId: channel.channel_id,
    channelTitle: channel.channel_title,
    channelDescription: channel.channel_description,
    totalMembers,
    topicsCount,
    moderators
  }
}
