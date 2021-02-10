import {
  cultureIcon, leadershipIcon, careerAdvancementIcon, compensationIcon, performanceIcon, teamplayerIcon,
  dependabilityIcon, customerInteractionIcon,
} from '../../../assets/images/reviewIcons'

const clientRatingLabels = [
  {
    id: 0,
    name: 'cultureRating',
    label: 'Culture',
    icon: cultureIcon,
  },
  {
    id: 1,
    name: 'leadershipRating',
    label: 'Leadership',
    icon: leadershipIcon,
  },
  {
    id: 2,
    name: 'careerAdvancementRating',
    label: 'Career Advancement',
    icon: careerAdvancementIcon,
  },
  {
    id: 3,
    name: 'compensationRating',
    label: 'Compensation',
    icon: compensationIcon,
  },
]

const agentRatingLabels = [
  {
    id: 0,
    name: 'performance',
    label: 'Performance',
    icon: performanceIcon,
  },
  {
    id: 1,
    name: 'teamPlayer',
    label: 'Team Player',
    icon: teamplayerIcon,
  },
  {
    id: 0,
    name: 'customerInteraction',
    label: 'Customer Interaction',
    icon: customerInteractionIcon,
  },
  {
    id: 2,
    name: 'dependability',
    label: 'Dependability',
    icon: dependabilityIcon,
  },
]

export { clientRatingLabels, agentRatingLabels }
