import { XForumCategory, XForumTopic, XForumChannel, XForumUser } from '../../db/models'
import { Op } from 'sequelize'

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

export async function addChannel ({ channel_title, owner_id, category_id, is_public, is_company_ann }) {
  const newChannel = await XForumChannel.create({
    channel_title,
    owner_id,
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
