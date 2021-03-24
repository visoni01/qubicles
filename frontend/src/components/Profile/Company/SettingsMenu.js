import AccountSection from '../../../containers/Profile/Company/Settings/accountSection'
import IntegrationSection from './integrationSection'
import RatesSection from './ratesSection'
import { AccountIcon, IntegrationIcon, RatesIcon } from '../../../assets/images/icons/profileSettingsIcons'

const settingMenuItems = [
  {
    id: 0,
    title: 'Account',
    icon: AccountIcon,
    component: AccountSection,
  },
  {
    id: 1,
    title: 'Integrations',
    icon: IntegrationIcon,
    component: IntegrationSection,
  },
  {
    id: 2,
    title: 'Rates',
    icon: RatesIcon,
    component: RatesSection,
  },
]

export default settingMenuItems
