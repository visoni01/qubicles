import {
  breifcaseIcon, searchProperty, mediaIcon, chatIcon, networkIcon,
  megaphoneIcon, acdQueueIcon, phoneCallDialerIcon, censusIcon,
  flowScriptsIcon, mobileTouchIcon, emailTemplateIcon, openingTimesIcon, liveChatQueueIcon,
  realtimeStatsIcon, reportsIcon, qaIcon, scorecardsIcon, stationsIcon, soundwaveIcon,
  filterIcon,
  addUsersIcon,
} from '../../../../assets/images/icons/peopleNavigationIcons'

import ROUTE_PATHS from '../../../../routes/routesPath'

const companyPeopleNavigations = [
  {
    id: 1,
    title: 'Jobs',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_JOBS_TAB,
    icon: breifcaseIcon,
  },
  {
    id: 2,
    title: 'Talent',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_TALENT_TAB,
    icon: searchProperty,
  },
  {
    id: 3,
    title: 'Training',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
    icon: mediaIcon,
  },
  {
    id: 4,
    title: 'Groups',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.GROUP,
    icon: chatIcon,
  },
  {
    id: 5,
    title: 'Network',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    icon: networkIcon,
  },
]

const agentPeopleNavigations = [
  {
    id: 1,
    title: 'Jobs',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_JOBS_TAB,
    icon: breifcaseIcon,
  },
  {
    id: 2,
    title: 'Applications',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_APPLICATIONS_TAB,
    icon: searchProperty,
  },
  {
    id: 3,
    title: 'Training',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.PEOPLE_TRAINING_TAB,
    icon: mediaIcon,
  },
  {
    id: 4,
    title: 'Groups',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    route: ROUTE_PATHS.GROUP,
    icon: chatIcon,
  },
  {
    id: 5,
    title: 'Network',
    description: `
    Lorem ipsum dolor sit amet consectetur adipisicing elit.
    Numquam, quae inventore rerum ratione enim voluptatum`,
    icon: networkIcon,
  },
]

const programsNavigations = [
  {
    id: 1,
    title: 'Campaigns',
    description: 'Manage auto-dealing, blended inbound/outbound calls, or general campaign settings',
    icon: megaphoneIcon,
  },
  {
    id: 2,
    title: 'ACD Queues',
    description: 'Create inbound queues with welcome prompts, hours of operations, dispositions, etc.',
    icon: acdQueueIcon,
  },
  {
    id: 3,
    title: 'DNIS & ACR',
    description: 'Manage local lines, toll-free numbers and area code routing rules for your programs',
    icon: mediaIcon,
  },
  {
    id: 4,
    title: 'Dialer',
    description: 'Create basic IVRs that allow you to build press-1, press-2 inbound call menus',
    icon: phoneCallDialerIcon,
  },
  {
    id: 5,
    title: 'Census',
    description: 'Import new records, start or stop your lists, manage DNC and search population for leads',
    icon: censusIcon,
  },
  {
    id: 6,
    title: 'Flow Scripts',
    description: `Design interactive script flows for your agents using an easy to use drag-n-drop designer
     with dynamic fields and conditional branching support`,
    icon: flowScriptsIcon,
  },
  {
    id: 7,
    title: 'Call Menu IVRs',
    description: 'Create basic IVRs that allow you to build press-1, press-2 inbound call menus',
    icon: mobileTouchIcon,
  },
  {
    id: 8,
    title: 'Live Chat Queues',
    description: `Manage incoming chat queues, configure auto-respones,
    away messages and other settings for handling live customer chat interactions`,
    icon: liveChatQueueIcon,
  },
  {
    id: 9,
    title: 'Email Templates',
    description: 'Setup email accounts to monitor incoming email and route to the next available agent',
    icon: emailTemplateIcon,
  },
  {
    id: 10,
    title: 'Hours',
    description: 'Create and edit hours of operation',
    icon: openingTimesIcon,
  },
]

const insightsNavigations = [
  {
    id: 1,
    title: 'Realtime Stats',
    description: 'View real-time stats such as agents on a call, chat with agents or change their assigned queues',
    icon: realtimeStatsIcon,
  },
  {
    id: 2,
    title: 'Quality Assurance',
    description: 'Listen to recorded calls and view screen recordings or build quality audit forms to score agents',
    icon: qaIcon,
  },
  {
    id: 3,
    title: 'Scorecards',
    description: 'Allows you to view all logged in agents and listen to their live conversations',
    icon: scorecardsIcon,
  },
  {
    id: 4,
    title: 'Reports',
    description: 'View key performance metrics for all your inbound queues, dialing lists, agents and campaigns',
    icon: reportsIcon,
  },
]

const settingsNavigations = [
  {
    id: 1,
    title: 'Users',
    description: 'Create new agents, supervisors, or administrators. Control apps, features, and reports access',
    icon: addUsersIcon,
  },
  {
    id: 2,
    title: 'Stations',
    description: 'Lets you manage all the stations in the live system used for handling calls or live monitoring',
    icon: stationsIcon,
  },
  {
    id: 3,
    title: 'Propmts & Messages',
    description: 'Manage all of the music on hold, welcome messages, or after-hours messages used in your programs',
    icon: soundwaveIcon,
  },
  {
    id: 4,
    title: 'Filters',
    description: 'Create and manage filters for outbound dealing lists and inbound blocked lists',
    icon: filterIcon,
  },
]

export {
  companyPeopleNavigations, agentPeopleNavigations, programsNavigations,
  insightsNavigations, settingsNavigations,
}
