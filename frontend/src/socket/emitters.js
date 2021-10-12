import { EVENTS } from '../utils/messages'

const joinRoom = {
  method: 'joinRoom',
  event: EVENTS.JOIN_ROOM,
}

const sendNotification = {
  method: 'sendNotification',
  event: EVENTS.SEND_NOTIFICATION,
}

const deleteNotification = {
  method: 'deleteNotification',
  event: EVENTS.DELETE_NOTIFICATION,
}

const sendMessage = {
  method: 'sendMessage',
  event: EVENTS.SEND_MESSAGE,
}

const joinChatRoom = {
  method: 'joinChatRoom',
  event: EVENTS.JOIN_CHAT_ROOM,
}

const leaveChatRoom = {
  method: 'leaveChatRoom',
  event: EVENTS.LEAVE_CHAT_ROOM,
}

const joinChatRoomForOtherUsers = {
  method: 'joinChatRoomForOtherUsers',
  event: EVENTS.JOIN_CHAT_ROOM_FOR_OTHER_USERS,
}

const leaveChatRoomForOtherUser = {
  method: 'leaveChatRoomForOtherUser',
  event: EVENTS.LEAVE_CHAT_ROOM_FOR_OTHER_USER,
}

const startTyping = {
  method: 'startTyping',
  event: EVENTS.START_TYPING,
}

const stopTyping = {
  method: 'stopTyping',
  event: EVENTS.STOP_TYPING,
}

export default [
  joinRoom, sendNotification, deleteNotification, sendMessage, joinChatRoom, leaveChatRoom, joinChatRoomForOtherUsers,
  leaveChatRoomForOtherUser, startTyping, stopTyping,
]
