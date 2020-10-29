export const USER_ROUTE = '/users/'
export const GROUP_ROUTE = '/group/'
export const GROUP_CHANNEL_ROUTE = '/group/channels/'
export const GROUP_TOPIC_ROUTE = '/group/topics/'

const ROUTE_PATHS = {
  HOME: '/',
  AGENTS: '/agents',
  CONTACT_CENTERS: '/contactcenters',
  CONTACT_US: '/contactus',
  ABOUT: '/about',
  SIGN_UP: '/signup',
  LOG_IN: '/login',
  VERIFY_EMAIL: '/verify-email',
  FORGET_PASSWORD: '/forget-password',
  VERIFY_TOKEN: '/verify-token/:token',
  RESET_NEW_PASSWORD: '/reset-new-password',
  DASHBOARD: '/dashboard',
  POST_SIGN_UP: '/post-signup',
  INVITE_LINK: '/invite/:walletId',
  AUTH: '/auth',
  GROUP: GROUP_ROUTE,
  GROUP_CHANNEL: `${ GROUP_CHANNEL_ROUTE }:channelId`,
  GROUP_TOPIC: `${ GROUP_TOPIC_ROUTE }:topicId`,
  PEOPLE: '/people',
  NEW_PEOPLE: '/new/people',
  JOB_POST: '/new/people/jobpost',
  NEW_JOB: '/new/people/new-job',
  VIEW_RESUME: '/new/people/view-resume',
  CREATE_COURSE: '/new/people/course/create',
  VIEW_COURSE: '/new/people/course/view',
}

export default ROUTE_PATHS
