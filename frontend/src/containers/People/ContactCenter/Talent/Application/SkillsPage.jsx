import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Divider } from '@material-ui/core'
import { fetchAgentResumeSkillsStart } from '../../../../../redux-saga/redux/people/talent/agentResumeSkills'
import AgentSkillSection from './AgentSkillSection'
import SkillsAndEndorsementsSkeleton from '../Skeletons/SkillsAndEndorsements'

const SkillsPage = ({
  candidateId, languages,
}) => {
  const dispatch = useDispatch()
  const { isLoading, agentResumeSkills } = useSelector((state) => state.agentResumeSkills)
  useEffect(() => {
    dispatch(fetchAgentResumeSkillsStart({ candidateId }))
  }, [ dispatch, candidateId ])

  return (
    <div className='mb-25 custom-box resume-root skills-page-root has-fullwidth'>
      <h3 className='h3 is-fullwidth mb-30'>
        {' Skills & Endorsements '}
      </h3>
      {/* Skills Loader */}
      <div className='skills-skeleton-wrapper'>
        {isLoading && (
          [ ...Array(3).keys() ].map((key) => (
            <SkillsAndEndorsementsSkeleton key={ key } />
          ))
        )}
      </div>
      {/* Agent Skills Section */}
      {!isLoading && (
      <AgentSkillSection
        agentResumeSkills={ agentResumeSkills.skills }
      />
      )}
      <Divider className='divider' />
      <h4 className='h4 mt-30'> Languages </h4>
      {languages && languages.map((language) => (
        <p key={ language } className='para mt-10'>
          {`${ _.capitalize(language) } (Native or Bilingual) `}
        </p>
      ))}
    </div>
  )
}

SkillsPage.propTypes = {
  candidateId: PropTypes.number,
  languages: PropTypes.arrayOf(PropTypes.string),
}

SkillsPage.defaultProps = {
  candidateId: null,
  languages: [],
}

export default SkillsPage
