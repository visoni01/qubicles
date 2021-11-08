import React, { lazy } from 'react'
import { useSelector } from 'react-redux'
import { USERS } from '../../utils/constants'

const ContactCenterJobView = lazy(() => import('./ContactCenter/Jobs/jobView'))
const AgentJobView = lazy(() => import('./Agent/Jobs/agentJobView'))

const PeopleViewJobs = () => {
  const { userDetails } = useSelector((state) => state.login)

  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === USERS.EMPLOYER) {
    return <ContactCenterJobView />
  }

  if (userDetails && userDetails.is_post_signup_completed
    && [ USERS.AGENT, USERS.TRAINER, USERS.SUPERVISOR, USERS.QA_SUPPORT ].includes(userDetails.user_code)) {
    return <AgentJobView />
  }

  return <></>
}

export default PeopleViewJobs
