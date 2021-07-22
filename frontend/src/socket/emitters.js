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

export default [ joinRoom, sendNotification, deleteNotification ]
