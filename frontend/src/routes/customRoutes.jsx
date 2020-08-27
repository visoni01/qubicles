import React from 'react'
import {
  Route, Redirect, Switch,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import routes from './routeList'
import { getToken, getPostSignUpStatus } from '../utils/common'

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
  const isPostSignUpCompleted = getPostSignUpStatus()
  if (!token) {
    return <Redirect to={ `/login?return_url=${ path }` } />
  } if (isPostSignUpCompleted && path === '/post-signup') {
    return <Redirect to='/dashboard' />
  } return <Component />
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
