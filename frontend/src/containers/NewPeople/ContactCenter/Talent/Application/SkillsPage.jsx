import React, { useEffect } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import { Divider, Button } from '@material-ui/core'
import { fetchAgentResumeSkillsStart } from '../../../../../redux-saga/redux/newPeople/talent/agentResumeSkills'
import AgentSkillSection from './AgentSkillSection'
import SkillsAndEndorsements from '../Skeletons/SkillsAndEndorsements'
// import { agentResumeSkills } from './testData'

const SkillsPage = () => {
  const dispatch = useDispatch()
  const { isLoading, agentResumeSkills } = useSelector((state) => state.agentResumeSkills)
  useEffect(() => {
    dispatch(fetchAgentResumeSkillsStart())
  }, [ dispatch ])

  return (
    <div className='mb-25 custom-box resume-root skills-page-root has-fullwidth'>
      <h3 className='h3 is-fullwidth mb-30'>
        {' Skills & Endorsements '}
      </h3>
      {/* Skills Loader */}
      <div className='skills-skeleton-wrapper'>
        {isLoading && (
          [ ...Array(3).keys() ].map((key) => (
            <SkillsAndEndorsements key={ key } />
          ))
        )}
      </div>
      {/* Agent Skills Section */}
      {!isLoading && (
      <AgentSkillSection
        agentResumeSkills={ agentResumeSkills }
      />
      )}
      <Button
        className='is-fullwidth align-self-center'
        classes={ {
          root: 'button-primary-text center bold ',
          label: 'button-primary-text-label',
        } }
      >
        View All Skills
      </Button>
      <Divider className='divider' />
      <h4 className='h4 mt-30'> Languages </h4>
      <p className='para mt-10'> English (Native or Bilingual) </p>
      <p className='para mt-10 '> French (Native or Bilingual) </p>
    </div>
  )
}

export default SkillsPage
