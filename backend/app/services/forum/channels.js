import ServiceBase from '../../common/serviceBase'
import { getOneChannel, getAllForumUsers, getTopics, getUserDetails } from '../helper'
import { getAllUserActivities } from '../user/activity/helper'
import { ERRORS } from '../../utils/errors'

const constraints = {
  user_id: {
    presence: { allowEmpty: false }
  },
  channel_id: {
    presence: { allowEmpty: false }
  }
}

export default class ForumChannel extends ServiceBase {
  get constraints () {
    return constraints
  }

  async run () {
    const { user_id, channel_id } = this.filteredArgs
    const promises = [
      () => getOneChannel({ channel_id }),
      () => getTopics({ user_id })
    ]
    const [channel, topics] = await Promise.all(promises.map(promise => promise()))
    if (!channel) {
      this.addError(ERRORS.NOT_FOUND, `Channel with channel_id ${channel_id} does not exist`)
      return
    }
    const res = await getChannelPage({ channel, topics })
    return res
  }
}

export async function getChannelPage ({ channel, topics }) {
  const filteredTopics = getFilteredTopics({ channel_id: channel.channel_id, topics })
  const totalMembers = await getChannelUsersCount({ channel_id: channel.channel_id })
  const { channelTopics, totalTopicComments } = await getTopicsSubDetails({ topics: filteredTopics })
  const moderators = await getChannelModerators({ channel_id: channel.channel_id })
  const channelInfo = {
    channelId: channel.channel_id,
    channelTitle: channel.channel_title,
    channelDescription: channel.channel_description,
    totalMembers,
    totalReplies: totalTopicComments,
    topicsCount: filteredTopics.length,
    moderators
  }
  return { channelInfo, channelTopics }
}

export async function getChannelUsersCount ({ channel_id }) {
  const channelUsers = await getAllForumUsers({
    forum_object_type: 'channel',
    forum_object_id: channel_id
  })
  return channelUsers.length
}

export async function getUserSubProfile ({ user_id }) {
  const userDetails = await getUserDetails({ user_id })
  return {
    userId: user_id,
    userName: userDetails.first_name,
    profileImage: 'https://via.placeholder.com/150x150'
  }
}

export async function getChannelModerators ({ channel_id }) {
  const channelModerators = await getAllForumUsers({
    forum_object_type: 'channel',
    forum_object_id: channel_id,
    is_moderator: true
  })
  const userSubProfiles = await Promise.all(channelModerators.map(user => getUserSubProfile({ user_id: user.user_id })))
  return userSubProfiles
}

export function getFilteredTopics ({ topics, channel_id }) {
  return topics.filter(topic => topic.channel_id === channel_id)
}

export async function getTopicsSubDetails ({ topics }) {
  const channelTopics = []
  let totalTopicComments = 0
  for (const topic of topics) {
    const { totalReplies, dateLastReplied } = await getTopicUserActivity({ topic })
    totalTopicComments += totalReplies
    const userSubProfile = await getUserSubProfile({ user_id: topic.owner_id })
    channelTopics.push({
      topicId: topic.topic_id,
      topicTitle: topic.topic_title,
      topicOwner: userSubProfile,
      tags: topic.tags.split('&&'),
      dateCreatedOn: topic.created_on,
      totalReplies,
      dateLastReplied
    })
  }
  return { channelTopics, totalTopicComments }
}

export async function getTopicUserActivity ({ topic }) {
  const topicComments = await getAllUserActivities({
    activity_type: 'comment',
    record_type: 'topic',
    record_id: topic.topic_id
  })
  let dateLastReplied = ''
  if (topicComments.length !== 0) {
    dateLastReplied = topicComments.sort((a, b) => new Date(b.created_on) - new Date(a.created_on))[0].created_on
  }
  return {
    totalReplies: topicComments.length,
    dateLastReplied
  }
}
