export const USER_ROUTE = '/users/'
export const GROUP = '/group/'
export const GROUP_CHANNEL = '/group/channels/'
export const GROUP_TOPIC = '/group/topics/'

const ROUTE_PATHS = {
  Home: '/',
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
  AUTH: '/auth',
  GROUP,
  GROUP_CHANNEL: `${ GROUP_CHANNEL }:channelId`,
  GROUP_TOPIC: `${ GROUP_TOPIC }:topicId`,
  PEOPLE: '/people',
}

export default ROUTE_PATHS
