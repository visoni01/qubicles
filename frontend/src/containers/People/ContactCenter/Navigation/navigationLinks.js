const { default: ROUTE_PATHS, PEOPLE_ROUTE } = require('../../../../routes/routesPath')
const {
  breifcaseIcon, searchProperty, mediaIcon, chatIcon, networkIcon,
} = require('../../../../assets/images/icons/peopleNavigationIcons')

const companyPeopleNavigations = [
  {
    id: 1,
    title: 'Jobs',
    description: '',
    route: ROUTE_PATHS.PEOPLE_JOBS_TAB,
    icon: breifcaseIcon,
  },
  {
    id: 2,
    title: 'Talent',
    description: '',
    route: ROUTE_PATHS.PEOPLE_TALENT_TAB,
    icon: searchProperty,
  },
  {
    id: 3,
    title: 'Training',
    description: '',
    route: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
    icon: mediaIcon,
  },
  {
    id: 4,
    title: 'Groups',
    description: '',
    route: ROUTE_PATHS.GROUP,
    icon: chatIcon,
  },
  {
    id: 5,
    title: 'Network',
    description: '',
    icon: networkIcon,
    route: PEOPLE_ROUTE,
  },
]

const agentPeopleNavigations = [
  {
    id: 1,
    title: 'Jobs',
    description: '',
    route: ROUTE_PATHS.PEOPLE_JOBS_TAB,
    icon: breifcaseIcon,
  },
  {
    id: 2,
    title: 'Applications',
    description: '',
    route: ROUTE_PATHS.PEOPLE_TALENT_TAB,
    icon: searchProperty,
  },
  {
    id: 3,
    title: 'Training',
    description: '',
    route: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
    icon: mediaIcon,
  },
  {
    id: 4,
    title: 'Groups',
    description: '',
    route: ROUTE_PATHS.GROUP,
    icon: chatIcon,
  },
  {
    id: 5,
    title: 'Network',
    description: '',
    icon: networkIcon,
    route: PEOPLE_ROUTE,
  },
]

export { companyPeopleNavigations, agentPeopleNavigations }
