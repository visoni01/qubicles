import {
  XQodConversations, XQodChatMessage, XQodChatMessagesReadStatus, XQodUserConversationsStatus, XQodChatGroupMembers,
  UserDetail
} from '../../db/models'
import { Op } from 'sequelize'
import { SqlHelper } from '../../utils/sql'
import _ from 'lodash'
import { formatDate } from './common'

export const createOrFindChat = async ({ user_id, candidate_id }) => {
  const conversation = await XQodConversations.findOne({
    attributes: ['conversation_id'],
    where: {
      user_one_id: { [Op.or]: [user_id, candidate_id] },
      user_two_id: { [Op.or]: [user_id, candidate_id] }
    }
  })

  let conversationDetails

  if (conversation) {
    conversationDetails = await XQodConversations.findOne({
      where: {
        user_one_id: { [Op.or]: [user_id, candidate_id] },
        user_two_id: { [Op.or]: [user_id, candidate_id] }
      },
      attributes: ['conversation_id'],
      include: [
        {
          model: XQodChatMessage,
          as: 'messages',
          required: false,
          order: [
            ['sent_at', 'DESC']
          ],
          include: [
            {
              model: XQodChatMessagesReadStatus,
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
          model: XQodUserConversationsStatus,
          as: 'allRead',
          where: { user_id },
          attributes: ['all_read']
        }
      ]
    })
  } else {
    conversationDetails = await XQodConversations.create({
      user_one_id: user_id,
      user_two_id: candidate_id,
      is_group: false
    })
  }

  return {
    conversation: conversationDetails ? conversationDetails.get({ plain: true }) : conversation.get({ plain: true }),
    isNewConversation: !(conversation && conversation.conversation_id)
  }
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
  /**
   * Table/Join Alias - Description of details fetched
   *
   * t1_messages_details - all the details of the latest message in each conversation
   * t2_conversation_latest_message - id and sent_at of the latest message and concatenation of all message texts (used for searching) in each conversation
   * t3_private_conversations - user_id of the other user in a private conversation
   * t4_user_details - name and profile picture of the users
   * t5_group_members - conversation_id of group chats
   * t6_users - user full name to create the group title
   * t7_group_name_details - comma separated user full names in group title
   * t8_conversation_status - all_read status of each conversation
   * t9_messages - id and sent_at of latest message in each convesation
   * t10_all_user_conversations - both private and group chats of user
  **/

  const sqlQuery = `
    SELECT t1_messages_details.*, t3_private_conversations.is_group, t3_private_conversations.group_title,
      t4_user_details.first_name, t4_user_details.last_name, t4_user_details.profile_image,
      t7_group_name_details.group_name, t8_conversation_status.all_read, t2_conversation_latest_message.is_removed,
      t2_conversation_latest_message.all_texts
    FROM x_qod_chat_messages t1_messages_details
    JOIN (
      SELECT t9_messages.conversation_id, max(sent_at) sent_at, t10_all_user_conversations.is_removed,
        t10_all_user_conversations.updated_on,
        group_concat(t9_messages.text SEPARATOR ' ') AS all_texts
      FROM x_qod_chat_messages t9_messages
      JOIN (
        SELECT conversation_id, NULL AS is_removed, NULL AS updated_on
        FROM x_qod_conversations
        WHERE user_one_id = ${user_id} OR user_two_id = ${user_id}
        UNION
        SELECT conversation_id, is_removed, updated_on
        FROM x_qod_chat_group_members
        WHERE user_id = ${user_id}
      ) t10_all_user_conversations
      ON t9_messages.conversation_id = t10_all_user_conversations.conversation_id
      WHERE sent_at <=
        CASE
          WHEN t10_all_user_conversations.is_removed = 1
          THEN t10_all_user_conversations.updated_on
          ELSE sent_at
        END
      GROUP BY conversation_id
    ) t2_conversation_latest_message
    ON t1_messages_details.conversation_id = t2_conversation_latest_message.conversation_id
      AND t1_messages_details.sent_at = t2_conversation_latest_message.sent_at
    JOIN (
      SELECT *,
        CASE WHEN user_one_id = ${user_id}
          THEN user_two_id
          ELSE user_one_id
        END AS candidate_id
      FROM x_qod_conversations
    ) t3_private_conversations
    ON t3_private_conversations.conversation_id = t1_messages_details.conversation_id
    LEFT JOIN (
      SELECT user_id, profile_image, first_name, last_name
      FROM x_user_details
    ) t4_user_details
    ON t3_private_conversations.candidate_id = t4_user_details.user_id AND t3_private_conversations.is_group = 0
    LEFT JOIN (
      SELECT t5_group_members.conversation_id,
        group_concat(t6_users.full_name ORDER BY t6_users.full_name SEPARATOR ', ') AS group_name
      FROM x_qod_chat_group_members t5_group_members
      JOIN x_users t6_users
      ON t5_group_members.user_id = t6_users.user_id
      WHERE t5_group_members.is_removed = 0
      GROUP BY conversation_id
    ) t7_group_name_details
    ON t7_group_name_details.conversation_id = t1_messages_details.conversation_id
      AND t3_private_conversations.is_group = 1
      AND (t3_private_conversations.group_title IS NULL OR t3_private_conversations.group_title = '')
    LEFT JOIN (
      SELECT conversation_id, user_id, all_read
      FROM x_qod_user_conversations_status
      where user_id = ${user_id}
    ) t8_conversation_status
    ON t8_conversation_status.conversation_id = t1_messages_details.conversation_id
    ${search_keyword
      ? `WHERE t2_conversation_latest_message.all_texts LIKE '%${search_keyword}%'
        OR CONCAT(t4_user_details.first_name, ' ', t4_user_details.last_name) LIKE '%${search_keyword}%'
        OR t3_private_conversations.group_title LIKE '%${search_keyword}%'`
      : ''}
    GROUP BY conversation_id
    ORDER BY t1_messages_details.sent_at DESC
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
  /**
   * Table/Join Alias - Description of details fetched
   *
   * conversationDetails => chat data from x_qod_conversations table
   * messages => message data from x_qod_chat_messages table
   * userDetails => user data from x_user_details table
   * chatMessageRead => message read status data from x_qod_chat_message_read table
   * chatAllRead => chat all read status from x_qod_chat_all_read table
   * groupMemberStatus => JOIN to fetch group member removed status to filter out messages sent after user removed
   *                      from the group
   * senderDetails => JOIN to fetch sender details
   * messageReadStatus => JOIN to fetch each message having read status false
   * conversationMessages => JOIN to fetch all the unread messages
   * chatAllReadStatus => JOIN to fetch chat all read status
   * groupStatus => JOIN to fetch logged in user removed status
  **/

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
        FROM x_qod_chat_messages_read_status chatMessageRead
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
      FROM x_qod_user_conversations_status chatAllRead
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
  /**
   * Table/Join Alias - Description of details fetched
   *
   * messages => message data from x_qod_chat_messages table
   * readMessageData => JOIN to fetch only read messages
   * senderDetails => JOIN to fetch sender details
  **/

  return `
    SELECT messages.*, senderDetails.profile_image
    FROM x_qod_chat_messages messages
    JOIN (
      SELECT x_qod_chat_messages.message_id
      FROM x_qod_chat_messages
      WHERE conversation_id = ${conversation_id}
      EXCEPT
      SELECT x_qod_chat_messages_read_status.message_id FROM x_qod_chat_messages_read_status WHERE user_id = ${user_id}
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
  /**
   * Table/Join Alias - Description of details fetched
   *
   * userDetails => user data from x_user_details table
   * users => user data from x_users table (To fetch user_code and full_name)
   * clientUsers => client_id corresponding to user_id from x_client_users table
   * clients => client data from x_clients table (To fetch client title, city and state)
   * clientDetails => JOIN to fetch client details for corresponding client_id
   * clientData => JOIN to fetch client_id details for corresponding user_id
   * userClientData => JOIN to combine client data and agent data
  **/

  return `
    SELECT userDetails.user_id, userDetails.profile_image, userDetails.city, userDetails.state, userDetails.work_title,
      userClientData.client_id , userClientData.full_name, userClientData.user_code, userClientData.title,
      userClientData.client_city, userClientData.client_state
    FROM x_user_details userDetails
    JOIN (
      SELECT users.user_id, users.full_name, users.user_code, clientData.client_id, clientData.title,
        clientData.client_city, clientData.client_state
      FROM x_users users
      LEFT JOIN (
        SELECT clientUsers.user_id, clientDetails.client_id, clientDetails.title, clientDetails.client_city,
          clientDetails.client_state
        FROM x_client_users clientUsers
        JOIN (
          SELECT clients.client_id, clients.title, clients.city AS client_city, clients.state AS client_state
          FROM x_clients clients
        ) clientDetails
        ON clientUsers.client_id = clientDetails.client_id
      ) clientData
      ON users.user_id = clientData.user_id AND users.user_code = 'employer'
    ) userClientData
    ON userDetails.user_id = userClientData.user_id
    WHERE userClientData.user_id IN (${user_ids})`
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
    clientId: user.client_id,
    name: user.full_name,
    profilePic: user.profile_image,
    location: `${user.city || user.client_city || ''}${
      (user.city || user.client_city) && (user.state || user.client_state) ? ', ' : ''}${
        user.state || user.client_state || ''}`,
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
  /**
   * Table/Join Alias - Description of details fetched
   *
   * - Used to fetch initial list of suggested users based on the recent activities (follow, rate, like status)
   * t1_user_activities - all the required user activities from x_user_activities table
   * t2_client_users - client_id for clients from x_client_users
   * t3_status_activities - all the 'status' activities of the user
   * t4_user_data - activity details along with the user_id and clilent_id of the other user involved in the activity
   * t5_suggested_user_data - suggested user data in ordered form (latest to oldest)
   * t6_users - user details from x_users table
   * t7_user_details - user details from x_user_details table
   * t8_clients - client details from x_clients table
   *
   * - Used to fetch all users to search by name
   * ut1_users - user details from x_users table
   * ut2_user_details - user details from x_user_details table
   * ut3_client_users - client_id for clients from x_client_users
   * ut4_clients - client details from x_clients table
   * union_result - union result of both the queries (suggestions and search)
  **/

  const sqlQuery = `
    SELECT * FROM (
    SELECT t5_suggested_user_data.suggested_user_id, t6_users.user_code, t6_users.full_name,
      t7_user_details.profile_image, t5_suggested_user_data.client_id,
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
        ON (t1_user_activities.record_id = t2_client_users.client_id AND t1_user_activities.record_type = 'client')
            OR t1_user_activities.user_id = t2_client_users.user_id
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
          ut4_clients.client_id,
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
          WHERE conversation_id = ${conversation_id} AND is_removed = 0
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
  clientId: user.client_id,
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
  await XQodUserConversationsStatus.update({
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

  await XQodChatMessagesReadStatus.destroy({
    where: {
      user_id,
      message_id: { [Op.in]: messageIds }
    }
  })
}

export const markAsUnread = async ({ user_id, conversation_id }) => {
  await XQodUserConversationsStatus.update({
    all_read: false
  }, {
    where: {
      user_id,
      conversation_id
    }
  })
}

export const addConversationStatusEntry = async ({ conversation_id, user_ids }) => {
  const conversationStatusData = user_ids && user_ids.map((user_id) => ({
    conversation_id,
    user_id,
    all_read: true,
    deleted_on: Date.now()
  }))

  await XQodUserConversationsStatus.bulkCreate(conversationStatusData)
}
