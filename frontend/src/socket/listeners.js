import _ from 'lodash'
import WebSocket from '.'
import store from '../redux-saga/store'
import { EVENTS, REQUEST_TYPES } from '../utils/constants'
import { getConversationIdFromRoomId, receiveMessageEventCallback } from './helper'
import { addNewNotification, deleteNotification } from '../redux-saga/redux/user'
import { updateAllChats, updateConversations } from '../redux-saga/redux/chat'
import { ADD_TYPING_USER, REMOVE_TYPING_USER, UPDATE_ERROR_FLAG } from '../redux-saga/redux/constants'

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
    to, messageId, error, isLatestMessage, isLatestMessageError,
  }) => {
    const conversationId = getConversationIdFromRoomId(to)

    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: UPDATE_ERROR_FLAG,
      conversationId,
      messageId,
      error: true,
    }))

    if (_.isUndefined(error) || isLatestMessage || isLatestMessageError) {
      store.dispatch(updateAllChats({
        requestType: REQUEST_TYPES.UPDATE,
        dataType: UPDATE_ERROR_FLAG,
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
      requestType: REQUEST_TYPES.UPDATE,
      dataType: ADD_TYPING_USER,
      conversationId,
      newActiveUser,
    }))
  },
}

const stopTyping = {
  event: EVENTS.STOP_TYPING,
  callback: ({ conversationId, removedUserId }) => {
    store.dispatch(updateConversations({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: REMOVE_TYPING_USER,
      conversationId,
      removedUserId,
    }))
  },
}

const authenticationFailure = {
  event: EVENTS.AUTHENTICATION_FAILURE,
  callback: () => {
    window.location = `/login?return_url=${ window.location.pathname }`
  },
}

export default [
  receiveNotification, removeNotification, receiveMessage, leaveChatRoomForSelf, sendMessageToRoom, sendMessageError,
  startTyping, stopTyping, authenticationFailure,
]
