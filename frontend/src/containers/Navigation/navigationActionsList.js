import ROUTE_PATHS from '../../routes/routesPath'

const peopleClientQuicklinks = [
  {
    id: 1,
    title: 'New Job',
    hasBreak: false,
    link: ROUTE_PATHS.NEW_JOB,
  },
  {
    id: 2,
    title: 'New Group',
    hasBreak: false,
    link: ROUTE_PATHS.GROUP,
  },
  {
    id: 3,
    title: 'New Course',
    hasBreak: false,
    link: ROUTE_PATHS.CREATE_COURSE,
  },
]

const programsQuicklinks = [
  {
    id: 1,
    title: 'New Campaign',
    hasBreak: false,
  },
  {
    id: 2,
    title: 'Import Leads',
    hasBreak: false,
  },
  {
    id: 3,
    title: 'New Phone Number',
    hasBreak: false,
  },
  {
    id: 4,
    title: 'New Email Template',
    hasBreak: true,
  },
  {
    id: 5,
    title: 'New Flow Script',
    hasBreak: false,
  },
  {
    id: 6,
    title: 'New Live Chat Queue',
    hasBreak: true,
  },
  {
    id: 7,
    title: 'New ACD Queue',
    hasBreak: false,
  },
  {
    id: 8,
    title: 'New IVR',
    hasBreak: false,
  },
]

const insightsQuicklinks = [
  {
    id: 1,
    title: 'Agent Performance Report',
    hasBreak: false,
  },
  {
    id: 2,
    title: 'ACD Detail Report',
    hasBreak: false,
  },
  {
    id: 3,
    title: 'Flash Summary Report',
    hasBreak: false,
  },
  {
    id: 4,
    title: 'Interaction Detail Report',
    hasBreak: false,
  },
  {
    id: 5,
    title: 'System Call log Report',
    hasBreak: false,
  },
  {
    id: 6,
    title: 'New Audit',
    hasBreak: true,
  },
  {
    id: 7,
    title: 'New Scorecard',
    hasBreak: false,
  },
]

const settingsQuicklinks = [
  {
    id: 1,
    title: 'New User',
    hasBreak: false,
  },
  {
    id: 2,
    title: 'New Team',
    hasBreak: false,
  },
  {
    id: 3,
    title: 'New Station',
    hasBreak: false,
  },
  {
    id: 4,
    title: 'Upload Prompt',
    hasBreak: true,
  },
  {
    id: 5,
    title: 'Upload Music On Hold',
    hasBreak: false,
  },
  {
    id: 6,
    title: 'Create Filter',
    hasBreak: true,
  },
  {
    id: 7,
    title: 'Block Incoming Number',
    hasBreak: false,
  },
]

export {
  peopleClientQuicklinks, programsQuicklinks, insightsQuicklinks, settingsQuicklinks,
}
