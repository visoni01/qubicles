import React, { useState, useCallback, useEffect } from 'react'
import {
  Box, Divider,
  RadioGroup, FormControlLabel, Radio,
  TextareaAutosize, Button, Grid,
} from '@material-ui/core'
import { Rating } from '@material-ui/lab'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import MultiSelectChipItems from '../../../Shared/multiSelectChipItems'
import {
  fetchJobSkillsStart, jobCategoriesOnlyFetchStart, fetchAgentJobsStart,
} from '../../../../redux-saga/redux/actions'
import {
  jobFilterInitialState,
  resetJobFilter, updateJobFilter,
} from '../../../../redux-saga/redux/people/job/jobFilter'

const AgentJobsFilter = () => {
  const dispatch = useDispatch()
  const { jobSkills } = useSelector((state) => state.jobSkills)
  const { jobCategoriesOnly, success: jobCategoryFetchSuccess } = useSelector((state) => state.jobCategoriesOnly)
  const { jobFilter } = useSelector((state) => state.jobFilter)

  const [ selectedSkill, setSkill ] = useState(jobFilter.selectedSkill)
  const [ selectedCategory, setCategory ] = useState(jobFilter.selectedCategory)
  const [ selectedLanguage, setLanguage ] = useState(jobFilter.selectedLanguage)
  const [ selectedEmploymentType, setEmploymentType ] = useState(jobFilter.selectedEmploymentType)
  const [ selectedHourlyRate, setHourlyRate ] = useState(jobFilter.selectedHourlyRate)
  const [ selectedRating, setRating ] = useState(jobFilter.selectedRating)
  const [ selectedLocation, setLocation ] = useState(jobFilter.selectedLocation)

  useEffect(() => {
    // Update Talent Filter in Store
    dispatch(updateJobFilter({
      jobFilter: {
        ...jobFilter,
        selectedCategory,
        selectedSkill,
        selectedLanguage,
        selectedHourlyRate,
        selectedRating,
        selectedEmploymentType,
      },
    }))

    // Apply search on filter change
    dispatch((fetchAgentJobsStart({
      requiredSkills: selectedSkill.map((skill) => skill.id),
      requiredLanguages: selectedLanguage.map((lang) => _.lowerFirst(lang.title)),
      requiredHourlyRate: selectedHourlyRate,
      requiredRating: selectedRating,
      requiredLocation: selectedLocation,
      searchKeyword: jobFilter.searchKeyword,
      requiredCategory: selectedCategory.map((category) => category.id),
    })))
    // To prevent maximum depth warning in dependency array
    // eslint-disable-next-line
  }, [
    dispatch,
    selectedCategory,
    selectedSkill,
    selectedLanguage,
    selectedHourlyRate,
    selectedRating,
    selectedEmploymentType,
    selectedLocation,
  ])

  useEffect(() => {
    if (!jobSkills) {
      // Get Skills in store if not present
      dispatch(fetchJobSkillsStart({}))
    }

    if (_.isEmpty(jobCategoriesOnly) && !jobCategoryFetchSuccess) {
      dispatch(jobCategoriesOnlyFetchStart({ searchKeyword: '' }))
    }
  }, [ dispatch, jobSkills, jobCategoriesOnly, jobCategoryFetchSuccess ])

  const { jobFilter: jobFilterInitial } = jobFilterInitialState
  const handleResetFilter = useCallback(() => {
    setCategory(jobFilterInitial.selectedCategory)
    setSkill(jobFilterInitial.selectedSkill)
    setLanguage(jobFilterInitial.selectedLanguage)
    setHourlyRate(jobFilterInitial.selectedHourlyRate)
    setRating(jobFilterInitial.selectedRating)
    setEmploymentType(jobFilterInitial.selectedEmploymentType)

    dispatch(resetJobFilter())
  }, [ dispatch, jobFilterInitial ])

  // Languages
  const availableLanguages = [
    { id: 1, title: 'english' },
    { id: 2, title: 'french' },
    { id: 3, title: 'spanish' },
  ]

  // Talent Type
  const setTalentTypeCB = useCallback((e) => {
    // setEmploymentType(e.target.value)
    switch (e.target.value) {
      case 'freelancer': {
        setEmploymentType({ employmentType: 'freelancer', name: 'freelancer' })
        break
      }
      case 'employee': {
        setEmploymentType({ employmentType: 'employee', name: 'employee' })
        break
      }
      default: {
        setEmploymentType({ employmentType: null, name: 'Any' })
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

  // Location
  const setLocationCB = useCallback((e) => {
    setLocation(e.target.value)
  }, [ setLocation ])

  return (
    <Box className='custom-box no-padding side-filter-root talent-filter'>
      <h2 className='h2 title talent-title'>Jobs</h2>

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
            <h4 className='h4'> Category </h4>
            <Button
              onClick={ () => { setCategory(jobFilterInitial.selectedCategory) } }
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
            items={ jobCategoriesOnly
              ? jobCategoriesOnly.map((category) => ({ id: category.categoryId, title: category.categoryTitle }))
              : [] }
            label='Choose Category'
            initialData={ selectedCategory }
            onChange={ (items) => setCategory(items) }
            smallTag
          />
        </div>
      </div>
      <div className='filter-section'>
        <div className='talent-filter-dropdown'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Skills </h4>
            <Button
              onClick={ () => { setSkill(jobFilterInitial.selectedSkill) } }
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
              onClick={ () => { setLanguage(jobFilterInitial.selectedLanguage) } }
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
          <h4 className='h4'> Location </h4>
          <div className='input-box mr-15'>
            <TextareaAutosize
              disabled
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

      <div className='filter-section'>
        <div className='control-buttons-wrapper'>
          <div className='is-fullwidth display-inline-flex justify-between'>
            <h4 className='h4'> Employment Type </h4>
            <Button
              onClick={ () => { setEmploymentType(jobFilterInitial.selectedEmploymentType) } }
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
            value={ selectedEmploymentType.name }
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
              onClick={ () => { setHourlyRate(jobFilterInitial.selectedHourlyRate) } }
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
            <h4 className='h4'> Employer's Rating </h4>
            <Button
              onClick={ () => { setRating(jobFilterInitial.selectedRating) } }
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
    </Box>
  )
}

export default AgentJobsFilter
