import React, { Suspense } from 'react'
import {
  Route, Redirect, Switch, useLocation,
} from 'react-router-dom'
import PropTypes from 'prop-types'
import { LinearProgress } from '@material-ui/core'
import routes from './routeList'
import { getToken, getUserDetails, setDoumentTitle } from '../utils/common'
import Navbar from '../components/Navbar'
import ChatPopupWrapper from '../containers/Chat/Common/chatPopupWrapper'
import { popupChats } from '../containers/Chat/testData'
import { CHAT_ROUTE } from './routesPath'

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

  // Add the document title for the application current location
  setDoumentTitle({ location })

  const token = getToken()
  let userDetails
  let component
  if (token) {
    userDetails = getUserDetails()
  }
  if (!token) {
    component = <Redirect to={ `/login?return_url=${ location.pathname }` } />
  } else if (!userDetails.is_post_signup_completed && path === '/post-signup') {
    component = suspenseWrapper(Component, propsToPass)
  } else if (!userDetails.is_post_signup_completed && path !== '/post-signup') {
    component = <Redirect to='/post-signup' />
  } else if (userDetails.is_post_signup_completed && path === '/post-signup') {
    component = <Redirect to='/dashboard' />
  } else {
    component = (
      <>
        <Navbar>
          {suspenseWrapper(Component, propsToPass)}
        </Navbar>
        {path !== CHAT_ROUTE && <ChatPopupWrapper chats={ popupChats } />}
      </>
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
  propsToPass: PropTypes.shape({}),
}

Validator.defaultProps = {
  propsToPass: {},
}

Redirector.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  component: PropTypes.any.isRequired,
  redirectToDashboard: PropTypes.bool,
  propsToPass: PropTypes.shape({}),
}

Redirector.defaultProps = {
  redirectToDashboard: false,
  propsToPass: {},
}

export default CustomRoutes
