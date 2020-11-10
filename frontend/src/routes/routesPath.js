export const USER_ROUTE = '/users/'
export const JOB_POST_ROUTE = '/new/people/job/view'

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
  GROUP: '/group',
  PEOPLE: '/people',
  NEW_PEOPLE: '/new/people',
  JOB_POST: `${ JOB_POST_ROUTE }/:jobId`,
  NEW_JOB: '/new/people/new-job',
  VIEW_RESUME: '/new/people/view-resume',
  CREATE_COURSE: '/new/people/course/create',
  VIEW_COURSE: '/new/people/course/view',
  VIEW_JOB_APPLICATION: '/new/people/job/application',
}

export default ROUTE_PATHS
