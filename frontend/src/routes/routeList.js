import Dashboard from '../containers/Dashboard'
import { Signup, EmailVerification, PostSignUp } from '../containers/User/Signup'
import InviteFriends from '../containers/InviteFriendsPage'
import {
  Home, Agents, ContactCenter, ContactUs, AboutUs,
} from '../containers/Home'
import People from '../containers/People'
import Login from '../containers/Login'
import Auth from '../components/User/Auth'
import ForumGroup from '../containers/CommunicationForums'
import ForumChannel from '../containers/CommunicationForums/forumChannel'
import ForumTopic from '../containers/CommunicationForums/forumTopic'
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
