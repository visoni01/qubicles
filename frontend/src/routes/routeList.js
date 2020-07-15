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
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import ForumGroup from '../container/CommunicationForums'
import ForumChannel from '../container/CommunicationForums/channelView'

const routes = [
  {
    path: '/',
    component: Home,
    exact: true,
  },
  {
    path: '/agents',
    component: Agents,
    exact: true,
  },
  {
    path: '/contactcenters',
    component: ContactCenter,
    exact: true,
  },
  {
    path: '/contactus',
    component: ContactUs,
    exact: true,
  },
  {
    path: '/about',
    component: AboutUs,
    exact: true,
  },
  {
    path: '/signup',
    component: Signup,
    exact: true,
  },
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/verify-token/:token',
    component: EmailVerification,
    exact: true,
  },
  {
    path: '/dashboard',
    component: Dashboard,
    exact: true,
  },
  {
    path: '/post-signup',
    component: PostSignUp,
    exact: true,
  },
  {
    path: '/invite-friends',
    component: InviteFriends,
    exact: true,
  },
  {
    path: '/auth',
    // eslint-disable-next-line react/display-name
    render: (props) => <Auth { ...props } />,
    exact: true,
  },
  {
    path: '/group',
    component: ForumGroup,
    exact: true,
  },
  {
    path: '/group/channels/:channelId',
    component: ForumChannel,
    exact: true,
  },
  {
    path: '/people',
    component: People,
    exact: true,
  },
]

export default routes
