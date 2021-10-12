const MESSAGES = {
  UNAUTHORIZED: 'You don\'t have permission to perform this action.',
  ERROR: 'An error occurred while processing your request. Please try again later.',
  SUCCESS: 'Request has been processed successfully.',
}

export const EVENTS = {
  JOIN_ROOM: 'join-room',
  SEND_NOTIFICATION: 'send-notification',
  RECEIVE_NOTIFICATION: 'receive-notification',
  DELETE_NOTIFICATION: 'delete-notification',
  REMOVE_NOTIFICATION: 'remove-notification',
  SEND_MESSAGE: 'send-message',
  RECEIVE_MESSAGE: 'receive-message',
  JOIN_CHAT_ROOM: 'join-chat-room',
  LEAVE_CHAT_ROOM: 'leave-chat-room',
  JOIN_CHAT_ROOM_FOR_OTHER_USERS: 'join-chat-room-for-other-users',
  LEAVE_CHAT_ROOM_FOR_OTHER_USER: 'leave-chat-room-for-other-user',
  LEAVE_CHAT_ROOM_FOR_SELF: 'leave-chat-room-for-self',
  SEND_MESSAGE_TO_ROOM: 'send-message-to-room',
  SEND_MESSAGE_ERROR: 'send-message-error',
  START_TYPING: 'start-typing',
  STOP_TYPING: 'stop-typing',
  AUTHENTICATION_FAILURE: 'authentication-failure',
}

export const SUBJECTS = {
  FOLLOW: 'New Follower',
  JOB_APPLIED: 'New Job Entry',
  ACCEPT_JOB_INVITATION: 'Accepted Job Invitaion',
  RESIGN_JOB: 'Resignation Mail',
  JOB_APPLICATION_CANCELLED: 'Job Application Cancelled',
  HIRED_BY_COMPANY: 'Hired By Company',
  JOB_INVITATION: 'New Job Invitation',
  REFER_USER: 'Reward Inside',
}

export default MESSAGES
