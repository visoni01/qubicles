import React from 'react'
import Auth from '../components/User/Auth'
import ROUTE_PATHS from './routesPath'

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
  // Added extra route for new groups design, Remove it when groups page completely ready.
  {
    path: `/new${ ROUTE_PATHS.GROUP }`,
    component: React.lazy(() => import('../containers/Groups')),
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
    component: React.lazy(() => import('../containers/CommunicationForums')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.GROUP_CHANNEL,
    component: React.lazy(() => import('../containers/CommunicationForums/forumChannel')),
    auth: false,
  },
  {
    path: ROUTE_PATHS.GROUP_TOPIC,
    component: React.lazy(() => import('../containers/CommunicationForums/forumTopic')),
    auth: true,
  },
  {
    path: ROUTE_PATHS.PEOPLE,
    component: React.lazy(() => import('../containers/People')),
    auth: true,
  },
  // Added extra route for new people design, Remove it when people's pages get completely ready.
  {
    path: ROUTE_PATHS.NEW_PEOPLE,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/index')),
    auth: true,
  },
  // Added extra route for new contact-center jobPost design.
  {
    path: ROUTE_PATHS.JOB_POST,
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Jobs/JobView')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: '/new/people/apply-job',
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Jobs/NewJob')),
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
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Training/Course/NewCourse/index')),
    auth: true,
  },
  // Temporarily added extra route for new contact-center newJob design.
  {
    path: '/new/people/training',
    component: React.lazy(() => import('../containers/NewPeople/ContactCenter/Training/CoursePage')),
    auth: true,
  },
]

export default routes
