import React from 'react'
import { Route, Redirect, Switch } from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from './routeList'
import { getToken } from '../utils/common'

const CustomRoutes = (routeData) => (
  <Switch>
    {
      routes.map(({ path, auth, ...rest }) => (
        <Route
          path={ path }
          key={ path }
          exact
          render={ () => (auth ? <Validator { ...rest } /> : <Redirector { ...rest } />) }
        />
      ))
    }
  </Switch>
)

const Validator = ({ component: Component }) => (getToken() ? <Component /> : <Redirect to='/login' />)

const Redirector = ({ component: Component, redirectToDashboard }) => (
  (getToken() && redirectToDashboard) ? <Redirect to='/dashboard' /> : <Component />
)

Validator.propTypes = {
  component: PropTypes.func.isRequired,
}

Redirector.propTypes = {
  component: PropTypes.func.isRequired,
  redirectToDashboard: PropTypes.bool,
}

Redirector.defaultProps = {
  redirectToDashboard: false,
}

export default CustomRoutes
