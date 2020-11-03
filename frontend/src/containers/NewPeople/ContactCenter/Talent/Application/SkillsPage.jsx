/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable jsx-a11y/no-noninteractive-element-interactions */
import React, { useCallback, useState } from 'react'
import {
  Button, Divider, Avatar, Badge,
} from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import EndorsementsModal from './EndorsementsModal'
import { kareem, sally, thomas } from '../../../../../assets/images/avatar'

const SkillsPage = () => {
  const [ openEndorsementModal, setOpenEndorsementModal ] = useState(false)
  const handleOpenEndorsementModal = useCallback(
    // eslint-disable-next-line no-shadow
    () => setOpenEndorsementModal((openEndorsementModal) => !openEndorsementModal), [],
  )
  const handleModalClose = () => {
    setOpenEndorsementModal(false)
  }

  return (
    <div className='custom-box resume-root skills-page-root has-fullwidth'>
      <h3 className='h3 is-fullwidth mb-20'> Skills & Endorsements </h3>
      <div className='display-inline-flex skill-section resume-section is-fullwidth'>
        <h4 className='h4 '> Customer Service </h4>
        <div className='display-inline-flex mt-10'>
          <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
            <Avatar alt='Remy Sharp' src={ kareem } />
            <Avatar alt='Remy Sharp' src={ sally } />
            {/* <Badge
          overlap='circle'
          anchorOrigin={ {
            vertical: 'top',
            horizontal: 'right',
          } }
          badgeContent={ <FontAwesomeIcon icon={ faPlus } /> }
        /> */}
            <Avatar alt='Remy Sharp' src={ thomas } />
          </AvatarGroup>
          <p className='para light description' onClick={ handleOpenEndorsementModal }>
            7 people have given endorsements for this skill
          </p>
        </div>
        <Divider className='divider' />
        <h4 className='h4 '> Phone Calling </h4>
        <div className='display-inline-flex mt-10'>
          <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
            <Avatar alt='Remy Sharp' src={ kareem } />
            <Avatar alt='Remy Sharp' src={ sally } />
            <Avatar alt='Remy Sharp' src={ thomas } />
          </AvatarGroup>
          <p className='para light description' onClick={ handleOpenEndorsementModal }>
            7 people have given endorsements for this skill
          </p>
        </div>
        <Divider className='divider' />
        <h4 className='h4 '> Email Support </h4>
        <div className='display-inline-flex mt-10'>
          <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
            <Avatar alt='Remy Sharp' src={ kareem } />
            <Avatar alt='Remy Sharp' src={ sally } />
            <Avatar alt='Remy Sharp' src={ thomas } />
          </AvatarGroup>
          <p className='para light description' onClick={ handleOpenEndorsementModal }>
            7 people have given endorsements for this skill
          </p>
        </div>
        <Button className='text-button'> View All Skills </Button>
        <Divider className='divider' />
        <h4 className='h4 '> Languages </h4>
        <p className='para mt-10'> English (Native or Bilingual) </p>
        <p className='para mt-10 '> French (Native or Bilingual) </p>
      </div>
      <EndorsementsModal
        open={ openEndorsementModal }
        handleClose={ handleModalClose }
      />
    </div>

  )
}

export default SkillsPage
