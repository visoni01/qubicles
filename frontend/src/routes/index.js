import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from '../container/Dashboard'
import { Signup, EmailVerification, PostSignUp } from '../container/User/Signup'
import InviteFriends from '../container/InviteFriendsPage'
import Home from '../container/Home'
import Login from '../container/Login'
import CommunicationForum from '../container/CommunicationForums'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'

const Routes = () => (
  <Router>
    <Switch>
      <Route exact path='/' component={ Home } />
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
      <Route exact path='/communication' component={ CommunicationForum } />
    </Switch>
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
