import {
  HomeIcon, SettingIcon, PeopleIcon, ProgramsIcon, InsightsIcon, SupportIcon,
} from '../../assets/images/icons/navBarIcons'
import ROUTE_PATHS, {
  PEOPLE_ROUTE,
  PROGRAMS_NAVIGATION_ROUTE,
  INSIGHTS_NAVIGATION_ROUTE,
  SETTINGS_NAVIGATION_ROUTE,
} from '../../routes/routesPath'

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
    link: PROGRAMS_NAVIGATION_ROUTE,
  },
  {
    icon: InsightsIcon,
    title: 'Insights',
    id: 3,
    link: INSIGHTS_NAVIGATION_ROUTE,
  },
  {
    icon: SettingIcon,
    title: 'Settings',
    id: 4,
    link: SETTINGS_NAVIGATION_ROUTE,
  },
  {
    icon: SupportIcon,
    title: 'Support',
    id: 5,
  },
]

export default menuItems
