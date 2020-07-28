import {
  XForumCategory,
  XForumTopic,
  XForumChannel,
  XForumUser,
  XUserNotification,
  UserDetail,
  User,
  XClientUser,
  XUserActivity,
  XQodApplication
} from '../../db/models'
import { Op } from 'sequelize'
import config from '../../../config/app'
import SendForumInvitationMail from '../email/sendForumInvitationMail'
import { createNewEntity } from './common'
import { getAllUserActivities } from '../user/activity/helper'
import { getUserDetails } from './user'

export async function addCategory ({ category_title, owner_id, is_public }) {
  const newCategory = await createNewEntity({
    model: XForumCategory,
    data: {
      category_title,
      owner_id,
      is_public
    }
  })
  return newCategory
}

export async function addTopic ({ topic_title, owner_id, channel_id, client_id, is_public, is_flagged }) {
  const newTopic = await createNewEntity({
    model: XForumTopic,
    data: {
      topic_title,
      owner_id,
      channel_id,
      is_public,
      is_flagged
    }
  })
  const announcementChannel = await getCompanyAnnouncementChannel({ client_id })
  if (announcementChannel.channel_id === channel_id) {
    const userIds = new Set()
    const clientUsers = await XClientUser.findAll({ where: { client_id }, raw: true, attributes: ['user_id'] })
    clientUsers.map(user => userIds.add(user.user_id))

    const activeJobs = await XQodApplication.findAll({ where: { client_id, status: 'hired' }, raw: true, attributes: ['user_id'] })
    activeJobs.map(user => userIds.add(user.user_id))

    // Send user notification for new accouncement channel
    const newTopicLink = `${config.get('webApp.baseUrl')}/forum/topic/${newTopic.topic_id}`
    const topicTitle = topic_title.slice(0, 50)
    const notice = `<span><a href="${newTopicLink}">New Company Announcement</a>${topicTitle}...</span>`
    for (const user_id of userIds) {
      await addUserNotification({ notice, user_id })
    }
  }
  return newTopic
}

export async function addChannel ({ channel_title, owner_id, category_id, client_id, is_public, is_company_ann }) {
  const newChannel = await createNewEntity({
    model: XForumChannel,
    data: {
      channel_title,
      owner_id,
      client_id,
      category_id,
      is_public,
      is_company_ann
    }
  })
  return newChannel
}

export async function addForumUser ({ user_id, forum_object_type, forum_object_id, is_moderator }) {
  const newUser = await createNewEntity({
    model: XForumUser,
    data: {
      user_id,
      forum_object_type,
      forum_object_id,
      is_moderator
    }
  })
  return newUser
}

export async function getCategories ({ user_id }) {
  const userCategories = await XForumUser.findAll({
    where: { forum_object_type: 'category', user_id },
    raw: true,
    attributes: ['forum_object_id']
  })
  const categoryIds = userCategories.map(category => category.forum_object_id)
  const categories = await XForumCategory.findAll({
    where: {
      [Op.or]: [{ is_public: true }, { owner_id: user_id }, { category_id: categoryIds }],
      [Op.not]: [{ is_deleted: true }]
    },
    raw: true
  })
  return categories
}

export async function getCategoryById ({ category_id }) {
  const category = await XForumCategory.findOne({
    where: { category_id },
    raw: true
  })
  return category
}

export async function getChannels ({ user_id }) {
  const userChannels = await XForumUser.findAll({
    where: { forum_object_type: 'channel', user_id },
    raw: true,
    attributes: ['forum_object_id']
  })
  const channelIds = userChannels.map(channel => channel.forum_object_id)
  const channels = await XForumChannel.findAll({
    where: { [Op.or]: [{ is_public: true }, { owner_id: user_id }, { channel_id: channelIds }] },
    raw: true
  })
  return channels
}

export async function getTopics ({ user_id }) {
  const userTopics = await XForumUser.findAll({
    where: { forum_object_type: 'topic', user_id },
    raw: true,
    attributes: ['forum_object_id']
  })
  const topicIds = userTopics.map(topic => topic.forum_object_id)
  const topics = await XForumTopic.findAll({
    where: { [Op.or]: [{ is_public: true }, { owner_id: user_id }, { topic_id: topicIds }] },
    raw: true
  })
  return topics
}

export async function getRecentTopics ({ client_id, limit = 5 }) {
  const { channel_id } = await getCompanyAnnouncementChannel({ client_id })
  const topics = await XForumTopic.findAll({
    where: {
      channel_id
    },
    order: [['created_on', 'DESC']],
    limit,
    raw: true
  })
  return topics
}

export async function inviteUser ({ forum_object_id, forum_object_type, user_id, inviter_id }) {
  let inviter_first_name, recipient_first_name, wallet_address, notify_email, notify_sms
  const userDetails = await UserDetail.findAll({
    where: { user_id: [user_id, inviter_id] },
    raw: true,
    attributes: ['first_name', 'wallet_address', 'notify_email', 'notify_sms']
  })
  if (userDetails[0].user_id === user_id) {
    recipient_first_name = userDetails[0].first_name
    notify_email = userDetails[0].notify_email
    notify_sms = userDetails[0].notify_sms
    inviter_first_name = userDetails[1].first_name
    wallet_address = userDetails[1].wallet_address
  } else {
    recipient_first_name = userDetails[1].first_name
    notify_email = userDetails[1].notify_email
    notify_sms = userDetails[1].notify_sms
    inviter_first_name = userDetails[0].first_name
    wallet_address = userDetails[0].wallet_address
  }
  // Create user access to private discussion
  await addForumUser({ user_id, forum_object_type, forum_object_id, is_moderator: false })

  // Generate invitation link
  const invitationLink = `${config.get('webApp.baseUrl')}/forum/${forum_object_type}/${forum_object_id}`

  // Add user notification
  const notice = `<span><a href="/user/${wallet_address}">${inviter_first_name}</a> invited you to <a href="${invitationLink}">join a private discussion ${forum_object_type}</a>.</span>`
  await addUserNotification({ user_id, notice })

  // Send Email and SMS notification
  if (notify_email) {
    const { email } = await User.findOne({ where: { user_id }, raw: true })

    // Send email notification
    await SendForumInvitationMail.execute({
      invitationLink,
      inviter_first_name,
      recipient_first_name,
      forum_object_type,
      email
    })
  }
  if (notify_sms) {
    // Send sms notification
  }
}

