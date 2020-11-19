export const USER_ROUTE = '/users/'
export const JOB_ROUTE = '/new/people/job'

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
  JOB_POST: `${ JOB_ROUTE }/post/:jobId`,
  NEW_JOB: `${ JOB_ROUTE }/create`,
  VIEW_RESUME: '/new/people/view-resume',
  CREATE_COURSE: '/new/people/course/create',
  VIEW_COURSE: '/new/people/course/view',
  VIEW_JOB_APPLICATION: '/new/people/job/application',
  EDIT_JOB: `${ JOB_ROUTE }/:jobId/edit`,
}

export default ROUTE_PATHS
