import React, { Suspense } from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import { CircularLoader } from '../components/loaders'
import CustomSnackbar from '../components/snackbar'
import routes from './routeList'
import RouteValidator from './RouteValidator'

const Routes = () => (
  <Router>
    <Switch>
    {
      routes.map(({ auth, ...rest }) => {
        return (
          auth ? <RouteValidator { ...rest } key={ rest.path } />
          : <Route { ...rest } key={ rest.path } exact />
        )
        
      })
    }
    </Switch>  
    <CircularLoader />
    <CustomSnackbar />
  </Router>
)

export default Routes
