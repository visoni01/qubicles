import React from 'react'
import Auth from '../components/User/Auth'
import ROUTE_PATHS, { PEOPLE_ROUTE } from './routesPath'

const routes = [
  {
    path: ROUTE_PATHS.HOME,
    component: React.lazy(() => import('../containers/Home')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.AGENTS,
    component: React.lazy(() => import('../components/Home/agents')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.CONTACT_CENTERS,
    component: React.lazy(() => import('../components/Home/contactCenter')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.CONTACT_US,
    component: React.lazy(() => import('../components/Home/contactUs')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: React.lazy(() => import('../components/Home/aboutUs')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    component: React.lazy(() => import('../containers/User/Signup/SignUp')),
    redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.LOG_IN,
    component: React.lazy(() => import('../containers/Login')),
    redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_EMAIL,
    component: React.lazy(() => import('../containers/EmailVerification')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.FORGET_PASSWORD,
    component: React.lazy(() => import('../containers/ForgetPassword')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_TOKEN,
    component: React.lazy(() => import('../containers/User/Signup/EmailVerification')),
    // redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.RESET_EMAIL,
    component: React.lazy(() => import('../containers/User/Signup/EmailVerification')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.RESET_NEW_PASSWORD,
    component: React.lazy(() => import('../containers/ForgetPassword/ResetNewPassword')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: React.lazy(() => import('../containers/Dashboard')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.POST_SIGN_UP,
    component: React.lazy(() => import('../containers/User/Signup/PostSignUp')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.INVITE_LINK,
    component: React.lazy(() => import('../containers/InviteFriendsPage/handleInvite')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.AUTH,
    component: Auth,
    exact: true,
  },
  {
    path: ROUTE_PATHS.GROUP,
    component: React.lazy(() => import('../containers/Forum')),
    auth: true,
    exact: true,
  },
  // Added extra route for new people design, Remove it when people's pages get completely ready.
  {
    path: PEOPLE_ROUTE,
    component: React.lazy(() => import('../containers/People/ContactCenter/Navigation/PeopleNavigation')),
    auth: true,
    exact: true,
  },
  // Added extra route for new contact-center jobPost design.
  {
    path: ROUTE_PATHS.JOB_POST,
    component: React.lazy(() => import('../containers/People/ContactCenter/Jobs/JobView')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.JOB_PREVIEW,
    component: React.lazy(() => import('../components/People/ContactCenter/Jobs/JobPreview')),
    auth: true,
    exact: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: ROUTE_PATHS.NEW_JOB,
    component: React.lazy(() => import('../containers/People/ContactCenter/Jobs/NewJob/index')),
    auth: true,
    exact: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: [ ROUTE_PATHS.PEOPLE_JOBS_TAB, ROUTE_PATHS.PEOPLE_TALENT_TAB, ROUTE_PATHS.PEOPLE_TRAINING_TAB ],
    component: React.lazy(() => import('../containers/People/ContactCenter/index')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.EDIT_JOB,
    component: React.lazy(() => import('../containers/People/ContactCenter/Jobs/EditJob')),
    auth: true,
    exact: true,
  },
  // Temporarily added extra route for new contact-center talent viewResume design.
  {
    path: ROUTE_PATHS.VIEW_RESUME,
    component: React.lazy(() => import('../containers/People/ContactCenter/Talent/ViewResume')),
    exact: true,
  },
  // Added extra route for new contact-center jobPost design.
  {
    path: ROUTE_PATHS.CREATE_COURSE,
    component: React.lazy(() => import('../containers/People/ContactCenter/Training/NewCourse/index')),
    auth: true,
    exact: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: ROUTE_PATHS.VIEW_COURSE,
    component: React.lazy(() => import('../containers/People/ContactCenter/Training/ViewCourse/index')),
    auth: true,
    exact: true,
  },
  // Temporarily added extra route for new contact-center Job application design.
  {
    path: ROUTE_PATHS.VIEW_JOB_APPLICATION,
    component: React.lazy(() => import('../containers/People/ContactCenter/Talent/Application/JobApplicationPage')),
    auth: true,
    exact: true,
  },
  // Company Profile
  {
    path: ROUTE_PATHS.COMPANY_PROFILE,
    component: React.lazy(() => import('../containers/Profile/Company')),
    auth: true,
    exact: true,
  },
  // Other Company profile
  {
    path: [ ROUTE_PATHS.OTHER_COMPANY_FEED, ROUTE_PATHS.OTHER_COMPANY_ABOUT ],
    component: React.lazy(() => import('../containers/Profile/OtherCompany/index')),
    auth: true,
    exact: true,
  },
]

export default routes
