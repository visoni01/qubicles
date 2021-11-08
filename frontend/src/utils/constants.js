export const MESSAGES = {
  UNAUTHORIZED: 'You don\'t have permission to perform this action.',
  ERROR: 'An error occurred while processing your request. Please try again later.',
  SUCCESS: 'Request has been processed successfully.',
  INVALID_IMAGE_FILE_SIZE: 'File size should not be greater than 1 MB!',
}

export const USERS = {
  EMPLOYER: 'employer',
  AGENT: 'agent',
  TRAINER: 'trainer',
  SUPERVISOR: 'supervisor',
  QA_SUPPORT: 'qa-support',
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

export const REQUEST_TYPES = {
  FETCH: 'FETCH',
  UPDATE: 'UPDATE',
  CREATE: 'CREATE',
  DELETE: 'DELETE',
  ADD: 'ADD',
}

export const NOTIFICATION_MESSAGES = {
  FOLLOW: 'FOLLOW',
  CANCEL_APPLICATION: 'CANCEL_APPLICATION',
  INVITE_FOR_JOB: 'INVITE_FOR_JOB',
  HIRE_FOR_JOB: 'HIRE_FOR_JOB',
  JOB_APPLIED: 'JOB_APPLIED',
  ACCEPT_JOB_INVITATION: 'ACCEPT_JOB_INVITATION',
  RESIGN_JOB: 'RESIGN_JOB',
  REFERRAL_SIGNUP: 'REFERRAL_SIGNUP',
}

export const CHAT_NOTIFICATION_MESSAGES = {
  NEW_CHAT: 'NEW_CHAT',
  NEW_GROUP: 'NEW_GROUP',
  ADD_PEOPLE: 'ADD_PEOPLE',
  REMOVE_PERSON: 'REMOVE_PERSON',
  ADD_GROUP_NAME: 'ADD_GROUP_NAME',
  REMOVE_GROUP_NAME: 'REMOVE_GROUP_NAME',
  CHANGE_GROUP_NAME: 'CHANGE_GROUP_NAME',
  LEAVE_GROUP: 'LEAVE_GROUP',
}
