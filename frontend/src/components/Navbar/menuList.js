import {
  walletIcon, homeIcon, settingIcon, peopleIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS, { PEOPLE_ROUTE } from '../../routes/routesPath'

const menuItems = [
  {
    icon: homeIcon,
    title: 'Floor',
    id: 1,
    link: ROUTE_PATHS.DASHBOARD,
  },
  {
    icon: peopleIcon,
    title: 'People',
    id: 2,
    link: PEOPLE_ROUTE,
  },
  {
    icon: walletIcon,
    title: 'Wallet',
    id: 3,
    link: ROUTE_PATHS.WALLET,
  },
  {
    icon: settingIcon,
    title: 'Settings',
    id: 4,
  },
]

export default menuItems
