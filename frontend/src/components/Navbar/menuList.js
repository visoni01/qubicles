import {
  HomeIcon, SettingIcon, PeopleIcon, ProgramsIcon, InsightsIcon, SupportIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS, { PEOPLE_ROUTE } from '../../routes/routesPath'

const menuItems = [
  {
    icon: HomeIcon,
    title: 'Floor',
    id: 0,
    link: ROUTE_PATHS.DASHBOARD,
  },
  {
    icon: PeopleIcon,
    title: 'People',
    id: 1,
    link: PEOPLE_ROUTE,
  },
  {
    icon: ProgramsIcon,
    title: 'Programs',
    id: 2,
  },
  {
    icon: InsightsIcon,
    title: 'Insights',
    id: 3,
  },
  {
    icon: SettingIcon,
    title: 'Settings',
    id: 4,
  },
  {
    icon: SupportIcon,
    title: 'Support',
    id: 5,
  },
]

export default menuItems
