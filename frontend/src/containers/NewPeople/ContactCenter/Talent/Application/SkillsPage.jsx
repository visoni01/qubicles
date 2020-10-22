import React from 'react'
import {
  Button, Divider, Avatar, Badge,
} from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { kareem, sally, thomas } from '../../../../../assets/images/avatar'

const SkillsPage = () => (
  <div className='box courses-root skills-page-root has-fullwidth'>
    <h3 className='courses-heading mb-20'> Skills & Endorsements </h3>
    <div className='display-inline-flex skill-section course-section'>
      <h4 className='skill-set'> Customer Service </h4>
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
        <p className='description'> 7 people have given endorsements for this skill</p>
      </div>
      <Divider className='divider' />
      <h4 className='skill-set'> Phone Calling </h4>
      <div className='display-inline-flex mt-10'>
        <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
          <Avatar alt='Remy Sharp' src={ kareem } />
          <Avatar alt='Remy Sharp' src={ sally } />
          <Avatar alt='Remy Sharp' src={ thomas } />
        </AvatarGroup>
        <p className='description'> 7 people have given endorsements for this skill</p>
      </div>
      <Divider className='divider' />
      <h4 className='skill-set'> Email Support </h4>
      <div className='display-inline-flex mt-10'>
        <AvatarGroup max={ 4 } spacing='small' className='avatar-group'>
          <Avatar alt='Remy Sharp' src={ kareem } />
          <Avatar alt='Remy Sharp' src={ sally } />
          <Avatar alt='Remy Sharp' src={ thomas } />
        </AvatarGroup>
        <p className='description'> 7 people have given endorsements for this skill</p>
      </div>
      <Button className='text-button'> View All Skills </Button>
      <Divider className='divider' />
      <h4 className='skill-set'> Languages </h4>
      <p className='mt-10'> English (Native or Bilingual) </p>
      <p className='mt-10 '> French (Native or Bilingual) </p>
    </div>
  </div>

)

export default SkillsPage
