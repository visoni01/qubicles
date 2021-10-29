import React, { useState, useCallback, useEffect } from 'react'
import { AvatarGroup } from '@material-ui/lab'
import { Avatar, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import EndorsementsModal from '../../../../../components/People/ContactCenter/Talent/Application/endorsementsModal'
import AddEndorseModal from './addEndorseModal'
import { agentResumeSkillsStart } from '../../../../../redux-saga/redux/people'
import { ThumbUpIcon } from '../../../../../assets/images/icons/endorsementIcons'
import { REQUEST_TYPES } from '../../../../../utils/constants'

const AgentSkillSection = ({
  agentResumeSkills, canEndorse, candidateId,
}) => {
  const [ skills, setSkills ] = useState(agentResumeSkills.filter((skill, index) => index < 3))
  const [ showAllSkills, setShowAllSkills ] = useState(false)
  const [ openEndorsementModal, setOpenEndorsementModal ] = useState(false)
  const [ endorsementData, setEndorsementData ] = useState({})
  const [ isAddEndorseModalOpen, setIsAddEndorseModalOpen ] = useState(false)
  const [ hasEndorsed, setHasEndorsed ] = useState(new Set())
  const [ currentSkill, setCurrentSkill ] = useState({ skillId: null, skillName: '' })
  const { userDetails } = useSelector((state) => state.login)
  const dispatch = useDispatch()

  useEffect(() => {
    if (candidateId !== userDetails.user_id) {
      const endorsedSkills = agentResumeSkills.filter((skill) => {
        const isEndorsed = skill.endorsements.map((endoresement) => endoresement.id).includes(userDetails.user_id)
        return isEndorsed
      }).map((skill) => skill.skillId)
      setHasEndorsed(new Set(endorsedSkills))
    }
  }, [ agentResumeSkills, candidateId, userDetails.user_id ])

  const handleOpenEndorsementModal = useCallback(({ skillName, endorsements }) => {
    setEndorsementData({
      skillName,
      endorsements,
    })
    setOpenEndorsementModal(true)
  }, [ ])

  const handleAllSkillsButton = useCallback(() => {
    if (showAllSkills) {
      setSkills(agentResumeSkills.filter((skill, index) => index < 3))
    } else {
      setSkills(agentResumeSkills)
    }
    setShowAllSkills((state) => !state)
  }, [ agentResumeSkills, showAllSkills ])

  const handleRemoveEndorse = useCallback((skillId) => {
    dispatch(agentResumeSkillsStart({
      requestType: REQUEST_TYPES.UPDATE,
      candidateId,
      updatedDataType: 'RemoveEndorse',
      updatedData: {
        skillId,
      },
    }))
  }, [ dispatch, candidateId ])

  const handleEndorsementChange = useCallback(({ skillId, skillName }) => {
    if (!hasEndorsed.has(skillId)) {
      setCurrentSkill({ skillId, skillName })
      setIsAddEndorseModalOpen(true)
    } else {
      handleRemoveEndorse(skillId)
    }
  }, [ hasEndorsed, handleRemoveEndorse ])

  const handleClose = useCallback(() => {
    setIsAddEndorseModalOpen(false)
    setCurrentSkill({ skillId: null, skillName: '' })
  }, [ ])

  return (
    <>
      <div className='skill-section resume-section is-fullwidth'>
        <div className='skills-wrap'>
          {skills.map((skill) => (
            <div key={ skill.skillId } className='list-divider'>
              <div className='display-inline-flex is-fullwidth align-items-end mb-5'>
                <h4 className='h4'>
                  {skill.skillName}
                </h4>
                {canEndorse && userDetails.user_code === 'agent' && (
                  <ThumbUpIcon
                    className={ `custom-svg-icon ml-10 like-button
                      ${ hasEndorsed.has(skill.skillId) ? 'color-primary' : '' }` }
                    onClick={ () => handleEndorsementChange({ skillId: skill.skillId, skillName: skill.skillName }) }
                  />
                )}
              </div>
              <div className='display-inline-flex mt-5 mb-20'>
                {skill.endorsedCount > 0 && (
                  <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
                    { skill.endorsements && skill.endorsements.map((endorsement, index) => {
                      if (index < 3) {
                        return (
                          <Avatar
                            key={ endorsement.id }
                            alt={ endorsement.userProfile.name }
                            src={ endorsement.userProfile.profilePic }
                          />
                        )
                      } return null
                    })}
                  </AvatarGroup>
                )}
                {/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */}
                {/* eslint-disable-next-line jsx-a11y/click-events-have-key-events */}
                <p
                  className='para light description ml-5'
                  onClick={ () => handleOpenEndorsementModal({
                    skillName: skill.skillName,
                    endorsements: skill.endorsements,
                  }) }
                >
                  {`${ skill.endorsedCount } people have given endorsements for this skill`}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
      { agentResumeSkills.length > 3 && (
      <Button
        onClick={ handleAllSkillsButton }
        className='is-fullwidth align-self-center'
        classes={ {
          root: 'button-primary-text center bold ',
          label: 'button-primary-text-label',
        } }
      >
        {showAllSkills ? 'Show Less Skills' : 'Show More Skills'}
      </Button>
      )}
      {endorsementData.endorsements && endorsementData.endorsements.length > 0 && (
        <EndorsementsModal
          open={ openEndorsementModal }
          handleClose={ () => setOpenEndorsementModal(false) }
          endorsementsList={ endorsementData.endorsements }
          skillName={ endorsementData.skillName }
        />
      )}
      {isAddEndorseModalOpen && (
        <AddEndorseModal
          open={ isAddEndorseModalOpen }
          handleClose={ handleClose }
          skillId={ currentSkill.skillId }
          skillName={ currentSkill.skillName }
          candidateId={ candidateId }
          hasEndorsed={ hasEndorsed.has(currentSkill.skillId) }
        />
      )}
    </>
  )
}

AgentSkillSection.defaultProps = {
  agentResumeSkills: [],
}

AgentSkillSection.propTypes = {
  agentResumeSkills: PropTypes.arrayOf(PropTypes.any),
  canEndorse: PropTypes.bool.isRequired,
  candidateId: PropTypes.number.isRequired,
}

export default AgentSkillSection
