import ServiceBase from '../../../common/serviceBase'
import { deleteChannel, getOneChannel } from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  }
}

export class ForumChannelDeleteService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, channel_id } = this.args
    const channel = await getOneChannel({ channel_id })
    if (!channel) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CHANNEL_NOT_EXIST)
      return
    }

    if (channel.owner_id !== user_id) {
      this.addError(ERRORS.UNAUTHORIZED)
      return
    }
    await deleteChannel({
      channel_id
    })
    return {
      channel_id,
      message: 'Channel deleted sucessfully!!'
    }
  }
}
