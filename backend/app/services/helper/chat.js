import {
  XQodConversations, XQodChatMessage, XQodChatMessageRead, XQodChatAllRead, XQodChatGroupMembers, UserDetail
} from '../../db/models'
import { Op } from 'sequelize'

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
