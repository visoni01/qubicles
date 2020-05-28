import React from 'react'
import { Provider } from 'react-redux'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Signup, EmailVerification, PostSignUp } from './container/User/Signup'
import store from './redux-saga/store'

function App() {
  return (
    <Provider store={ store }>
      <Router>
        <Switch>
          <Route exact path="/signup" component={ Signup } />
          <Route
            exact
            path="/verifyToken/:token"
            component={ EmailVerification }
          />
          <Route exact path="/postSignup" component={ PostSignUp } />
        </Switch>
      </Router>
    </Provider>
  )
}

export default App
