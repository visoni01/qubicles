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
  },
  tags: {
    presence: { allowEmpty: true }
  }
}

export default class ForumUpdateTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { title, is_public, topic_description, topic_id, tags } = this.args
    let tagsString
    tags && tags.forEach((tag) => {
      tagsString = tagsString ? `${tagsString}&&${tag}` : tag
    })

    const data = await updateTopic({
      topic_id,
      topic_title: title,
      topic_description,
      is_public,
      tags: tagsString || ''
    })
    return data
  }
}
