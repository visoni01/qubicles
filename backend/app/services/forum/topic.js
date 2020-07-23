import ServiceBase from '../../common/serviceBase'
import { getOneTopic, getTopicComments, getTopicLikesCount, getErrorMessageForService, updateTopicViews } from '../helper'
import { getUserSubProfile } from './channels'
import { ERRORS, MESSAGES } from '../../utils/errors'
import logger from '../../common/logger'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  topic_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumTopicService extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { topic_id } = this.filteredArgs
    const topicData = await getOneTopic({ topic_id })
    if (!topicData) {
      this.addError(ERRORS.NOT_FOUND, MESSAGES.TOPIC_NOT_EXIST)
      return
    }
    const promises = [
      () => updateTopicViews({ topic_id, currentViews: topicData.views }),
      () => getTopicComments({ topic_id }),
      () => getTopicLikesCount({ topic_id })
    ]
    try {
      const [totalViews, topicComments, totalLikes] = await Promise.all(promises.map(promise => promise()))
      const topicDetails = await getTopicDetails({ topicData, topicComments, totalLikes, totalViews })
      return topicDetails
    } catch (err) {
      logger.error(getErrorMessageForService('ForumTopicService'), err)
      this.addError(ERRORS.INTERNAL)
    }
  }
}

export async function getTopicDetails ({ topicData, topicComments, totalLikes, totalViews }) {
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
    totalViews,
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
