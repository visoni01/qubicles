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

const leaveChatRoomForSelf = {
  event: EVENTS.LEAVE_CHAT_ROOM_FOR_SELF,
  callback: (roomId) => {
    WebSocket.leaveChatRoom(roomId)
  },
}

const sendMessageToRoom = {
  event: EVENTS.SEND_MESSSAGE_TO_ROOM,
  callback: (messageToBeSent) => {
    WebSocket.sendMessage(messageToBeSent)
  },
}

export default [
  receiveNotification, removeNotification, receiveMessage, leaveChatRoomForSelf, sendMessageToRoom,
]
