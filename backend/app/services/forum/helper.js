import { XForumCategory, XForumTopic, XForumChannel, XForumUser, XUserNotification, UserDetail } from '../../db/models'
import { Op } from 'sequelize'
import config from '../../../config/app'

export async function addCategory ({ category_title, owner_id, is_public }) {
  const newCategory = await XForumCategory.create({
    category_title,
    owner_id,
    is_public
  })
  return newCategory.get({ plain: true })
}

export async function addTopic ({ topic_title, owner_id, channel_id, is_public, is_flagged }) {
  const newTopic = await XForumTopic.create({
    topic_title,
    owner_id,
    channel_id,
    is_public,
    is_flagged
  })
  return newTopic.get({ plain: true })
}

export async function addChannel ({ channel_title, owner_id, category_id, client_id, is_public, is_company_ann }) {
  const newChannel = await XForumChannel.create({
    channel_title,
    owner_id,
    client_id,
    category_id,
    is_public,
    is_company_ann
  })
  return newChannel.get({ plain: true })
}

export async function addForumUser ({ user_id, forum_object_type, forum_object_id, is_moderator }) {
  const newUser = await XForumUser.create({
    user_id,
    forum_object_type,
    forum_object_id,
    is_moderator
  })
  return newUser.get({ plain: true })
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

export async function getCompanyAnnouncementChannel ({ client_id }) {
  const announcementChannel = await XForumChannel.findOne({ where: { client_id } })
  return announcementChannel
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
  const { first_name, wallet_address } = await UserDetail.findOne({ where: { user_id: inviter_id }, raw: true })
  const { notify_email, notify_sms } = await UserDetail.findOne({ where: { user_id }, raw: true })

  // Create user access to private discussion
  await addForumUser({ user_id, forum_object_type, forum_object_id, is_moderator: false })

  // Generate invitation link
  const invitationLink = `${config.get('webApp.baseUrl')}/forum/${forum_object_type}/${forum_object_id}`

  // Add user notification
  await addUserNotification({ user_id, forum_object_id, forum_object_type, first_name, wallet_address })

  // Send Email and SMS notification
  if (notify_email) {
    // Send email notification
  }
  if (notify_sms) {
    // Send sms notification
  }
}

async function addUserNotification ({ user_id, forum_object_id, forum_object_type, first_name, wallet_address }) {
  let forumObject = {}
  let title
  switch (forum_object_type) {
    case 'category':
      forumObject = await XForumCategory.findOne({ where: { category_id: forum_object_id }, raw: true })
      title = forumObject.category_title
      break

    case 'channel':
      forumObject = await XForumChannel.findOne({ where: { channel_id: forum_object_id }, raw: true })
      title = forumObject.channel_title
      break

    case 'topic':
      forumObject = await XForumTopic.findOne({ where: { topic_id: forum_object_id }, raw: true })
      title = topic_title
  }
  const notice = `<span><a href="/user/${wallet_address}">${first_name}</a> invited you to <a href="/forums/${forum_object_type}/${title}">join a private discussion ${object_type}</a>.</span>`
  const notification = await XUserNotification.create({ user_id, notice })
  return notification
}
