import React, { useState, useCallback } from 'react'
import {
  Box, Divider, Select, MenuItem, FormControl, RadioGroup, Radio, FormControlLabel,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSlidersH, faSearch } from '@fortawesome/free-solid-svg-icons'
import './styles.scss'

const TalentFilter = () => {
  const [ skills, setSkills ] = useState('')
  const [ language, setLanguage ] = useState('English')
  const [ talentType, setTalentType ] = useState('')
  const [ hourlyRate, setHourlyRate ] = useState('')

  const handleTalentChange = (event) => {
    setTalentType(event.target.value)
  }

  const handleHourlyRateChange = (event) => {
    setHourlyRate(event.target.value)
  }

  const setSkillsCB = useCallback((event) => {
    setSkills(event.target.value)
  }, [])

  const setLanguageCB = useCallback((event) => {
    setLanguage(event.target.value)
  }, [])

  return (
    <Box className='talent-filter-root'>
      <h2 className='ml-20'>Talent</h2>
      <div className='talent-filter-title ml-20'>
        <h3> Filter </h3>
      </div>
      <Divider />
      <div className='talent-dropdown'>
        <div>
          <label>Skills</label>
        </div>
        <FormControl>
          <Select
            MenuProps={ {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            } }
            name='skills'
            id='skills'
            className='dropdown'
            onChange={ setSkillsCB }
            value={ skills }
          >
            <MenuItem value='skill 1'>skill 1</MenuItem>
            <MenuItem value='skill 2'>skill 2</MenuItem>
            <MenuItem value='skill 3'>skill 3</MenuItem>
          </Select>
        </FormControl>
        <div>
          <label>Languages</label>
        </div>
        <FormControl>
          <Select
            MenuProps={ {
              getContentAnchorEl: null,
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left',
              },
            } }
            name='Languages'
            id='Languages'
            onChange={ setLanguageCB }
            value={ language }
            className='dropdown'
          >
            <MenuItem value='English'>English</MenuItem>
            <MenuItem value='Spanish'>Spanish</MenuItem>
            <MenuItem value='French'>French</MenuItem>
          </Select>
        </FormControl>
        <FormControl>
          <div>
            <label>Talent Type</label>
          </div>
          <RadioGroup aria-label='Talent Type' name='talent-type' value={ talentType } onChange={ handleTalentChange }>
            <FormControlLabel value='freelancer' control={ <Radio /> } label='Freelancer' />
            <FormControlLabel value='contract' control={ <Radio /> } label='Contract' />
            <FormControlLabel value='employee' control={ <Radio /> } label='Employee' />
          </RadioGroup>
        </FormControl>
        <FormControl>
          <div>
            <label>Hourly Rate</label>
          </div>
          <RadioGroup aria-label='Hourly Rate' name='hourly-rate' value={ hourlyRate } onChange={ handleHourlyRateChange }>
            <FormControlLabel value='any' control={ <Radio /> } label='Any' />
            <FormControlLabel value='$10' control={ <Radio /> } label='10$ & below' />
            <FormControlLabel value='$15' control={ <Radio /> } label='$10 - $15' />
            <FormControlLabel value='$20' control={ <Radio /> } label='$15 - $20' />
            <FormControlLabel value='above' control={ <Radio /> } label='$20 & above' />
          </RadioGroup>
        </FormControl>
      </div>

    </Box>
  )
}

export default TalentFilter
