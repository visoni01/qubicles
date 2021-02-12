import {
  Avatar, Box, Button, Divider,
} from '@material-ui/core'
import { AvatarGroup } from '@material-ui/lab'
import React from 'react'
import PropTypes from 'prop-types'
import { kareem, sally, thomas } from '../../../../assets/images/avatar'
import { skills, languages } from './mockData'

const Skill = ({ skill }) => (
  <div className='mt-20 mb-10'>
    <h4 className='h4 mb-10'>{skill.name}</h4>
    <div className='display-inline-flex mb-10'>
      <AvatarGroup max={ 3 } spacing='small' className='avatar-group'>
        <Avatar alt='Remy Sharp' src={ kareem } />
        <Avatar alt='Remy Sharp' src={ sally } />
        <Avatar alt='Remy Sharp' src={ thomas } />
      </AvatarGroup>
      <p className='para light margin-auto ml-5'>
        {skill.endorseCount}
        {' '}
        People have given endorsements for this skill
      </p>
    </div>
  </div>
)

const SkillsEndorsements = () => (
  <Box className='custom-box mb-30'>
    <div className='skills-endorsements-box'>
      <h3 className='h3 mb-10'>Skills & Endorsments</h3>
      <Button
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
      >
        Edit
      </Button>
    </div>
    <div>
      {skills.map((skill, index) => (
        <>
          <Skill skill={ skill } key={ skill.name } />
          { skills.length !== (index + 1) && <Divider />}
        </>
      ))}
      <p className='primary-text-link text-center mb-10 mt-10'>View all skills</p>
    </div>
    <Divider />
    <div className='mt-30'>
      <h4 className='h4 mt-10 mb-10'>
        Languages
      </h4>
      {languages.map((lan) => <p className='para mb-5' key={ lan }>{lan}</p>)}
    </div>
  </Box>
)

Skill.defaultProps = {
  skill: {
    name: '',
    endorseCount: 0,
  },
}

Skill.propTypes = {
  skill: PropTypes.shape({
    name: PropTypes.string,
    endorseCount: PropTypes.number,
  }),
}

export default SkillsEndorsements
