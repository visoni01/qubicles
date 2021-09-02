import {
  XQodConversations, XQodChatMessage, XQodChatMessageRead, XQodChatAllRead, XQodChatGroupMembers, UserDetail
} from '../../db/models'
import { Op } from 'sequelize'
import { SqlHelper } from '../../utils/sql'

export const createOrFindChat = async ({ user_id, candidate_id }) => {
  const [conversation] = await XQodConversations.findOrCreate({
    where: {
      user_one_id: { [Op.or]: [user_id, candidate_id] },
      user_two_id: { [Op.or]: [user_id, candidate_id] }
    },
    defaults: {
      user_one_id: user_id,
      user_two_id: candidate_id
    },
    attributes: ['conversation_id'],
    include: [
      {
        model: XQodChatMessage,
        as: 'messages',
        limit: 10,
        order: [
          ['sent_at', 'DESC']
        ],
        include: [
          {
            model: XQodChatMessageRead,
            as: 'messageReadStatus',
            attributes: ['is_read'],
            where: { user_id },
            required: false
          },
          {
            model: UserDetail,
            as: 'senderDetails',
            attributes: ['profile_image']
          }
        ]
      },
      {
        model: XQodChatAllRead,
        as: 'allRead',
        where: { user_id },
        attributes: ['all_read'],
        required: false
      }
    ]
  })

  return conversation.get({ plain: true })
}

export const formatChatMessage = ({ message }) => {
  const formattedMessage = {
    messageId: message.message_id,
    senderId: message.sender_id,
    text: message.text,
    imageUrl: message.image_url,
    profilePic: message.senderDetails && message.senderDetails.profile_image,
    isNotification: !!message.is_notification,
    sentAt: message.sent_at,
    isRead: message.messageReadStatus && message.messageReadStatus[0] ? message.messageReadStatus[0].is_read : true
  }

  return formattedMessage
}

export const createNewGroup = async ({ group_title }) => {
  const group = await XQodConversations.create({
    is_group: true,
    group_title
  })

  return group
}

export const addNewMembers = async ({ conversation_id, user_ids }) => {
  const bulkDataToBeAdded = user_ids && user_ids.map((user_id) => ({
    conversation_id,
    user_id
  }))

  await XQodChatGroupMembers.bulkCreate(bulkDataToBeAdded)
}

export const fetchAllGroupMembers = async ({ conversation_id }) => {
  const groupMembersIds = await XQodChatGroupMembers.findAll({
    raw: true,
    attributes: ['user_id'],
    where: { conversation_id }
  })

  return groupMembersIds && groupMembersIds.map((item) => item.user_id)
}

export const changeGroupMembersStatus = async ({ conversation_id, user_ids, is_removed }) => {
  await XQodChatGroupMembers.update({
    is_removed
  }, {
    where: {
      conversation_id,
      user_id: user_ids
    }
  })
}

export const getChatsList = async ({ user_id, offset, search_keyword }) => {
  // TODO - Change table name aliases
  const sqlQuery = `
    SELECT t1.*, t3.is_group, t3.group_title, t4.first_name, t4.last_name, t4.profile_image, t7.group_name,
      t8.all_read, t2.is_removed, t2.all_texts
    FROM x_qod_chat_messages t1
    JOIN (
      SELECT t9.conversation_id, max(sent_at) sent_at, t10.is_removed, t10.updated_on,
        group_concat(t9.text SEPARATOR ' ') AS all_texts
      FROM x_qod_chat_messages t9
      JOIN (
        SELECT conversation_id, NULL AS is_removed, NULL AS updated_on
        FROM x_qod_conversations
        WHERE user_one_id = ${user_id} OR user_two_id = ${user_id}
        UNION
        SELECT conversation_id, is_removed, updated_on
        FROM x_qod_chat_group_members
        WHERE user_id = ${user_id}
      ) t10
      ON t9.conversation_id = t10.conversation_id
      WHERE sent_at <=
        CASE
          WHEN t10.is_removed = 1
          THEN t10.updated_on
          ELSE sent_at
        END
      GROUP BY conversation_id
    ) t2
    ON t1.conversation_id = t2.conversation_id AND t1.sent_at = t2.sent_at
    JOIN (
      SELECT *,
        CASE WHEN user_one_id = ${user_id}
          THEN user_two_id
          ELSE user_one_id
        END AS candidate_id
      FROM x_qod_conversations
    ) t3
    ON t3.conversation_id = t1.conversation_id
    LEFT JOIN (
      SELECT user_id, profile_image, first_name, last_name
      FROM x_user_details
    ) t4
    ON t3.candidate_id = t4.user_id AND t3.is_group = 0
    LEFT JOIN (
      SELECT t5.conversation_id, group_concat(t6.full_name ORDER BY t6.full_name SEPARATOR ', ') AS group_name
      FROM x_qod_chat_group_members t5
      JOIN x_users t6
      ON t5.user_id = t6.user_id
      WHERE t5.is_removed = 0
      GROUP BY conversation_id
    ) t7
    ON t7.conversation_id = t1.conversation_id AND t3.is_group = 1 AND (t3.group_title IS NULL OR t3.group_title = '')
    LEFT JOIN (
      SELECT conversation_id, user_id, all_read
      FROM x_qod_chat_all_read
      where user_id = ${user_id}
    ) t8
    ON t8.conversation_id = t1.conversation_id
    ${search_keyword
      ? `WHERE t2.all_texts LIKE '%${search_keyword}%'
        OR CONCAT(t4.first_name, ' ', t4.last_name) LIKE '%${search_keyword}%'
        OR t3.group_title LIKE '%${search_keyword}%'`
      : ''}
    ORDER BY t1.sent_at DESC
    LIMIT 5
    OFFSET ${offset || 0}
  `

  const latestChats = await SqlHelper.select(sqlQuery)

  return latestChats
}

export const formatChatListItem = ({ chatListItem }) => {
  const {
    conversation_id, is_group, first_name, last_name, group_title, group_name, profile_image,
    sent_at, text, all_read, is_removed
  } = chatListItem
  const formattedChatListItem = {
    id: conversation_id,
    name: !is_group ? `${first_name} ${last_name}` : (group_title || group_name),
    imageUrl: profile_image,
    dateTime: sent_at,
    isGroup: !!is_group,
    latestMessage: text,
    allRead: !!all_read,
    isRemoved: !!is_removed
  }

  return formattedChatListItem
}

export const changeGroupName = async ({ conversation_id, group_title }) => {
  await XQodConversations.update({
    group_title
  }, {
    where: {
      conversation_id
    }
  })
}
