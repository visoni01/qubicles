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
