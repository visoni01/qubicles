import ServiceBase from '../../../common/serviceBase'
import { updateChannel, getOneChannel } from '../../helper'
import { ERRORS, MESSAGES } from '../../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  },
  channel_title: {
    presence: { allowEmpty: false }
  },
  channel_description: {
    presence: { allowEmpty: false }
  },
  is_public: {
    presence: { allowEmpty: false }
  },
  is_company_ann: {
    presence: { allowEmpty: false }
  }
}

export class ForumUpdateChannelService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, channel_title, channel_description, is_public, is_company_ann, channel_id } = this.filteredArgs
    const channel = await getOneChannel({ channel_id })
    if (!channel) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.CHANNEL_NOT_EXIST)
      return
    }
    if (channel.owner_id !== user_id) {
      this.addError(ERRORS.UNAUTHORIZED)
      return
    }
    await updateChannel({
      channel_id,
      channel_title,
      channel_description,
      is_public,
      is_company_ann
    })

    return {
      message: 'Channel updated successfully'
    }
  }
}
