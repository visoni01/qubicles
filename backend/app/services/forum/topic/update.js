import ServiceBase from '../../../common/serviceBase'
import { updateTopic } from '../../helper'

const constraints = {
  title: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  },
  topic_description: {
    presence: { allowEmpty: true }
  },
  is_public: {
    presence: { allowEmpty: true }
  }
}

export default class ForumUpdateTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { title, is_public, topic_description, topic_id } = this.args
    const data = await updateTopic({
      topic_id,
      topic_title: title,
      topic_description,
      is_public
    })
    return data
  }
}
