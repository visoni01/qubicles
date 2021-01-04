import React, { lazy } from 'react'
import Auth from '../components/User/Auth'
import ROUTE_PATHS, { PEOPLE_ROUTE, PROFILE_ROUTE } from './routesPath'
import { peopleRouteList, profileRouteList } from './featureRoutesLists'

const RenderFeatureSubRoutes = (lazy(() => import('./featureSubRoutes')))

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
  // Navigation Route for people, group, and network.
  {
    path: PEOPLE_ROUTE,
    component: React.lazy(() => import('../containers/People/ContactCenter/Navigation/PeopleNavigation')),
    auth: true,
    exact: true,
  },
  // // Company Profile
  // {
  //   path: ROUTE_PATHS.COMPANY_PROFILE,
  //   component: React.lazy(() => import('../containers/Profile/Company')),
  //   auth: true,
  //   exact: true,
  // },
  // // Other Company profile
  // {
  //   path: [ ROUTE_PATHS.OTHER_COMPANY_FEED, ROUTE_PATHS.OTHER_COMPANY_ABOUT ],
  //   component: React.lazy(() => import('../containers/Profile/OtherCompany/index')),
  //   auth: true,
  //   exact: true,
  // },
  // People feature routes
  {
    path: PEOPLE_ROUTE,
    component: RenderFeatureSubRoutes,
    propsToPass: { routes: peopleRouteList },
    auth: true,
    exact: false,
  },
  {
    path: PROFILE_ROUTE,
    component: RenderFeatureSubRoutes,
    propsToPass: { routes: profileRouteList },
    auth: true,
    exact: false,
  },
]

export default routes
