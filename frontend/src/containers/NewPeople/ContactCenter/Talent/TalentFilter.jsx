import React, { useState, useCallback } from 'react'
import {
  Box, Divider, FormControl, InputLabel,
  Select, RadioGroup, FormControlLabel, Radio,
  Checkbox, InputBase, TextareaAutosize,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'

const TalentFilter = () => {
  const verificationsInitial = {
    backgroundCheck: false,
    phoneVerified: false,
    idVerified: false,
  }

  const [ selectedSkill, setSkill ] = useState('')
  const [ selectedLanguage, setLanguage ] = useState('')
  const [ selectedTalentType, setTalentType ] = useState('Any')
  const [ selectedHourlyRate, setHourlyRate ] = useState('Any')
  const [ selectedRating, setRating ] = useState('Any')
  const [ selectedVerifications, setVerifications ] = useState(verificationsInitial)
  const [ selectedAvailability, setAvailability ] = useState('Any')
  const [ selectedLocation, setLocation ] = useState('')

  // console.log('===============================')
  // console.log('selectedSkill =====', selectedSkill)
  // console.log('selectedLanguage =====', selectedLanguage)
  // console.log('selectedTalentType =====', selectedTalentType)
  // console.log('selectedHourlyRate =====', selectedHourlyRate)
  // console.log('selectedRating =====', selectedRating)
  // console.log('selectedVerifications =====', selectedVerifications)
  // console.log('selectedAvailability =====', selectedAvailability)
  // console.log('selectedLocation =====', selectedLocation)

  // Skills
  const availableSkills = [ 'Customer Service', 'Phone Calling', 'Email Support', 'Active Sales', 'Agent Support' ]
  const setSkillCB = useCallback((e) => {
    setSkill(e.target.value)
  }, [])

  // Languages
  const availableLanguages = [ 'English', 'French', 'German', 'Chinese', 'Turkish' ]
  const setLanguageCB = useCallback((e) => {
    setLanguage(e.target.value)
  }, [])

  // Talent Type
  const availableTalentTypes = [ 'Freelancer', 'Contract', 'Employee' ]
  const setTalentTypeCB = useCallback((e) => {
    setTalentType(e.target.value)
  }, [])

  // Hourly Rate
  const setHourlyRateCB = useCallback((e) => {
    setHourlyRate(e.target.value)
  }, [])

  // Rating
  const setRatingCB = useCallback((e) => {
    setRating(e.target.value)
  }, [])

  // Verifications
  const setVerificationsCB = useCallback((e) => {
    setVerifications({
      ...selectedVerifications,
      [ e.target.name ]: e.target.checked,
    })
  })

  // Availability
  const setAvailabilityCB = useCallback((e) => {
    setAvailability(e.target.value)
  })

  // Location
  const setLocationCB = useCallback((e) => {
    setLocation(e.target.value)
  })

  return (
    <Box className='custom-box no-padding side-filter-root talent-filter'>
      <h2 className='h2 title talent-title'>Talent</h2>
      <h3 className='h3 subtitle talent-subtitle'> Filter </h3>
      <Divider className='full-border' />

      <div className='filter-section'>
        <h4 className='h4 heading'> Skills </h4>
        <div>
          <FormControl variant='outlined' className='drop-down-bar talent-filter-dropdown'>
            <InputLabel margin='dense' variant='outlined'>Choose required skills</InputLabel>
            <Select
              native
              margin='dense'
              variant='outlined'
              label='Choose required skills'
              onChange={ setSkillCB }
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
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Languages </h4>
        <div>
          <FormControl variant='outlined' className='drop-down-bar talent-filter-dropdown'>
            <InputLabel margin='dense' variant='outlined'>Choose required languages</InputLabel>
            <Select
              native
              margin='dense'
              variant='outlined'
              label='Choose required languages'
              onChange={ setLanguageCB }
            >
              <option aria-label='None' value='' />
              {availableLanguages.map((language) => (
                <option key={ language } value={ language }>
                  {language}
                </option>
              ))}
            </Select>
          </FormControl>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Talent Type </h4>
        <div className='control-buttons-wrapper'>
          <RadioGroup
            className='radio-buttons'
            value={ selectedTalentType }
            onChange={ setTalentTypeCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any' />
            {availableTalentTypes.map((talentType) => (
              <FormControlLabel
                key={ talentType }
                value={ talentType }
                control={ <Radio /> }
                label={ talentType }
              />
            ))}
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Hourly rate </h4>
        <div className='control-buttons-wrapper'>
          <RadioGroup
            className='radio-buttons'
            value={ selectedHourlyRate }
            onChange={ setHourlyRateCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any' />
            <FormControlLabel value='tenAndBelow' control={ <Radio /> } label='10$ & below' />
            <FormControlLabel value='tenToFifteen' control={ <Radio /> } label='$10 - $15' />
            <FormControlLabel value='fifteenToTwenty' control={ <Radio /> } label='$15 - $20' />
            <FormControlLabel value='twentyAndAbove' control={ <Radio /> } label='$20 & above' />
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Rating </h4>
        <div className='control-buttons-wrapper'>
          <RadioGroup
            className='radio-buttons'
            value={ selectedRating }
            onChange={ setRatingCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any Rating' />
            <div className='rating-filter'>
              <FormControlLabel value='five' control={ <Radio /> } />
              <Rating
                readOnly
                className='rating-star no-margin'
                size='small'
                value={ 5 }
              />
            </div>
            <div className='rating-filter'>
              <FormControlLabel value='fourAndAbove' control={ <Radio /> } />
              <Rating
                readOnly
                className='rating-star no-margin'
                size='small'
                value={ 4 }
              />
              <span className='para'> & up </span>
            </div>
            <div className='rating-filter'>
              <FormControlLabel value='threeAndAbove' control={ <Radio /> } />
              <Rating
                readOnly
                className='rating-star no-margin'
                size='small'
                value={ 3 }
              />
              <span className='para'> & up </span>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Verifications </h4>
        <div className='control-buttons-wrapper'>
          <FormControl
            className='checkboxes'
          >
            <FormControlLabel
              name='phoneVerified'
              control={ <Checkbox /> }
              label='Phone Verified'
              onChange={ setVerificationsCB }
            />

            <FormControlLabel
              name='idVerified'
              control={ <Checkbox /> }
              label='ID Verified'
              onChange={ setVerificationsCB }
            />

            <FormControlLabel
              name='backgroundCheck'
              control={ <Checkbox /> }
              label='Background Check'
              onChange={ setVerificationsCB }
            />
          </FormControl>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Availability </h4>
        <div className='control-buttons-wrapper'>
          <RadioGroup
            className='radio-buttons'
            value={ selectedAvailability }
            onChange={ setAvailabilityCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any' />
            <FormControlLabel value='available' control={ <Radio /> } label='Available' />
            <FormControlLabel value='unavailable' control={ <Radio /> } label='Unavailable' />
            <FormControlLabel value='onVacation' control={ <Radio /> } label='On Vacation' />
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <h4 className='h4 heading'> Location </h4>
        <div className='control-buttons-wrapper'>
          <div className='input-box mr-15'>
            <TextareaAutosize
              aria-label='minimum height'
              autoComplete='off'
              rowsMin={ 1 }
              placeholder='Any (Remote)'
              value={ selectedLocation }
              onChange={ setLocationCB }
            />
          </div>
        </div>
      </div>
    </Box>
  )
}

export default TalentFilter
