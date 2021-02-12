import React from 'react'
import { useSelector } from 'react-redux'
import AgentProfile from './Agent'
import CompanyProfile from './Company'

const Profile = () => {
  const { userDetails } = useSelector((state) => state.login)
  if (userDetails && userDetails.user_code === 'employer') return <CompanyProfile />
  return <AgentProfile />
}

export default Profile
