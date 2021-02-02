export const USER_ROUTE = '/users/'
export const PEOPLE_ROUTE = '/people'
export const PROGRAMS_NAVIGATION_ROUTE = '/programs'
export const INSIGHTS_NAVIGATION_ROUTE = '/insights'
export const SETTINGS_NAVIGATION_ROUTE = '/settings'
export const JOB_ROUTE = `${ PEOPLE_ROUTE }/job`
export const JOB_POST_ROUTE = `${ PEOPLE_ROUTE }/job/view`
export const VIEW_RESUME_ROUTE = `${ PEOPLE_ROUTE }/talent/resume`
export const PROFILE_ROUTE = '/profile'

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
  RESET_EMAIL: '/reset-email/:token',
  RESET_NEW_PASSWORD: '/reset-new-password',
  DASHBOARD: '/dashboard',
  POST_SIGN_UP: '/post-signup',
  INVITE_LINK: '/invite/:walletId',
  INVITE_CALLBACK: '/invite-gmail/callback',
  AUTH: '/auth',
  GROUP: '/group',
  JOB_POST: `${ JOB_ROUTE }/post/:jobId`,
  NEW_JOB: `${ JOB_ROUTE }/create`,
  VIEW_RESUME: `${ VIEW_RESUME_ROUTE }/:candidateId`,
  CREATE_COURSE: `${ PEOPLE_ROUTE }/course/create`,
  VIEW_COURSE: `${ PEOPLE_ROUTE }/course/view`,
  VIEW_JOB_APPLICATION: `${ PEOPLE_ROUTE }/job/application`,
  EDIT_JOB: `${ JOB_ROUTE }/:jobId/edit`,
  PEOPLE_TALENT_TAB: `${ PEOPLE_ROUTE }/talent`,
  PEOPLE_APPLICATIONS_TAB: `${ PEOPLE_ROUTE }/applications`,
  PEOPLE_JOBS_TAB: `${ PEOPLE_ROUTE }/jobs`,
  PEOPLE_TRAINING_TAB: `${ PEOPLE_ROUTE }/training`,
  JOB_PREVIEW: `${ JOB_ROUTE }/preview`,
  OTHER_COMPANY_FEED: `${ PROFILE_ROUTE }/:companyId/feed`,
  OTHER_COMPANY_ABOUT: `${ PROFILE_ROUTE }/:companyId/about`,
  WALLET: '/wallet',
}

export default ROUTE_PATHS
