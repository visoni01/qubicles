import React from 'react'
import { useSelector } from 'react-redux'
import SkillsPage from '../../../People/ContactCenter/Talent/Application/skillsPage'
import WorkHistory from './workHistory'
import Courses from './courses'
import AgentReviews from './agentReviews'

const Resume = () => {
  const { userDetails } = useSelector((state) => state.login)
  const { settings } = useSelector((state) => state.agentDetails)

  return (
    <>
      <SkillsPage
        candidateId={ userDetails.user_id }
        languages={ settings.languages }
        userType='self'
      />
      <WorkHistory />
      <Courses />
      <AgentReviews agentUserId={ userDetails.user_id } />
    </>
  )
}

export default Resume
