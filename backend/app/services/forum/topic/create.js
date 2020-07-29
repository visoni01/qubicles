import ServiceBase from '../../../common/serviceBase'
import { addTopic } from '../../helper'
import { XClientUser } from '../../../db/models'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  title: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  },
  is_public: {
    presence: { allowEmpty: true }
  },
  is_flagged: {
    presence: { allowEmpty: true }
  }
}

export default class ForumAddNewTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, title, is_public, channel_id, is_flagged } = this.args
    const { client_id } = await XClientUser.findOne({ where: { user_id }, raw: true, attributes: ['client_id'] })

    const data = await addTopic({
      topic_title: title,
      owner_id: user_id,
      is_public,
      channel_id,
      is_flagged,
      client_id
    })
    return data
  }
}
