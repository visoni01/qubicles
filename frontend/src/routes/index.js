import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../container/Dashboard'
import { Signup, EmailVerification, PostSignUp } from '../container/User/Signup'
import InviteFriends from '../container/InviteFriendsPage'
import {
  Home, Agents, ContactCenter, ContactUs,
} from '../container/Home'
import CommunicationForum from '../container/CommunicationForums'
import Login from '../container/Login'
import Auth from '../components/User/Auth'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={ Home } />
      <Route exact path='/agents' component={ Agents } />
      <Route exact path='/contactcenters' component={ ContactCenter } />
      <Route exact path='/contactus' component={ ContactUs } />
      <Route exact path='/signup' component={ Signup } />
      <Route exact path='/login' component={ Login } />
      <Route
        exact
        path='/verify-token/:token'
        component={ EmailVerification }
      />
      <Route exact path='/dashboard' component={ Dashboard } />
      <Route exact path='/post-signup' component={ PostSignUp } />
      <Route exact path='/invite-friends' component={ InviteFriends } />
      <Route exact path='/group' component={ CommunicationForum } />
      <Route exact path='/auth' render={ (props) => <Auth { ...props } /> } />
    </Switch>
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
