import ServiceBase from '../../common/serviceBase'
import { getOneTopic, getTopicComments, getTopicLikesCount } from '../helper'
import { getUserSubProfile } from './channels'
import { ERRORS } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumTopic extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { topic_id } = this.filteredArgs
    const promises = [
      () => getOneTopic({ topic_id }),
      () => getTopicComments({ topic_id }),
      () => getTopicLikesCount({ topic_id })
    ]
    try {
      const [topicData, topicComments, totalLikes] = await Promise.all(promises.map(promise => promise()))
      const topicDetails = await getTopicDetails({ topicData, topicComments, totalLikes })
      return topicDetails
    } catch (err) {
      this.addError(ERRORS.NOT_FOUND)
    }
  }
}

export async function getTopicDetails ({ topicData, topicComments, totalLikes }) {
  const topicOwner = await getUserSubProfile({ user_id: topicData.owner_id })
  const posts = await Promise.all(topicComments.map(comment => getCommentDetails({ comment })))
  return {
    topicId: topicData.topic_id,
    topicTitle: topicData.topic_title,
    createdAt: {
      date: topicData.createdAt,
      ownerDetails: topicOwner
    },
    totalReplies: topicComments.length,
    totalViews: topicData.views,
    totalLikes,
    moderators: [],
    posts
  }
}

export async function getCommentDetails ({ comment }) {
  const ownerDetails = await getUserSubProfile({ user_id: comment.user_id })
  return {
    postId: comment.user_activity_id,
    postMeta: {
      ownerDetails,
      createdAt: comment.createdAt,
      updatedAt: comment.updatedAt,
      totalLikes: 23,
      totalReplies: 56
    },
    postBody: {
      content: comment.activity_value
    }
  }
}
