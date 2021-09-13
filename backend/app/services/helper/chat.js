import {
  XQodConversations, XQodChatMessage, XQodChatMessageRead, XQodChatAllRead, XQodChatGroupMembers, UserDetail
} from '../../db/models'
import { Op } from 'sequelize'
import { SqlHelper } from '../../utils/sql'
import _ from 'lodash'
import { formatDate } from './common'

export const createOrFindChat = async ({ user_id, candidate_id }) => {
  const [conversation] = await XQodConversations.findOrCreate({
    where: {
      user_one_id: { [Op.or]: [user_id, candidate_id] },
      user_two_id: { [Op.or]: [user_id, candidate_id] }
    },
    defaults: {
      user_one_id: user_id,
      user_two_id: candidate_id,
      is_group: false
    },
    attributes: ['conversation_id'],
    include: [
      {
        model: XQodChatMessage,
        as: 'messages',
        order: [
          ['sent_at', 'DESC']
        ],
        include: [
          {
            model: XQodChatMessageRead,
            as: 'messageReadStatus',
            attributes: ['is_read'],
            where: { user_id }
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

export const formatChatMessage = ({ message }) => ({
  messageId: message.message_id,
  senderId: message.sender_id,
  text: message.text,
  imageUrl: message.image_url,
  profilePic: (message.senderDetails && message.senderDetails.profile_image) || message.profile_image,
  isNotification: !!message.is_notification,
  sentAt: message.sent_at,
  isRead: !_.isUndefined(message.is_read)
    ? !!message.is_read
    : (message.messageReadStatus && message.messageReadStatus[0] ? message.messageReadStatus[0].is_read : true)
})

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

export const fetchAllGroupMembersIds = async ({ conversation_id, is_removed = [true, false] }) => {
  const groupMembers = await XQodChatGroupMembers.findAll({
    raw: true,
    attributes: ['user_id'],
    where: {
      conversation_id,
      is_removed
    }
  })

  return groupMembers && groupMembers.map((user) => user.user_id)
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
    LIMIT 11
    OFFSET ${offset || 0}
  `

  const latestChats = await SqlHelper.select(sqlQuery)

  return latestChats
}

export const formatChatListItem = ({ chatListItem }) => {
  const {
    conversation_id, is_group, first_name, last_name, group_title, group_name, profile_image,
    sent_at, text, all_read, is_removed, is_notification, image_url
  } = chatListItem
  const formattedChatListItem = {
    id: conversation_id,
    name: !is_group ? `${first_name} ${last_name}` : (group_title || group_name),
    imageUrl: profile_image,
    dateTime: sent_at,
    isGroup: !!is_group,
    latestMessage: text,
    allRead: !!all_read,
    isRemoved: !!is_removed,
    isNotification: !!is_notification,
    isImage: !!image_url
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

export const getChatData = async ({ conversation_id, user_id }) => {
  const query = `
    SELECT conversationDetails.is_group, conversationDetails.group_title, conversationDetails.user_one_id,
      conversationDetails.user_two_id, conversationMessages.*, chatAllReadStatus.all_read, groupStatus.is_removed,
      groupStatus.updated_on
    FROM x_qod_conversations conversationDetails
    LEFT JOIN (
      SELECT messages.*, senderDetails.profile_image, messageReadStatus.is_read
      FROM x_qod_chat_messages messages
      LEFT JOIN (
        SELECT conversation_id, is_removed, updated_on
        FROM x_qod_chat_group_members
        WHERE user_id = ${user_id}
      ) groupMemberStatus
      ON messages.conversation_id = groupMemberStatus.conversation_id
      LEFT JOIN (
        SELECT userDetails.user_id, userDetails.profile_image
        FROM x_user_details userDetails
      ) senderDetails
      ON messages.sender_id = senderDetails.user_id
      JOIN (
        SELECT chatMessageRead.message_id, chatMessageRead.is_read
        FROM x_qod_chat_message_read chatMessageRead
        WHERE chatMessageRead.user_id = ${user_id}
      ) messageReadStatus
      ON messages.message_id = messageReadStatus.message_id
      WHERE sent_at <=
      CASE
        WHEN groupMemberStatus.is_removed = 1
        THEN groupMemberStatus.updated_on
        ELSE sent_at
      END
    ) conversationMessages
    ON conversationDetails.conversation_id = conversationMessages.conversation_id
    LEFT JOIN (
      SELECT chatAllRead.conversation_id, chatAllRead.user_id, chatAllRead.all_read
      FROM x_qod_chat_all_read chatAllRead
      where user_id = ${user_id}
    ) chatAllReadStatus
    ON chatAllReadStatus.conversation_id = conversationDetails.conversation_id
    LEFT JOIN (
      SELECT conversation_id, is_removed, updated_on
      FROM x_qod_chat_group_members
      WHERE user_id = ${user_id}
    ) groupStatus
    ON groupStatus.conversation_id = conversationDetails.conversation_id
    WHERE conversationDetails.conversation_id = ${conversation_id}
    ORDER BY conversationMessages.sent_at DESC
  `

  const conversationWithUnReadMessages = await SqlHelper.select(query)

  return conversationWithUnReadMessages
}

export const getReadMessages = ({ conversation_id, user_id, is_group, is_removed, updated_on, offset }) => {
  return `
    SELECT messages.*, senderDetails.profile_image
    FROM x_qod_chat_messages messages
    JOIN (
      SELECT x_qod_chat_messages.message_id
      FROM x_qod_chat_messages
      WHERE conversation_id = ${conversation_id}
      EXCEPT
      SELECT x_qod_chat_message_read.message_id FROM x_qod_chat_message_read WHERE user_id = ${user_id}
    ) readMessageData
    ON messages.message_id = readMessageData.message_id
    LEFT JOIN (
      SELECT user_id, profile_image
      FROM x_user_details
    ) senderDetails
    ON messages.sender_id = senderDetails.user_id
    WHERE messages.sent_at <=
    CASE
      WHEN ${is_group} AND ${is_removed}
      THEN '${formatDate(updated_on)}'
      ELSE messages.sent_at
    END
    ORDER BY messages.sent_at DESC
    LIMIT 11
    OFFSET ${offset || 0}
  `
}

export const getCandidatesInfo = ({ user_ids }) => {
  // TODO - Change table name aliases
  return `
    SELECT t1.user_id, t1.profile_image, t1.city, t1.state, t1.work_title, t3.full_name, t3.user_code,
      t3.title, t3.client_city, t3.client_state
    FROM x_user_details t1
    JOIN (
      SELECT t2.user_id, t2.full_name, t2.user_code, t4.title, t4.client_city, t4.client_state
      FROM x_users t2
      LEFT JOIN (
        SELECT t5.user_id, t7.title, t7.client_city, t7.client_state
        FROM x_client_users t5
        JOIN (
          SELECT t6.client_id, t6.title, t6.city AS client_city, t6.state AS client_state
          FROM x_clients t6
        ) t7
        ON t5.client_id = t7.client_id
      ) t4
      ON t2.user_id = t4.user_id AND t2.user_code = 'employer'
    ) t3
    ON t1.user_id = t3.user_id
    WHERE t3.user_id IN (${user_ids})`
}

export const formatMessagesOrder = ({ messageArray, messages }) => {
  for (let index = messages.length - 1; index >= 0; index -= 1) {
    messages[index] && messageArray.push(formatChatMessage({ message: messages[index] }))
  }

  return messageArray
}

export const formatCandidateInfoData = ({ candidateInfo }) => {
  return candidateInfo.map((user) => ({
    id: user.user_id,
    name: user.full_name,
    profilePic: user.profile_image,
    location: _.isEqual(user.user_code, 'employer')
      ? user.client_city + ' ' + user.client_state
      : user.city + ' ' + user.state,
    title: _.isEqual(user.user_code, 'employer') ? user.title : user.work_title,
    userCode: user.user_code
  }))
}

export const formatChatData = ({
  conversation_id, conversation, messages, candidateInfo, more, allRead
}) => ({
  conversationId: conversation_id && parseInt(conversation_id),
  isGroup: !!conversation.is_group,
  groupName: conversation.group_title,
  isRemoved: !!conversation.is_removed,
  chatData: {
    chats: messages,
    more,
    offset: 0
  },
  candidatesInfo: candidateInfo && formatCandidateInfoData({ candidateInfo }),
  allRead: !!allRead
})

export const getSuggestedUsersList = async ({ user_id, conversation_id, offset, search_keyword }) => {
  const sqlQuery = `
    SELECT * FROM (
    SELECT t5_suggested_user_data.suggested_user_id, t6_users.user_code, t6_users.full_name,
      t7_user_details.profile_image,
      CASE WHEN t6_users.user_code = 'agent'
        THEN t7_user_details.city
        ELSE t8_clients.city
      END AS city,
      CASE WHEN t6_users.user_code = 'agent'
        THEN t7_user_details.state
        ELSE t8_clients.state
      END AS state,
      CASE WHEN t6_users.user_code = 'agent'
        THEN t7_user_details.work_title
        ELSE t8_clients.title
      END AS title
    FROM (
      SELECT MAX(updated_on) updated_on, t4_user_data.client_id,
        CASE WHEN t4_user_data.record_type = 'client' AND t4_user_data.user_id = ${user_id}
          THEN t4_user_data.user_id_client
        WHEN t4_user_data.record_type = 'user' AND t4_user_data.user_id = ${user_id}
          THEN t4_user_data.record_id
        WHEN t4_user_data.record_type in ('client', 'user') AND t4_user_data.user_id != ${user_id}
          THEN t4_user_data.user_id
        WHEN t4_user_data.record_type = 'activity' AND t4_user_data.user_id = ${user_id}
          THEN t4_user_data.user_id_like
        WHEN t4_user_data.record_type = 'activity' AND t4_user_data.user_id != ${user_id}
          THEN t4_user_data.user_id
        END AS suggested_user_id
        FROM (
          SELECT t1_user_activities.*, t2_client_users.user_id user_id_client,
            t3_status_activities.user_id user_id_like, t2_client_users.client_id
          FROM x_user_activities t1_user_activities
          LEFT JOIN x_client_users t2_client_users
          ON t1_user_activities.record_id = t2_client_users.client_id AND t1_user_activities.record_type = 'client'
          LEFT JOIN x_user_activities t3_status_activities
          ON t1_user_activities.record_id = t3_status_activities.user_activity_id
            AND t1_user_activities.record_type = 'activity' AND t1_user_activities.activity_type = 'like'
            AND t3_status_activities.record_type = 'activity' AND t3_status_activities.activity_type = 'status'
          WHERE (
            t1_user_activities.user_id = ${user_id}
            OR (t1_user_activities.record_id = ${user_id} AND t1_user_activities.record_type = 'user')
            OR (t2_client_users.user_id = ${user_id} AND t1_user_activities.record_type = 'client')
            OR (t3_status_activities.user_id = ${user_id} AND t1_user_activities.record_type = 'activity')
          )
          AND (
            (t1_user_activities.activity_type = 'connection' AND t1_user_activities.activity_value != 'blocked')
            OR
            (t1_user_activities.activity_type like 'rating_%' AND t1_user_activities.record_type IN ('user', 'client'))
            OR
            (t1_user_activities.activity_type = 'like' AND t1_user_activities.record_type = 'activity')
          )
        ) t4_user_data
        GROUP BY suggested_user_id
        ORDER BY updated_on desc
      ) t5_suggested_user_data
    LEFT JOIN x_users t6_users
    ON t5_suggested_user_data.suggested_user_id = t6_users.user_id
    LEFT JOIN x_user_details t7_user_details
    ON t5_suggested_user_data.suggested_user_id = t7_user_details.user_id
    LEFT JOIN x_clients t8_clients
    ON t5_suggested_user_data.client_id = t8_clients.client_id
    ${search_keyword
    ? `
        UNION
        SELECT ut1_users.user_id, ut1_users.user_code, ut1_users.full_name, ut2_user_details.profile_image,
        CASE WHEN ut1_users.user_code = 'agent'
          THEN ut2_user_details.city
          ELSE ut4_clients.city
        END AS city,
        CASE WHEN ut1_users.user_code = 'agent'
          THEN ut2_user_details.state
          ELSE ut4_clients.state
        END AS state,
        CASE WHEN ut1_users.user_code = 'agent'
          THEN ut2_user_details.work_title
          ELSE ut4_clients.title
        END AS title
        FROM x_users ut1_users
        LEFT JOIN x_user_details ut2_user_details
        ON ut1_users.user_id = ut2_user_details.user_id
        LEFT JOIN x_client_users ut3_client_users
        ON ut1_users.user_id = ut3_client_users.user_id AND ut1_users.user_code = 'employer'
        LEFT JOIN x_clients ut4_clients
        ON ut3_client_users.client_id = ut4_clients.client_id
      `
    : ''}
    ) union_result
    WHERE suggested_user_id != ${user_id}
      ${search_keyword ? `AND full_name LIKE '%${search_keyword}%'` : ''}
      ${conversation_id ? `
        AND suggested_user_id NOT IN (
          SELECT user_id FROM x_qod_chat_group_members
          WHERE conversation_id = ${conversation_id}
        )
      ` : ''}
    LIMIT 11
    OFFSET ${offset || 0}
  `

  const suggestedUsers = await SqlHelper.select(sqlQuery)

  return suggestedUsers
}

export const formatSuggestedUser = ({ user }) => ({
  id: user.suggested_user_id,
  name: user.full_name,
  profilePic: user.profile_image,
  location: `${user.city || ''}${user.city && user.state ? ', ' : ''}${user.state || ''}`,
  title: user.title,
  userCode: user.user_code
})

export const getConversationDetails = async ({ conversation_id, user_id }) => {
  const conversation = await XQodConversations.findOne({
    raw: true,
    attributes: ['is_group'],
    include: [
      {
        model: XQodChatGroupMembers,
        as: 'group',
        required: false,
        attributes: ['is_removed', 'updated_on'],
        where: { user_id }
      }
    ],
    where: { conversation_id }
  })

  if (conversation) {
    return {
      is_group: !!conversation.is_group,
      is_removed: !!conversation['group.is_removed'],
      updated_on: conversation['group.updated_on']
    }
  }
}

export const markChatAsRead = async ({ user_id, conversation_id }) => {
  await XQodChatAllRead.update({
    all_read: true
  }, {
    where: {
      conversation_id,
      user_id
    }
  })
}

export const markMessagesAsRead = async ({ user_id, conversation_id }) => {
  const messages = await XQodChatMessage.findAll({
    attributes: ['message_id'],
    where: {
      conversation_id
    }
  })

  const messageIds = messages && messages.map((message) => message.message_id)

  await XQodChatMessageRead.destroy({
    where: {
      user_id,
      message_id: { [Op.in]: messageIds }
    }
  })
}

export const markAsUnread = async ({ user_id, conversation_id }) => {
  await XQodChatAllRead.update({
    all_read: false
  }, {
    where: {
      user_id,
      conversation_id
    }
  })
}
