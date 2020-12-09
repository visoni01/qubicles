import React from 'react'
import Auth from '../components/User/Auth'
import ROUTE_PATHS, { NEW_PEOPLE } from './routesPath'

const routes = [
  {
    path: ROUTE_PATHS.HOME,
    component: React.lazy(() => import('../containers/Home')),
  },
  {
    path: ROUTE_PATHS.AGENTS,
    component: React.lazy(() => import('../components/Home/agents')),
  },
  {
    path: ROUTE_PATHS.CONTACT_CENTERS,
    component: React.lazy(() => import('../components/Home/contactCenter')),
  },
  {
    path: ROUTE_PATHS.CONTACT_US,
    component: React.lazy(() => import('../components/Home/contactUs')),
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: React.lazy(() => import('../components/Home/aboutUs')),
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    component: React.lazy(() => import('../containers/User/Signup/SignUp')),
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.LOG_IN,
    component: React.lazy(() => import('../containers/Login')),
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_EMAIL,
    component: React.lazy(() => import('../containers/EmailVerification')),
  },
  {
    path: ROUTE_PATHS.FORGET_PASSWORD,
    component: React.lazy(() => import('../containers/ForgetPassword')),
  },
  {
    path: ROUTE_PATHS.VERIFY_TOKEN,
    component: React.lazy(() => import('../containers/User/Signup/EmailVerification')),
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.RESET_NEW_PASSWORD,
    component: React.lazy(() => import('../containers/ForgetPassword/ResetNewPassword')),
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: React.lazy(() => import('../containers/Dashboard')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.POST_SIGN_UP,
    component: React.lazy(() => import('../containers/User/Signup/PostSignUp')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.INVITE_LINK,
    component: React.lazy(() => import('../containers/InviteFriendsPage/handleInvite')),
  },
  {
    path: ROUTE_PATHS.AUTH,
    component: Auth,
  },
  {
    path: ROUTE_PATHS.GROUP,
    component: React.lazy(() => import('../containers/Forum')),
    auth: true,
  },
  // Added extra route for new people design, Remove it when people's pages get completely ready.
  {
    path: NEW_PEOPLE,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Navigation/PeopleNavigation')),
    auth: true,
  },
  // Added extra route for new contact-center jobPost design.
  {
    path: ROUTE_PATHS.JOB_POST,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Jobs/JobView')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.JOB_PREVIEW,
    component: React.lazy(() => import('../components/People/ContactCenter/Jobs/JobPreview')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: ROUTE_PATHS.NEW_JOB,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Jobs/NewJob/index')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: ROUTE_PATHS.PEOPLE_JOBS_TAB,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/index')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.PEOPLE_TALENT_TAB,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/index')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/index')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.EDIT_JOB,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Jobs/EditJob')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center talent viewResume design.
  {
    path: ROUTE_PATHS.VIEW_RESUME,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Talent/ViewResume')),
  },
  // Added extra route for new contact-center jobPost design.
  {
    path: ROUTE_PATHS.CREATE_COURSE,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Training/NewCourse/index')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: ROUTE_PATHS.VIEW_COURSE,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Training/ViewCourse/index')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center Job application design.
  {
    path: ROUTE_PATHS.VIEW_JOB_APPLICATION,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Talent/Application/JobApplicationPage')),
    auth: true,
  },
  // Company Profile
  {
    path: ROUTE_PATHS.COMPANY_PROFILE,
    component: React.lazy(() => import('../containers/Profile/Company')),
    auth: true,
  },

]

export default routes
