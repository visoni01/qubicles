import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import routes from './routeList'
import Loader from '../components/loaders/circularLoader'
import CustomRoutes from './customRoutes'

const Routes = () => (
  <Router>
    <Switch>
      <CustomRoutes />
    </Switch>
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
