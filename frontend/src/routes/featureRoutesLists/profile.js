import React from 'react'
import ROUTE_PATHS, { PROFILE_ROUTE } from '../routesPath'
import UserProfile from '../../containers/Profile'
import OtherCompanyProfile from '../../containers/Profile/OtherCompany/index'
import RouteRenderer from './featureSubRoutes'

const List = [
  {
    path: PROFILE_ROUTE,
    component: UserProfile,
    exact: true,
  },
  {
    path: [ ROUTE_PATHS.OTHER_COMPANY_FEED, ROUTE_PATHS.OTHER_COMPANY_ABOUT ],
    component: OtherCompanyProfile,
    exact: true,
  },
]

const SubRoutes = () => (<RouteRenderer routes={ List } />)

export default SubRoutes
