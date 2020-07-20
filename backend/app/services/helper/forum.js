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
    where: { [Op.or]: [{ is_public: true }, { owner_id: user_id }, { category_id: categoryIds }] },
    raw: true
  })
  return categories
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
