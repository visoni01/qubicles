import React from 'react'
import { BrowserRouter, Route, Redirect, Switch } from 'react-router-dom'
import Signup from './container/User/Signup/'

function App() {
  return (
    <BrowserRouter>
        <Switch>
            <Route exact path='/signup' component={ Signup } />
        </Switch>
    </BrowserRouter>
  )
}

export default App
