import ServiceBase from '../../common/serviceBase'
import { commentTopic, likeTopic } from '../helper'
import { getUserSubProfile } from './channels'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  activity_type: {
    presence: { allowEmpty: false }
  },
  data: {
    presence: { allowEmpty: false }
  }
}

export default class ForumTopicActivity extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    let activityResult
    try {
      const { user_id, activity_type, data } = this.filteredArgs
      switch (activity_type) {
        case 'reply':
          activityResult = await commentActivity({ user_id, data })
      }
    } catch (err) {
      console.log('ERR', err)
    }
    return activityResult
  }
}

export async function commentActivity ({ user_id, data }) {
  const ownerDetails = await getUserSubProfile({ user_id: user_id })
  const newComment = await commentTopic({
    comment: data.comment,
    topic_id: data.topicId,
    user_id
  })
  return {
    postId: newComment.user_activity_id,
    postMeta: {
      ownerDetails,
      createdAt: newComment.createdAt,
      updatedAt: newComment.updatedAt,
      totalLikes: 23,
      totalReplies: 56
    },
    postBody: {
      content: newComment.activity_value
    }
  }
}

export async function likeActivity ({ user_id, data }) {
  return likeTopic({
    topic_id: data.topicId,
    user_id
  })
}
