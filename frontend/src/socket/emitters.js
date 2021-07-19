import { EVENTS } from '../utils/messages'

const sendNotification = {
  method: 'sendNotification',
  event: EVENTS.SEND_NOTIFICATION,
}

const joinRoom = {
  method: 'joinRoom',
  event: EVENTS.JOIN_ROOM,
}

export default [ sendNotification, joinRoom ]
