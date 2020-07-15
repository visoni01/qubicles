import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import routes from './data'
import Loader from '../components/loaders/circularLoader'

const Routes = () => (
  <Router>
    <Switch>
      {routes.map((route) => (<Route { ...route } key={ route.path } />))}
    </Switch>
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
