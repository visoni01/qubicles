import React from 'react'
import {
  Route, Redirect, Switch,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from './routeList'
import { getToken, getUserDetails } from '../utils/common'

const CustomRoutes = (routeData) => (
  <Switch>
    {
      routes.map(({ path, auth, ...rest }) => (
        <Route
          path={ path }
          key={ path }
          exact
          render={ () => (auth ? <Validator { ...rest } path={ path } /> : <Redirector { ...rest } />) }
        />
      ))
    }
  </Switch>
)

const Validator = ({ component: Component, path }) => {
  const token = getToken()
  let userDetails
  let component
  if (token) {
    userDetails = getUserDetails()
  }
  if (!token) {
    component = <Redirect to={ `/login?return_url=${ path }` } />
  } else if (!userDetails.is_post_signup_completed && path !== '/post-signup') {
    component = <Redirect to='/post-signup' />
  } else if (userDetails.is_post_signup_completed && path === '/post-signup') {
    component = <Redirect to='/dashboard' />
  } else {
    component = <Component />
  }

  return component
}

const Redirector = ({ component: Component, redirectToDashboard }) => (
  (getToken() && redirectToDashboard) ? <Redirect to='/dashboard' /> : <Component />
)

Validator.propTypes = {
  component: PropTypes.func.isRequired,
  path: PropTypes.string.isRequired,
}

Redirector.propTypes = {
  component: PropTypes.func.isRequired,
  redirectToDashboard: PropTypes.bool,
}

Redirector.defaultProps = {
  redirectToDashboard: false,
}

export default CustomRoutes
