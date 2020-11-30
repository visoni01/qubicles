/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react'
import { AvatarGroup } from '@material-ui/lab'
import { Avatar, Button } from '@material-ui/core'
import PropTypes from 'prop-types'
import EndorsementsModal from './EndorsementsModal'

export default function AgentSkillSection({
  agentResumeSkills,
}) {
  const [ skills, setSkills ] = useState(agentResumeSkills.filter((skill, index) => index < 3))
  const [ showAllSkills, setShowAllSkills ] = useState(false)
  const [ openEndorsementModal, setOpenEndorsementModal ] = useState(false)
  const [ endorsementData, setEndorsementData ] = useState({})

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
  return (
    <>
      <div className='skill-section resume-section is-fullwidth'>
        <div className='skills-wrap'>
          {skills.map((skill) => (
            <div key={ skill.skillId } className='list-divider'>
              <h4 className='h4 '>
                {skill.skillName}
              </h4>
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
                <p
                  className='para light description'
                  onClick={ () => handleOpenEndorsementModal({
                    skillName: skill.name,
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
      {endorsementData.endorsements && (
        <EndorsementsModal
          open={ openEndorsementModal }
          handleClose={ () => setOpenEndorsementModal(false) }
          endorsementsList={ endorsementData.endorsements }
          skillName={ endorsementData.skillName }
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
}
