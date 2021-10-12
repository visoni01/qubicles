import _ from 'lodash'
import WebSocket from '.'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'
import { getConversationIdFromRoomId, receiveMessageEventCallback } from './helper'
import { addNewNotification, deleteNotification } from '../redux-saga/redux/user'
import { updateAllChats, updateConversations } from '../redux-saga/redux/chat'

const receiveNotification = {
  event: EVENTS.RECEIVE_NOTIFICATION,
  callback: (notification) => {
    store.dispatch(addNewNotification({ notification }))
  },
}

const removeNotification = {
  event: EVENTS.REMOVE_NOTIFICATION,
  callback: (data) => {
    store.dispatch(deleteNotification(data))
  },
}

const receiveMessage = {
  event: EVENTS.RECEIVE_MESSAGE,
  callback: receiveMessageEventCallback,
}

const leaveChatRoomForSelf = {
  event: EVENTS.LEAVE_CHAT_ROOM_FOR_SELF,
  callback: (roomId) => {
    WebSocket.leaveChatRoom(roomId)
  },
}

const sendMessageToRoom = {
  event: EVENTS.SEND_MESSAGE_TO_ROOM,
  callback: (messageToBeSent) => {
    WebSocket.sendMessage(messageToBeSent)
  },
}

const sendMessageError = {
  event: EVENTS.SEND_MESSAGE_ERROR,
  callback: ({
    to, messageId, error, isLatestMessage,
  }) => {
    const conversationId = getConversationIdFromRoomId(to)

    store.dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'update-error-flag',
      conversationId,
      messageId,
      error: true,
    }))

    if (_.isUndefined(error) || (error === false && isLatestMessage)) {
      store.dispatch(updateAllChats({
        requestType: 'UPDATE',
        dataType: 'update-error-flag',
        conversationId,
        error: true,
      }))
    }
  },
}

const startTyping = {
  event: EVENTS.START_TYPING,
  callback: ({ conversationId, newActiveUser }) => {
    store.dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'add-typing-user',
      conversationId,
      newActiveUser,
    }))
  },
}

const stopTyping = {
  event: EVENTS.STOP_TYPING,
  callback: ({ conversationId, removedUserId }) => {
    store.dispatch(updateConversations({
      requestType: 'UPDATE',
      dataType: 'remove-typing-user',
      conversationId,
      removedUserId,
    }))
  },
}

export default [
  receiveNotification, removeNotification, receiveMessage, leaveChatRoomForSelf, sendMessageToRoom, sendMessageError,
  startTyping, stopTyping,
]
