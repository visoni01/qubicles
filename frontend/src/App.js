import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Dashboard from './container/Dashboard'
import { Signup, EmailVerification, PostSignUp } from './container/User/Signup'
import InviteFriends from './container/InviteFriendsPage'
import store from './redux-saga/store'

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/signup" component={ Signup } />
          <Route
            exact
            path="/verify-token/:token"
            component={ EmailVerification }
          />
          <Route exact path="/dashboard" component={ Dashboard } />
          <Route exact path="/post-signup" component={ PostSignUp } />
          <Route exact path="/invite-friends" component={ InviteFriends } />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