export async function commentTopic ({ user_id, topic_id, comment }) {
  const commentTopicActivity = await createNewEntity({
    model: XUserActivity,
    data: {
      user_id,
      record_type: 'topic',
      record_id: topic_id,
      activity_type: 'comment',
      activity_value: comment
    }
  })
  return commentTopicActivity
}

export async function likeTopic ({ user_id, topic_id }) {
  const topicLikeActivity = await createNewEntity({
    model: XUserActivity,
    data: {
      user_id,
      record_type: 'topic',
      record_id: topic_id,
      activity_type: 'like',
      activity_value: '1'
    }
  })
  return topicLikeActivity
}

export async function getTopicComments ({ topic_id }) {
  const topicComments = await XUserActivity.findAll({
    where: {
      record_type: 'topic',
      record_id: topic_id,
      activity_type: 'comment'
    },
    order: [['created_on', 'DESC']],
    raw: true
  })
  return topicComments
}

export async function getTopicLikesCount ({ topic_id }) {
  const topicLikesCount = await XUserActivity.sum('activity_value', {
    where: {
      record_type: 'topic',
      record_id: topic_id,
      activity_type: 'like'
    }
  })
  return topicLikesCount
}

async function addUserNotification ({ user_id, notice }) {
  const notification = await createNewEntity({
    model: XUserNotification,
    data: {
      user_id,
      notice
    }
  })
  return notification
}

export async function getCompanyAnnouncementChannel ({ client_id }) {
  const announcementChannel = await XForumChannel.findOne({ where: { client_id, is_company_ann: true }, raw: true })
  return announcementChannel
}

export async function getOneChannel (queryObj = {}) {
  let query = { raw: true }
  query = { where: { ...queryObj }, ...query }
  return XForumChannel.findOne(query)
}

export async function getAllTopics (queryObj = {}) {
  let query = { raw: true }
  query = { where: { ...queryObj }, ...query }
  return XForumTopic.findAll(query)
}

export async function getAllForumUsers (queryObj = {}) {
  let query = { raw: true }
  query = { where: { ...queryObj }, ...query }
  return XForumUser.findAll(query)
}

export async function getOneForumUser (queryObj = {}) {
  let query = { raw: true }
  query = { where: { ...queryObj }, ...query }
  return XForumUser.findOne(query)
}

export async function getOneTopic (queryObj = {}) {
  let query = { raw: true }
  query = { where: { ...queryObj }, ...query }
  return XForumTopic.findOne(query)
}

export async function updateTopicViews ({ topic_id, currentViews }) {
  await XForumTopic.update({
    views: currentViews + 1
  },
  { where: { topic_id } })
  return currentViews + 1
}

export async function getUserSubProfile ({ user_id }) {
  const userDetails = await getUserDetails({ user_id })
  return {
    userId: user_id,
    userName: userDetails.first_name,
    profileImage: 'https://via.placeholder.com/150x150'
  }
}

export function getFilteredTopics ({ topics, channel_id }) {
  return topics.filter(topic => topic.channel_id === channel_id)
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

export async function getChannelModerators ({ channel_id }) {
  const channelModerators = await getAllForumUsers({
    forum_object_type: 'channel',
    forum_object_id: channel_id,
    is_moderator: true
  })
  const userSubProfiles = await Promise.all(channelModerators.map(user => getUserSubProfile({ user_id: user.user_id })))
  return userSubProfiles
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
      dateCreatedOn: topic.createdAt,
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
    dateLastReplied = topicComments.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))[0].createdAt
  }
  return {
    totalReplies: topicComments.length,
    dateLastReplied
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

export function getForumData ({ categories, channels, topics }) {
  const forumData = categories.map(category => {
    return {
      id: category.category_id,
      title: category.category_title,
      owner: category.owner_id,
      channels: getFilteredChannels({ channels, topics, category_id: category.category_id })
    }
  })
  return forumData
}

export function getFilteredChannels ({ topics, channels, category_id }) {
  const filteredChannels = []
  for (const channel of channels) {
    if (channel.category_id === category_id) {
      filteredChannels.push({
        id: channel.channel_id,
        title: channel.channel_title,
        description: channel.channel_description,
        noOfTopics: getFilteredTopicsCount({ topics, channel_id: channel.channel_id })
      })
    }
  }
  return filteredChannels
}

export function getFilteredTopicsCount ({ topics, channel_id }) {
  return topics.filter(topic => topic.channel_id === channel_id).length
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

export async function deleteCategory ({ category_id }) {
  const categories = await XForumCategory.update({ is_deleted: true },
    { where: { category_id } })
  return categories
}
