import React from 'react'
import { useSelector } from 'react-redux'
import PeopleContactCenter from './ContactCenter'
import AgentContactCenter from './Agent'

export default function PeopleTabs() {
  const { userDetails } = useSelector((state) => state.login)
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'employer') {
    return (
      <PeopleContactCenter />
    )
  }
  if (userDetails && userDetails.is_post_signup_completed && userDetails.user_code === 'agent') {
    return (
      <AgentContactCenter />
    )
  }
}
