const { AccountIcon, IntegrationIcon, RatesIcon } = require('../../../assets/images/icons/profileSettingsIcons')
const { default: AccountSection } = require('../../../containers/Profile/Company/Settings/AccountSection')
const { default: IntegrationSection } = require('./IntegrationSection')
const { default: RatesSection } = require('./RatesSection')

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
