import React, { Suspense } from 'react'
import {
  Route, Redirect, Switch, useLocation,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import routes from './routeList'
import { getToken, getUserDetails } from '../utils/common'
import Navbar from '../components/Navbar'

const suspenseWrapper = (Component, propsToPass) => (
  <Suspense fallback={ <LinearProgress /> }>
    <Component { ...propsToPass } />
  </Suspense>
)

const CustomRoutes = () => (
  <Switch>
    {
      routes.map(({
        path, auth, exact, ...rest
      }) => (
        <Route
          path={ path }
          key={ path }
          exact={ exact }
          render={ () => (auth ? <Validator { ...rest } path={ path } /> : <Redirector { ...rest } />) }
        />
      ))
    }
  </Switch>
)

const Validator = ({ component: Component, path, propsToPass }) => {
  const location = useLocation()
  const token = getToken()
  let userDetails
  let component
  if (token) {
    userDetails = getUserDetails()
  }
  if (!token) {
    component = <Redirect to={ `/login?return_url=${ location.pathname }` } />
  } else if (!userDetails.is_post_signup_completed && path !== '/post-signup') {
    component = <Redirect to='/post-signup' />
  } else if (userDetails.is_post_signup_completed && path === '/post-signup') {
    component = <Redirect to='/dashboard' />
  } else {
    component = (
      <Navbar>
        {suspenseWrapper(Component, propsToPass)}
      </Navbar>
    )
  }

  return component
}

const Redirector = ({ component: Component, redirectToDashboard, propsToPass }) => {
  if (getToken() && redirectToDashboard) {
    return (<Redirect to='/dashboard' />)
  }
  return (
    suspenseWrapper(Component, propsToPass)
  )
}

Validator.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
  path: PropTypes.oneOfType([
    PropTypes.string,
    PropTypes.array,
  ]).isRequired,
}

Redirector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
  redirectToDashboard: PropTypes.bool,
}

Redirector.defaultProps = {
  redirectToDashboard: false,
}

export default CustomRoutes
