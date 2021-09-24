import WebSocket from '.'
import store from '../redux-saga/store'
import { EVENTS } from '../utils/messages'
import { receiveMessageEventCallback } from './helper'
import { addNewNotification, deleteNotification } from '../redux-saga/redux/user'

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

const joinChatRoomForSelf = {
  event: EVENTS.JOIN_CHAT_ROOM_FOR_SELF,
  callback: (roomId) => {
    WebSocket.joinChatRoom(roomId)
  },
}

const leaveChatRoomForSelf = {
  event: EVENTS.LEAVE_CHAT_ROOM_FOR_SELF,
  callback: (roomId) => {
    WebSocket.leaveChatRoom(roomId)
  },
}

export default [ receiveNotification, removeNotification, receiveMessage, joinChatRoomForSelf, leaveChatRoomForSelf ]
