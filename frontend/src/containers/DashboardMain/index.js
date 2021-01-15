import React from 'react'
import { useSelector } from 'react-redux'
import ClientDashboard from '../Dashboard/index'
import AgentDashboard from './AgentDashboard/index'

export default function DashboardMain() {
  const { userDetails } = useSelector((state) => state.login)
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
    return (
      <ClientDashboard />
    )
  }
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'agent') {
    return (
      <AgentDashboard />
    )
  }
}
