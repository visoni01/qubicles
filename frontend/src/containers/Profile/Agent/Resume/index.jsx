import React from 'react'
import { useSelector } from 'react-redux'
import SkillsAndEndorsments from './skillsEndorsements'
import WorkHistory from './workHistory'
import Courses from './courses'
import AgentReviews from './agentReviews'

const Resume = () => {
  const { userDetails } = useSelector((state) => state.login)
  return (
    <>
      <SkillsAndEndorsments />
      <WorkHistory />
      <Courses />
      <AgentReviews agentUserId={ userDetails.user_id } />
    </>
  )
}

export default Resume
