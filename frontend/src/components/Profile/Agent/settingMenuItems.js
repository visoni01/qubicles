import { AccountIcon, IntegrationIcon, RatesIcon } from '../../../assets/images/icons/profileSettingsIcons'
import AccountSection from '../../../containers/Profile/Agent/Settings/accountSection'
import Teams from '../../../containers/Profile/Agent/Settings/teams'
import Station from '../../../containers/Profile/Agent/Settings/station'

const settingMenuItems = [
  {
    id: 0,
    title: 'Account',
    icon: AccountIcon,
    component: AccountSection,
    subSections: [
      {
        id: 0,
        title: 'Basic Information',
      },
      {
        id: 1,
        title: 'Inbound Queues',
      },
      {
        id: 2,
        title: 'Campaigns',
      },
      {
        id: 3,
        title: 'Permissions',
      },
    ],
  },
  {
    id: 1,
    title: 'Teams',
    icon: IntegrationIcon,
    component: Teams,
  },
  {
    id: 2,
    title: 'Station',
    icon: RatesIcon,
    component: Station,
    subSections: [
      {
        id: 0,
        title: 'General',
      },
      {
        id: 1,
        title: 'Features',
      },
      {
        id: 2,
        title: 'Security',
      },
    ],
  },
  {
    id: 3,
    title: 'Stats',
    icon: RatesIcon,
    component: () => null,
    subSections: [
      {
        id: 0,
        title: 'Login & Logout',
      },
      {
        id: 1,
        title: 'Agent Time Details',
      },
      {
        id: 2,
        title: 'ACD Call Details',
      },
      {
        id: 3,
        title: 'ACD Skills History',
      },
      {
        id: 4,
        title: 'Outbound Call Details',
      },
      {
        id: 5,
        title: 'Manual & xfer Call Details',
      },
      {
        id: 6,
        title: 'Call Recordings',
      },
    ],
  },
]

export default settingMenuItems
