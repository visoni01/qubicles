import React, { useState, useCallback } from 'react'
import {
  TextField, Select,
  FormControl, InputLabel, InputBase,
} from '@material-ui/core'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import './styles.scss'

const NewJobRequirements = () => {
  const [ newJobRequirements, setNewJobRequirements ] = useState({
    requiredSkills: '',
    bonusSkills: '',
    requiredCourses: '',
    bonusCourses: '',
  })

  const setNewJobRequirementsCB = useCallback((event) => {
    const { name, value } = event.target
    setNewJobRequirements((currentNewJobRequirements) => ({
      ...currentNewJobRequirements,
      [ name ]: value,
    }))
  }, [ ])

  const availableSkills = [ 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4' ]

  return (
    <div className='custom-box new-job-root job-requirements-root has-fullwidth'>
      <h3 className='mt-10 h3'> Requirements </h3>
      <div className='category-section mt-30'>
        <div className='is-halfwidth'>
          <div>
            <h4 className='h4 mb-10'> Required Skills </h4>
            <FormControl variant='outlined' className='drop-down-bar'>
              <InputLabel margin='dense' variant='outlined'>Required Skills</InputLabel>
              <Select
                native
                margin='dense'
                variant='outlined'
                label='Required Skills'
                name='requiredSkills'
                onChange={ setNewJobRequirementsCB }
              >
                <option aria-label='None' value='' />
                {availableSkills.map((skill) => (
                  <option key={ skill } value={ skill }>
                    {skill}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='mt-50'>
            <h4 className='h4 mb-10'> Required Courses</h4>

            <div className='search-input'>
              <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
              <InputBase
                placeholder='Search Courses'
                className='input-field'
                name='requiredCourses'
                onChange={ setNewJobRequirementsCB }
              />
            </div>
          </div>
        </div>
        <div className='is-halfwidth'>
          <div>
            <h4 className='h4 mb-10'> Bonus Skills </h4>
            <FormControl variant='outlined' className='drop-down-bar'>
              <InputLabel margin='dense' variant='outlined'>Bonus Skills</InputLabel>
              <Select
                native
                margin='dense'
                variant='outlined'
                label='Bonus Skills'
                name='bonusSkills'
                onChange={ setNewJobRequirementsCB }
              >
                <option aria-label='None' value='' />
                {availableSkills.map((skill) => (
                  <option key={ skill } value={ skill }>
                    {skill}
                  </option>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='mt-50'>
            <h4 className='h4 mb-10'> Bonus Courses</h4>
            <div className='search-input'>
              <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 custom-fa-icon light' />
              <InputBase
                placeholder='Search Courses'
                className='input-field'
                name='bonusCourses'
                onChange={ setNewJobRequirementsCB }
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewJobRequirements
