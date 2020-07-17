import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import Cookies from 'js-cookie'

const RouteValidator = (routeData) => {
  const token = Cookies.get('access_token')
  return (token ? <Route { ...routeData } /> : <Redirect to='login' exact />)
}

export default RouteValidator
