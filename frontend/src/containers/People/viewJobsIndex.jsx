import React, { lazy } from 'react'
import { useSelector } from 'react-redux'

const ContactCenterJobView = lazy(() => import('./ContactCenter/Jobs/JobView'))
const AgentJobView = lazy(() => import('./Agent/Jobs/agentJobView'))

export default function PeopleViewJobs() {
  const { userDetails } = useSelector((state) => state.login)
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
    return (
      <ContactCenterJobView />
    )
  }
  return (
    <AgentJobView />
  )
}
