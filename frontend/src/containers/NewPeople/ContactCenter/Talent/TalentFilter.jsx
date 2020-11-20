import React, { useState, useCallback, useEffect } from 'react'
import {
  Box, Divider, FormControl,
  RadioGroup, FormControlLabel, Radio,
  Checkbox, TextareaAutosize, Button, Grid,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'

import { useDispatch, useSelector } from 'react-redux'
import MultiSelectChipItems from '../../MultiSelectChipItems'
import { fetchJobSkillsStart, fetchTalentCardsStart } from '../../../../redux-saga/redux/actions'

const TalentFilter = () => {
  const dispatch = useDispatch()
  const { jobSkills } = useSelector((state) => state.jobSkills)
  useEffect(() => {
    if (!jobSkills) {
      dispatch(fetchJobSkillsStart())
    }
  }, [ dispatch ])
  const verificationsInitial = {
    backgroundCheck: false,
    phoneVerified: false,
    idVerified: false,
  }

  const [ selectedSkill, setSkill ] = useState([])
  const [ selectedLanguage, setLanguage ] = useState([])
  const [ selectedTalentType, setTalentType ] = useState('Any')
  const [ selectedHourlyRate, setHourlyRate ] = useState('Any')
  const [ selectedRating, setRating ] = useState('Any')
  const [ selectedVerifications, setVerifications ] = useState(verificationsInitial)
  const [ selectedAvailability, setAvailability ] = useState('Any')
  const [ selectedLocation, setLocation ] = useState('')

  const handleFilterApply = useCallback(() => {
    dispatch((fetchTalentCardsStart({
      filter: true,
      requiredSkills: selectedSkill.map((skill) => skill.id),
    })))
  })
  // console.log('===============================')
  // console.log('selectedSkill =====', selectedSkill)
  // console.log('selectedLanguage =====', selectedLanguage)
  // console.log('selectedTalentType =====', selectedTalentType)
  // console.log('selectedHourlyRate =====', selectedHourlyRate)
  // console.log('selectedRating =====', selectedRating)
  // console.log('selectedVerifications =====', selectedVerifications)
  // console.log('selectedAvailability =====', selectedAvailability)
  // console.log('selectedLocation =====', selectedLocation)

  // Languages
  const availableLanguages = [
    { id: 2, title: 'English' },
    { id: 3, title: 'French' },
    { id: 4, title: 'Spanish' },
  ]

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
      <h3 className='h3 subtitle'> Filter </h3>

      <Grid container spacing={ 2 } justify='space-between' className='filter-buttons'>
        <Grid item>
          <Button
            className='button-reset'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Reset
          </Button>
        </Grid>
        <Grid item>
          <Button
            className='button-apply'
            onClick={ handleFilterApply }
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
          >
            Apply
          </Button>
        </Grid>
      </Grid>

      <Divider className='full-border' />
      <div className='filter-section'>
        <div className='talent-filter-dropdown'>
          <h4 className='h4'> Skills </h4>
          <MultiSelectChipItems
            items={ jobSkills ? jobSkills.map((skill) => ({ id: skill.skillId, title: skill.skillName })) : [] }
            label='Choose Required Skills'
            selectedItems={ selectedSkill }
            setSelectedItems={ setSkill }
            smallTag
          />
        </div>
      </div>
      <div className='filter-section'>
        <div className='talent-filter-dropdown'>
          <h4 className='h4'> Languages </h4>
          <MultiSelectChipItems
            items={ availableLanguages }
            label='Choose Languages'
            selectedItems={ selectedLanguage }
            setSelectedItems={ setLanguage }
            smallTag
          />
        </div>
      </div>

      <div className='filter-section'>
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Talent Type </h4>
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
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Hourly rate </h4>
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
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Rating </h4>
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
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Verifications </h4>
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
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Availability </h4>
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
        <div className='control-buttons-wrapper'>
          <h4 className='h4'> Location </h4>
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