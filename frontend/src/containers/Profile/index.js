import React from 'react'
import { useSelector } from 'react-redux'
import { USERS } from '../../utils/constants'
import AgentProfile from './Agent'
import CompanyProfile from './Company'

const Profile = () => {
  const { userDetails } = useSelector((state) => state.login)

  if (userDetails && userDetails.user_code === USERS.EMPLOYER) {
    return <CompanyProfile />
  }

  if (userDetails
    && [ USERS.AGENT, USERS.TRAINER, USERS.SUPERVISOR, USERS.QA_SUPPORT ].includes(userDetails.user_code)) {
    return <AgentProfile />
  }

  return <></>
}

export default Profile
