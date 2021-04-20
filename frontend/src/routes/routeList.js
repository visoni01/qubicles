import { lazy } from 'react'
import Auth from '../components/User/auth'
import ROUTE_PATHS, {
  PEOPLE_ROUTE, PROFILE_ROUTE, PROGRAMS_NAVIGATION_ROUTE,
  INSIGHTS_NAVIGATION_ROUTE, SETTINGS_NAVIGATION_ROUTE, COMPANY_PROFILE_ROUTE,
} from './routesPath'

const routes = [
  {
    path: ROUTE_PATHS.HOME,
    component: lazy(() => import('../containers/Home')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.AGENTS,
    component: lazy(() => import('../components/Home/agents')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.CONTACT_CENTERS,
    component: lazy(() => import('../components/Home/contactCenter')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.CONTACT_US,
    component: lazy(() => import('../components/Home/contactUs')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: lazy(() => import('../components/Home/aboutUs')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    component: lazy(() => import('../containers/User/Signup/SignUp')),
    redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.LOG_IN,
    component: lazy(() => import('../containers/Login')),
    redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_EMAIL,
    component: lazy(() => import('../containers/EmailVerification')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.FORGET_PASSWORD,
    component: lazy(() => import('../containers/ForgetPassword')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_TOKEN,
    component: lazy(() => import('../containers/User/Signup/EmailVerification')),
    // redirectToDashboard: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.RESET_EMAIL,
    component: lazy(() => import('../containers/User/Signup/EmailVerification')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.RESET_NEW_PASSWORD,
    component: lazy(() => import('../containers/ForgetPassword/resetNewPassword')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: lazy(() => import('../containers/Dashboard')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.POST_SIGN_UP,
    component: lazy(() => import('../containers/User/Signup/PostSignUp')),
    auth: true,
    exact: true,
  },
  {
    path: ROUTE_PATHS.INVITE_LINK,
    component: lazy(() => import('../containers/InviteFriendsPage/handleInvite')),
    exact: true,
  },
  {
    path: ROUTE_PATHS.AUTH,
    component: Auth,
    exact: true,
  },
  {
    path: ROUTE_PATHS.GROUP,
    component: lazy(() => import('../containers/Forum')),
    auth: true,
    exact: true,
  },
  // Navigation Route for people, group, and network.
  {
    path: [
      PEOPLE_ROUTE,
      PROGRAMS_NAVIGATION_ROUTE,
      INSIGHTS_NAVIGATION_ROUTE,
      SETTINGS_NAVIGATION_ROUTE,
    ],
    component: lazy(() => import('../containers/Navigation')),
    auth: true,
    exact: true,
  },
  // People feature
  {
    path: PEOPLE_ROUTE,
    component: lazy(() => import('./featureRoutesLists/people')),
    auth: true,
    exact: false,
  },
  // Profile feature
  {
    path: [ PROFILE_ROUTE, COMPANY_PROFILE_ROUTE ],
    component: lazy(() => import('./featureRoutesLists/profile')),
    auth: true,
    exact: false,
  },
  // Invite Gmail Callback
  {
    path: ROUTE_PATHS.INVITE_CALLBACK,
    component: lazy(() => import('../containers/InviteFriendsPage/InviteSuccess')),
    auth: true,
    exact: true,
    propsToPass: { inviteSuccess: true },
  },
  // Wallet
  {
    path: [ ROUTE_PATHS.WALLET ],
    component: lazy(() => import('../containers/Wallet/index')),
    auth: true,
    exact: true,
  },
]

export default routes
