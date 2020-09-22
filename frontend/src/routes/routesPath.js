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
  VERIFY_TOKEN: '/verify-token/:token',
  DASHBOARD: '/dashboard',
  POST_SIGN_UP: '/post-signup',
  INVITE_FRIEND: '/invite-friends',
  INVITE_LINK: '/invite/:walletId',
  AUTH: '/auth',
  GROUP: GROUP_ROUTE,
  GROUP_CHANNEL: `${ GROUP_CHANNEL_ROUTE }:channelId`,
  GROUP_TOPIC: `${ GROUP_TOPIC_ROUTE }:topicId`,
  PEOPLE: '/people',
}

export default ROUTE_PATHS
