import { Profiler } from 'react'

export const USER_ROUTE = '/users/'
export const JOB_ROUTE = '/new/people/job'
export const JOB_POST_ROUTE = '/new/people/job/view'
export const VIEW_RESUME_ROUTE = '/new/people/talent/resume'
export const NEW_PEOPLE = '/new/people'
export const OTHER_COMPANY_PROFILE_ROUTE = '/profile/company'

// export const getOtherCompanyProfileRoute = ({ companyId }) => `${ OTHER_COMPANY_PROFILE_ROUTE }/${ companyId }`

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
  AUTH: '/auth',
  GROUP: '/group',
  PEOPLE: '/people',
  NEW_PEOPLE: '/new/people',
  JOB_POST: `${ JOB_ROUTE }/post/:jobId`,
  NEW_JOB: `${ JOB_ROUTE }/create`,
  VIEW_RESUME: `${ VIEW_RESUME_ROUTE }/:candidateId`,
  CREATE_COURSE: '/new/people/course/create',
  VIEW_COURSE: '/new/people/course/view',
  VIEW_JOB_APPLICATION: '/new/people/job/application',
  EDIT_JOB: `${ JOB_ROUTE }/:jobId/edit`,
  PEOPLE_TALENT_TAB: `${ NEW_PEOPLE }/talent`,
  PEOPLE_JOBS_TAB: `${ NEW_PEOPLE }/jobs`,
  PEOPLE_TRAINING_TAB: `${ NEW_PEOPLE }/training`,
  COMPANY_PROFILE: '/profile/company',
  JOB_PREVIEW: `${ JOB_ROUTE }/preview`,
  OTHER_COMPANY_FEED: `${ OTHER_COMPANY_PROFILE_ROUTE }/:companyId/feed`,
  OTHER_COMPANY_ABOUT: `${ OTHER_COMPANY_PROFILE_ROUTE }/:companyId/about`,
}

export default ROUTE_PATHS
