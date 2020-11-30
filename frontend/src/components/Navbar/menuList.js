import {
  walletIcon, homeIcon, settingIcon, peopleIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS, { NEW_PEOPLE } from '../../routes/routesPath'

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
    link: NEW_PEOPLE,
  },
  {
    icon: walletIcon,
    title: 'Wallet',
    id: 3,
  },
  {
    icon: settingIcon,
    title: 'Settings',
    id: 4,
  },
]

export default menuItems
