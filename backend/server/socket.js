import socketIo from 'socket.io'
import { instrument } from '@socket.io/admin-ui'
import _ from 'lodash'
import logger from '../app/common/logger'
import config from '../config/app'
import { EVENTS } from '../app/utils/success'
import SendNotificationMailService from '../app/services/email/sendNotificationMail'
import SendSmsNotificationService from '../app/services/sms/sendSmsNotification'
import {
  addUserNotification, deleteNotification, getUserDetailsByUserId, addUserMessages, fetchAllConversationRoomIds,
  getErrorMessageForSocket, displayLoggerMessageForSocket, updateXQodUserConversationsStatus, markMessagesAsUnread
} from '../app/services/helper'

const createSocketConnection = (server) => {
  try {
    const io = socketIo(server, {
      cors: {
        origin: [config.get('webApp.baseUrl'), 'https://admin.socket.io']
      }
    })

    io.on('connection', (socket) => {
      displayLoggerMessageForSocket('Connection created', socket.handshake.query.userId)

      if (!_.isEqual(socket.handshake.query.userId, 'undefined')) {
        socket.join(socket.handshake.query.userId)
        displayLoggerMessageForSocket('Join room', socket.handshake.query.userId)

        // Join all conversation Ids room for chats
        fetchAllConversationRoomIds({ user_id: socket.handshake.query.userId })
          .then((conversationRoomIds) => {
            socket.join(conversationRoomIds)
            displayLoggerMessageForSocket('Join chat room', conversationRoomIds)
          })
          .catch((e) => {
            logger.error(getErrorMessageForSocket('connecting to socket'), e)
          })
      }

      socket.on('disconnect', (reason) => {
        displayLoggerMessageForSocket('Disconnected', reason)

        if (reason === 'io server disconnect') {
          socket.connect()
        }
      })

      socket.on(EVENTS.JOIN_ROOM, (id) => {
        socket.handshake.query.userId = id
        socket.join(id.toString())
        displayLoggerMessageForSocket('Join room', id)
      })

      socket.on(EVENTS.JOIN_CHAT_ROOM, (roomId) => {
        socket.join(roomId)
        displayLoggerMessageForSocket('Join chat room', roomId)
      })

      socket.on(EVENTS.LEAVE_CHAT_ROOM, (roomId) => {
        socket.leave(roomId)
        displayLoggerMessageForSocket('Leave chat room', roomId)
      })

      socket.on(EVENTS.JOIN_CHAT_ROOM_FOR_OTHER_USERS, ({ userIds, roomId, messageToBeSent, senderId }) => {
        displayLoggerMessageForSocket('Join chat room for others', roomId)

        for (const userId of userIds) {
          const clientSet = io.sockets.adapter.rooms.get(userId)

          if (clientSet && clientSet.size) {
            const iterator = clientSet.values()
            const firstValue = iterator && iterator.next()
            const clientSocket = io.sockets.sockets.get(firstValue && firstValue.value)
            clientSocket.join(roomId)

            displayLoggerMessageForSocket(`Join chat room ${roomId} for user id`, userId)
          }
        }

        if (senderId && messageToBeSent) {
          io.to(senderId).emit(EVENTS.SEND_MESSAGE_TO_ROOM, messageToBeSent)
          displayLoggerMessageForSocket('Send message to room from', senderId)
        }
      })

      socket.on(EVENTS.LEAVE_CHAT_ROOM_FOR_OTHER_USER, ({ userId, roomId }) => {
        displayLoggerMessageForSocket('Leave chat room for others', roomId)
        io.to(userId).emit(EVENTS.LEAVE_CHAT_ROOM_FOR_SELF, roomId)
      })

      socket.on(EVENTS.SEND_NOTIFICATION, async ({ to, message, from, notifyEmail, subject, smsText }) => {
        displayLoggerMessageForSocket('Send notification', message)

        try {
          const notification = await addUserNotification({ user_id: to, notice: message, record_id: from })
          io.to(to.toString()).emit(EVENTS.RECEIVE_NOTIFICATION, notification)

          const data = await getUserDetailsByUserId({ user_id: to })
          notifyEmail = notifyEmail || (data && data.notifyEmail)

          // For sending Email Notification
          if (data && data.emailId && notifyEmail) {
            await SendNotificationMailService.execute({
              email_id: data.emailId,
              subject,
              message
            })
          }

          // For sending SMS Notification
          if (data && data.notifySms && data.mobileNumber && smsText) {
            await SendSmsNotificationService.execute({
              mobile_number: data.mobileNumber,
              message: smsText
            })
          }
        } catch (e) {
          logger.error(getErrorMessageForSocket('adding user notification'), e)
        }
      })

      socket.on(EVENTS.DELETE_NOTIFICATION, async ({ to, message, from }) => {
        displayLoggerMessageForSocket('Delete notification', message)

        try {
          const data = await deleteNotification({ user_id: to, notice: message, record_id: from })
          io.to(to.toString()).emit(EVENTS.REMOVE_NOTIFICATION, data)
        } catch (e) {
          logger.error(getErrorMessageForSocket('deleting user notification'), e)
        }
      })

      socket.on(EVENTS.SEND_MESSAGE, async ({ to, messages, from, dataType, payload }) => {
        displayLoggerMessageForSocket('Send message', to)

        try {
          let newMessages = []
          if (messages && messages.length) {
            const conversation_id = parseInt(to && to.slice(2))

            newMessages = await addUserMessages({ messages, conversation_id })

            const promiseArray = [
              () => updateXQodUserConversationsStatus({
                conversation_id,
                user_id: payload.userIds,
                all_read: false
              }),
              () => markMessagesAsUnread({
                userIds: payload.userIds,
                messageIds: newMessages && newMessages.map((message) => message.newMessageId)
              })
            ]

            await Promise.all(promiseArray.map(promise => promise()))
          }

          io.in(to).emit(EVENTS.RECEIVE_MESSAGE, { to, messages: newMessages, from, dataType, payload })
        } catch (e) {
          logger.error(getErrorMessageForSocket('adding user message'), e)
        }
      })
    })

    instrument(io, { auth: false })
  } catch (e) {
    logger.error(getErrorMessageForSocket('connecting to socket'), e)
  }
}

export default createSocketConnection
