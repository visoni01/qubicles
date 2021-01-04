import ROUTE_PATHS, { PROFILE_ROUTE } from '../routesPath'
import CompanyProfile from '../../containers/Profile/Company'
import OtherCompanyProfile from '../../containers/Profile/OtherCompany/index'

const List = [
  {
    path: PROFILE_ROUTE,
    component: CompanyProfile,
    exact: true,
  },
  {
    path: [ ROUTE_PATHS.OTHER_COMPANY_FEED, ROUTE_PATHS.OTHER_COMPANY_ABOUT ],
    component: OtherCompanyProfile,
    exact: true,
  },
]

export default List
