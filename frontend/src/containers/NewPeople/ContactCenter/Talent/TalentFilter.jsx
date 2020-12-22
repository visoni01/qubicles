import React, { useState, useCallback, useEffect } from 'react'
import {
  Box, Divider, FormControl,
  RadioGroup, FormControlLabel, Radio,
  Checkbox, TextareaAutosize, Button, Grid,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelectChipItems from '../../MultiSelectChipItems'
import {
  fetchJobSkillsStart, fetchTalentCardsStart, updateTalentFilter, resetTalentFilter,
} from '../../../../redux-saga/redux/actions'
import { initialState } from '../../../../redux-saga/redux/newPeople/talent/talentFilter'

const TalentFilter = () => {
  const dispatch = useDispatch()
  const { jobSkills } = useSelector((state) => state.jobSkills)
  const { talentFilter } = useSelector((state) => state.talentFilter)

  const [ selectedSkill, setSkill ] = useState(talentFilter.selectedSkill)
  const [ selectedLanguage, setLanguage ] = useState(talentFilter.selectedLanguage)
  const [ selectedTalentType, setTalentType ] = useState(talentFilter.selectedTalentType)
  const [ selectedHourlyRate, setHourlyRate ] = useState(talentFilter.selectedHourlyRate)
  const [ selectedRating, setRating ] = useState(talentFilter.selectedRating)
  const [ selectedVerifications, setVerifications ] = useState(talentFilter.selectedVerifications)
  const [ selectedAvailability, setAvailability ] = useState(talentFilter.selectedAvailability)
  const [ selectedLocation, setLocation ] = useState(talentFilter.selectedLocation)

  useEffect(() => {
    // Update Talent Filter in Store
    dispatch(updateTalentFilter({
      talentFilter: {
        ...talentFilter,
        selectedSkill,
        selectedLanguage,
        selectedHourlyRate,
        selectedRating,
        selectedAvailability,
        selectedTalentType,
      },
    }))

    // Apply search on filter change
    dispatch((fetchTalentCardsStart({
      requiredSkills: selectedSkill.map((skill) => skill.id),
      requiredLanguages: selectedLanguage.map((lang) => lang.title),
      requiredHourlyRate: selectedHourlyRate,
      requiredRating: selectedRating,
      requiredAvailability: selectedAvailability,
      requiredTalentType: selectedTalentType,
      searchKeyword: talentFilter.searchKeyword,
    })))
    // To prevent maximum depth warning in dependency array
    // eslint-disable-next-line
  }, [
    dispatch,
    selectedSkill,
    selectedLanguage,
    selectedHourlyRate,
    selectedRating,
    selectedAvailability,
    selectedTalentType,
  ])

  useEffect(() => {
    if (!jobSkills) {
      // Get Skills in store if not present
      dispatch(fetchJobSkillsStart({}))
    }
  }, [ dispatch, jobSkills ])

  const { talentFilter: talentFilterInitial } = initialState
  const handleResetFilter = useCallback(() => {
    setSkill(talentFilterInitial.selectedSkill)
    setLanguage(talentFilterInitial.selectedLanguage)
    setHourlyRate(talentFilterInitial.selectedHourlyRate)
    setRating(talentFilterInitial.selectedRating)
    setAvailability(talentFilterInitial.selectedAvailability)
    setTalentType(talentFilterInitial.selectedTalentType)

    dispatch(resetTalentFilter())
  }, [ dispatch, talentFilterInitial ])

  // Languages
  const availableLanguages = [
    { id: 1, title: 'english' },
    { id: 2, title: 'french' },
    { id: 3, title: 'spanish' },
  ]

  // Talent Type
  const setTalentTypeCB = useCallback((e) => {
    // setTalentType(e.target.value)
    switch (e.target.value) {
      case 'freelancer': {
        setTalentType({ employmentType: 'freelancer', name: 'freelancer' })
        break
      }
      case 'employee': {
        setTalentType({ employmentType: 'employee', name: 'employee' })
        break
      }
      default: {
        setTalentType({ employmentType: null, name: 'Any' })
      }
    }
  }, [])

  // Hourly Rate
  const setHourlyRateCB = useCallback((e) => {
    // setHourlyRate(e.target.value)
    switch (e.target.value) {
      case 'tenAndBelow': {
        setHourlyRate({ lessThanEq: 10, greaterThanEq: null, name: 'tenAndBelow' })
        break
      }
      case 'tenToFifteen': {
        setHourlyRate({ lessThanEq: 15, greaterThanEq: 10, name: 'tenToFifteen' })
        break
      }
      case 'fifteenToTwenty': {
        setHourlyRate({ lessThanEq: 20, greaterThanEq: 15, name: 'fifteenToTwenty' })
        break
      }
      case 'twentyAndAbove': {
        setHourlyRate({ lessThanEq: null, greaterThanEq: 20, name: 'twentyAndAbove' })
        break
      }
      default: {
        setHourlyRate({ lessThanEq: null, greaterThanEq: null, name: 'Any' })
      }
    }
  }, [])

  // Rating
  const setRatingCB = useCallback((e) => {
    // setRating(e.target.value)
    switch (e.target.value) {
      case 'five': {
        setRating({ greaterThanEq: 5, name: 'five' })
        break
      }
      case 'fourAndAbove': {
        setRating({ greaterThanEq: 4, name: 'fourAndAbove' })
        break
      }
      case 'threeAndAbove': {
        setRating({ greaterThanEq: 3, name: 'threeAndAbove' })
        break
      }
      default: {
        setRating({ greaterThanEq: null, name: 'Any' })
      }
    }
  }, [])

  // Verifications
  const setVerificationsCB = useCallback((e) => {
    setVerifications({
      ...selectedVerifications,
      [ e.target.name ]: e.target.checked,
    })
  }, [ selectedVerifications ])

  // Availability
  const setAvailabilityCB = useCallback((e) => {
    // setAvailability(e.target.value)
    switch (e.target.value) {
      case 'available': {
        setAvailability({ status: 'available', name: 'available' })
        break
      }
      case 'unavailable': {
        setAvailability({ status: 'unavailable', name: 'unavailable' })
        break
      }
      case 'on vacation': {
        setAvailability({ status: 'on vacation', name: 'on vacation' })
        break
      }
      default: {
        setAvailability({ status: null, name: 'Any' })
      }
    }
  }, [ setAvailability ])

  // Location
  const setLocationCB = useCallback((e) => {
    setLocation(e.target.value)
  }, [ setLocation ])

  return (
    <Box className='custom-box no-padding side-filter-root talent-filter'>
      <h2 className='h2 title talent-title'>Talent</h2>

      <Grid container justify='space-between' className='filter-buttons'>
        <Grid item>
          <h3 className='h3'> Filter </h3>
        </Grid>
        <Grid item>
          <Button
            onClick={ handleResetFilter }
            className='button-reset'
            classes={ {
              root: 'button-secondary-small',
              label: 'button-secondary-small-label',
            } }
          >
            Reset All
          </Button>
        </Grid>
      </Grid>

      <Divider className='full-border' />
      <div className='filter-section'>
        <div className='talent-filter-dropdown'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Skills </h4>
            <Button
              onClick={ () => { setSkill(talentFilterInitial.selectedSkill) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Clear All
            </Button>
          </div>
          <MultiSelectChipItems
            items={ jobSkills ? jobSkills.map((skill) => ({ id: skill.skillId, title: skill.skillName })) : [] }
            label='Choose Required Skills'
            initialData={ selectedSkill }
            onChange={ (items) => setSkill(items) }
            smallTag
          />
        </div>
      </div>
      <div className='filter-section'>
        <div className='talent-filter-dropdown'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Languages </h4>
            <Button
              onClick={ () => { setLanguage(talentFilterInitial.selectedLanguage) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Clear All
            </Button>
          </div>
          <MultiSelectChipItems
            items={ availableLanguages.map((lang) => ({ ...lang, title: _.capitalize(lang.title) })) }
            label='Choose Languages'
            initialData={ selectedLanguage }
            onChange={ (items) => setLanguage(items) }
            smallTag
          />
        </div>
      </div>

      <div className='filter-section'>
        <div className='control-buttons-wrapper'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Talent Type </h4>
            <Button
              onClick={ () => { setTalentType(talentFilterInitial.selectedTalentType) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Reset
            </Button>
          </div>
          <RadioGroup
            className='radio-buttons'
            value={ selectedTalentType.name }
            onChange={ setTalentTypeCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any' />
            <FormControlLabel value='freelancer' control={ <Radio /> } label='Freelancer' />
            <FormControlLabel value='employee' control={ <Radio /> } label='Employee' />
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <div className='control-buttons-wrapper'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Hourly rate </h4>
            <Button
              onClick={ () => { setHourlyRate(talentFilterInitial.selectedHourlyRate) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Reset
            </Button>
          </div>
          <RadioGroup
            className='radio-buttons'
            value={ selectedHourlyRate.name }
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
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Rating </h4>
            <Button
              onClick={ () => { setRating(talentFilterInitial.selectedRating) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Reset
            </Button>
          </div>
          <RadioGroup
            className='radio-buttons'
            value={ selectedRating.name }
            onChange={ setRatingCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any Rating' />
            <div className='rating-filter'>
              <FormControlLabel
                value='five'
                control={ <Radio /> }
                label={ (
                  <Rating
                    readOnly
                    className='rating-star no-margin'
                    size='small'
                    value={ 5 }
                  />
                ) }
              />
              {/* <FormControlLabel value='five' label='' /> */}
            </div>
            <div className='rating-filter'>
              <FormControlLabel
                value='fourAndAbove'
                control={ <Radio /> }
                label={ (
                  <Rating
                    readOnly
                    className='rating-star no-margin'
                    size='small'
                    value={ 4 }
                  />
                ) }
              />

              <span className='para'> & up </span>
            </div>
            <div className='rating-filter'>
              <FormControlLabel
                value='threeAndAbove'
                control={ <Radio /> }
                label={ (
                  <Rating
                    readOnly
                    className='rating-star no-margin'
                    size='small'
                    value={ 3 }
                  />
                ) }
              />
              <span className='para'> & up </span>
            </div>
          </RadioGroup>
        </div>
      </div>

      <div className='filter-section'>
        <div className='control-buttons-wrapper'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Verifications </h4>
            <Button
              onClick={ () => { setVerifications(talentFilterInitial.selectedVerifications) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Reset
            </Button>
          </div>
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
          {/* <h4 className='h4'> Availability </h4> */}
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Availability </h4>
            <Button
              onClick={ () => { setAvailability(talentFilterInitial.selectedAvailability) } }
              className='align-self-center'
              classes={ {
                root: 'button-primary-text light',
                label: 'button-primary-text-label underlined dark',
              } }
            >
              Reset
            </Button>
          </div>
          <RadioGroup
            className='radio-buttons'
            value={ selectedAvailability.name }
            onChange={ setAvailabilityCB }
          >
            <FormControlLabel value='Any' control={ <Radio /> } label='Any' />
            <FormControlLabel value='available' control={ <Radio /> } label='Available' />
            <FormControlLabel value='unavailable' control={ <Radio /> } label='Unavailable' />
            <FormControlLabel value='on vacation' control={ <Radio /> } label='On Vacation' />
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
