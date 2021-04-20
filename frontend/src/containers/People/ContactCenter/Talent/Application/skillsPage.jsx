import React, { useEffect, useState, useCallback } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Button, Divider } from '@material-ui/core'
import { agentResumeSkillsStart } from '../../../../../redux-saga/redux/people/talent/agentResumeSkills'
import AgentSkillSection from './agentSkillSection'
import SkillsAndEndorsementsSkeleton from '../Skeletons/skillsAndEndorsements'
import EditSkills from './editSkills'

const SkillsPage = ({
  candidateId, languages, userType,
}) => {
  const dispatch = useDispatch()
  const { isLoading, agentResumeSkills } = useSelector((state) => state.agentResumeSkills)
  const [ openEditSkillsModal, setOpenEditSkillsModal ] = useState(false)

  useEffect(() => {
    if (candidateId !== agentResumeSkills.candidateId) {
      dispatch(agentResumeSkillsStart({ candidateId, requestType: 'FETCH' }))
    }
  }, [ dispatch, agentResumeSkills.candidateId, candidateId ])

  const handleOpenEditSkillsModal = useCallback(() => {
    setOpenEditSkillsModal(true)
  }, [])

  return (
    <div className='mb-25 custom-box resume-root skills-page-root has-fullwidth'>
      <div className='skills-endorsements-box'>
        <h3 className='h3 mb-10'>Skills & Endorsments</h3>
        {userType === 'self' && (
          <Button
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
            onClick={ handleOpenEditSkillsModal }
          >
            Edit
          </Button>
        )}
      </div>

      {/* Edit Skills Modal */}
      { openEditSkillsModal && (
        <EditSkills
          open={ openEditSkillsModal }
          handleClose={ () => setOpenEditSkillsModal(false) }
          agentResumeSkills={ agentResumeSkills.skills }
          languages={ languages }
          candidateId={ candidateId }
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
        agentResumeSkills.skills.length ? (
          <AgentSkillSection
            agentResumeSkills={ agentResumeSkills.skills }
          />
        ) : <p className='para sz-xl mt-20 text-center'>No Skills Present</p>
      )}

      {isLoading === false && <Divider className='divider' />}

      {isLoading === false && (
        <>
          <h4 className='h4 mt-30'> Languages </h4>
          {languages && languages.map((language, index) => (
            <p key={ language } className='para mt-10'>
              {`${ _.capitalize(language) } (${ index === 0 ? 'Primary' : 'Other' }) `}
            </p>
          ))}
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
