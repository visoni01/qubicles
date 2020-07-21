import React from 'react'
import Dashboard from '../container/Dashboard'
import { Signup, EmailVerification, PostSignUp } from '../container/User/Signup'
import InviteFriends from '../container/InviteFriendsPage'
import {
  Home, Agents, ContactCenter, ContactUs, AboutUs,
} from '../container/Home'
import People from '../container/People'
import Login from '../container/Login'
import Auth from '../components/User/Auth'
import ForumGroup from '../container/CommunicationForums'
import ForumChannel from '../container/CommunicationForums/forumChannel'
import ForumTopic from '../container/CommunicationForums/forumTopic'
import ROUTE_PATHS from './routesPath'

const routes = [
  {
    path: ROUTE_PATHS.Home,
    component: Home,
  },
  {
    path: ROUTE_PATHS.AGENTS,
    component: Agents,
  },
  {
    path: ROUTE_PATHS.CONTACT_CENTERS,
    component: ContactCenter,
  },
  {
    path: ROUTE_PATHS.CONTACT_US,
    component: ContactUs,
  },
  {
    path: ROUTE_PATHS.ABOUT,
    component: AboutUs,
  },
  {
    path: ROUTE_PATHS.SIGN_UP,
    component: Signup,
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.LOG_IN,
    component: Login,
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.VERIFY_TOKEN,
    component: EmailVerification,
    redirectToDashboard: true,
  },
  {
    path: ROUTE_PATHS.DASHBOARD,
    component: Dashboard,
    auth: true,
  },
  {
    path: ROUTE_PATHS.POST_SIGN_UP,
    component: PostSignUp,
    auth: true,
  },
  {
    path: ROUTE_PATHS.INVITE_FRIEND,
    component: InviteFriends,
    auth: true,
  },
  {
    path: ROUTE_PATHS.AUTH,
    component: Auth,
  },
  {
    path: ROUTE_PATHS.GROUP,
    component: ForumGroup,
    auth: true,
  },
  {
    path: ROUTE_PATHS.GROUP_CHANNEL,
    component: ForumChannel,
    auth: true,
  },
  {
    path: ROUTE_PATHS.GROUP_TOPIC,
    component: ForumTopic,
    auth: true,
  },
  {
    path: ROUTE_PATHS.PEOPLE,
    component: People,
    auth: true,
  },
]

export default routes
