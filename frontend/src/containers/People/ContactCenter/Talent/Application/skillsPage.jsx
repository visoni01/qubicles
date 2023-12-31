import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Button, Divider } from '@material-ui/core'
import {
  agentResumeSkillsStart, resetAgentResumeSkillsFlags,
} from '../../../../../redux-saga/redux/people/talent/agentResumeSkills'
import AgentSkillSection from './agentSkillSection'
import SkillsAndEndorsementsSkeleton from
  '../../../../../components/People/ContactCenter/SkeletonLoader/Common/skillsAndEndorsements'
import EditSkills from './editSkills'
import { resetAgentProfileSettingsFlags } from '../../../../../redux-saga/redux/actions'
import { REQUEST_TYPES } from '../../../../../utils/constants'

// eslint-disable-next-line complexity
const SkillsPage = ({ candidateId, languages, userType }) => {
  const [ openEditSkillsModal, setOpenEditSkillsModal ] = useState(false)

  const {
    isLoading, agentResumeSkills, success, requestType,
  } = useSelector((state) => state.agentResumeSkills)
  const {
    isLoading: isLoadingLanguage,
    requestType: requestTypeLanguage,
    success: successLanguage,
  } = useSelector((state) => state.agentDetails)

  const dispatch = useDispatch()

  useEffect(() => {
    if (candidateId !== agentResumeSkills.candidateId) {
      dispatch(agentResumeSkillsStart({ candidateId, requestType: REQUEST_TYPES.FETCH }))
    }
  }, [ dispatch, agentResumeSkills.candidateId, candidateId ])

  useEffect(() => {
    if (!isLoading && success && requestType === REQUEST_TYPES.UPDATE) {
      setOpenEditSkillsModal(false)
      dispatch(resetAgentResumeSkillsFlags())
    }
    if (!isLoadingLanguage && successLanguage && requestTypeLanguage === REQUEST_TYPES.UPDATE) {
      setOpenEditSkillsModal(false)
      dispatch(resetAgentProfileSettingsFlags())
    }
  }, [ isLoading, success, requestType, isLoadingLanguage, successLanguage, requestTypeLanguage, dispatch ])

  const handleOpenEditSkillsModal = useCallback(() => {
    setOpenEditSkillsModal(true)
  }, [])

  return (
    <div className='mb-25 custom-box resume-root skills-page-root has-fullwidth'>
      <div className='skills-endorsements-box'>
        <h3 className='h3 mb-10'> Skills & Endorsements </h3>
        {(userType === 'self') && (
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ handleOpenEditSkillsModal }
            disabled={ (isLoading === null || isLoading) }
          >
            Edit
          </Button>
        )}
      </div>

      {/* Edit Skills Modal */}
      {openEditSkillsModal && (
        <EditSkills
          open={ openEditSkillsModal }
          handleClose={ () => setOpenEditSkillsModal(false) }
          agentResumeSkills={ agentResumeSkills.skills }
          languages={ languages }
          candidateId={ candidateId }
          isLoading={ isLoading }
          isLoadingLanguage={ isLoadingLanguage }
        />
      )}

      {/* Skills Loader */}
      <div className='skills-skeleton-wrapper'>
        {(isLoading === null || isLoading) && (
          [ ...Array(3).keys() ].map((key) => (
            <SkillsAndEndorsementsSkeleton key={ key } />
          ))
        )}
      </div>

      {/* Agent Skills Section */}
      {isLoading === false && (
        agentResumeSkills.skills && agentResumeSkills.skills.length ? (
          <AgentSkillSection
            agentResumeSkills={ agentResumeSkills.skills }
            canEndorse={ userType === 'other' && agentResumeSkills.canEndorse }
            candidateId={ candidateId }
          />
        ) : <p className='para sz-xl mt-20 text-center'>No Skills Present</p>
      )}

      {isLoading === false && <Divider className='divider' />}

      {isLoading === false && (
        <>
          <h4 className='h4 mt-30'> Languages </h4>
          {languages && languages.length
            ? languages.map((language, index) => (
              <p key={ language } className='para mt-10'>
                {`${ _.capitalize(language) } (${ index === 0 ? 'Primary' : 'Other' }) `}
              </p>
            ))
            : <p className='para sz-xl mt-20 text-center'> No Languages Present </p>}
        </>
      )}
    </div>
  )
}

SkillsPage.propTypes = {
  candidateId: PropTypes.number,
  languages: PropTypes.arrayOf(PropTypes.string),
  userType: PropTypes.string,
}

SkillsPage.defaultProps = {
  candidateId: null,
  languages: [],
  userType: '',
}

export default SkillsPage
