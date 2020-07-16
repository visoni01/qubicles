import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import routes from './routeList'

const RouteValidator = (routeData) => {
  const token = Cookies.get('access_token')
  return (token ? <Route { ...routeData } /> : <Redirect to='login' exact />)
}

const CustomRoutes = () => (
  routes.map(({ auth, ...rest }) => (
    auth ? <RouteValidator { ...rest } key={ rest.path } />
      : <Route { ...rest } key={ rest.path } exact />
  ))
)

export default CustomRoutes
