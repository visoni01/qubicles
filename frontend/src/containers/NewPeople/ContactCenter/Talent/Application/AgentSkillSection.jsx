/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React, { useState, useCallback } from 'react'
import { AvatarGroup } from '@material-ui/lab'
import { Avatar, Button, Divider } from '@material-ui/core'
import EndorsementsModal from './EndorsementsModal'

export default function AgentSkillSection({
  agentResumeSkills,
}) {
  const [ openEndorsementModal, setOpenEndorsementModal ] = useState(false)
  const [ endorsementData, setEndorsementData ] = useState({})

  const handleOpenEndorsementModal = useCallback(({ skillName, endorsements }) => {
    setEndorsementData({
      skillName,
      endorsements,
    })
    setOpenEndorsementModal(true)
  }, [ endorsementData ])
  return (
    <>
      <div className='skill-section resume-section is-fullwidth'>
        <div className='skills-wrap'>
          {agentResumeSkills.map((skill) => (
            <div key={ skill.id } className='list-divider'>
              <h4 className='h4 '>
                {skill.name}
              </h4>
              <div className='display-inline-flex mt-5 mb-20'>
                <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
                  { skill.endorsements.map((endorsement, index) => {
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
                <p
                  className='para light description'
                  onClick={ () => handleOpenEndorsementModal({
                    skillName: skill.name,
                    endorsements: skill.endorsements,
                  }) }
                >
                  {`${ skill.endorsementsCount } people have given endorsements for this skill`}
                </p>

              </div>
            </div>
          ))}
        </div>

      </div>
      <EndorsementsModal
        open={ openEndorsementModal }
        handleClose={ () => setOpenEndorsementModal(false) }
        endorsementsList={ endorsementData.endorsements }
        skillName={ endorsementData.skillName }
      />
    </>
  )
}
