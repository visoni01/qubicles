import React, { useState, useCallback } from 'react'
import {
  TextField, Select, MenuItem,
  FormControl, RadioGroup,
  FormControlLabel, Radio,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import { availableLanguages } from '../../constants'
import { jobDetailsPropTypes } from '../jobsValidator'
import errorsPropTypes from './errorsPropTypes'

const NewJobDetails = ({
  newJobData,
  setNewJobData,
  setNewJobDataCB,
  errors,
}) => {
  // eslint-disable-next-line no-unused-vars
  const [ languages, setLanguages ] = useState([ 'english', 'spanish' ])

  const setDurationMonthsCB = useCallback((e) => {
    const month = e.target.value
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      durationType: 'months',
      durationMonths: month,
    }))
  }, [ setNewJobData ])

  const setDurationTypeCB = useCallback((e) => {
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      durationType: e.target.value,
      durationMonths: 0,
    }))
  }, [ setNewJobData ])

  // Set Languages
  const setLanguageCB = useCallback((event) => {
    setLanguages(event.target.value)
    const language = event.target.value.toString()
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      languages: language,
    }))
  }, [ setLanguages, setNewJobData ])

  return (
    <div className='custom-box new-job-root job-details-root has-fullwidth'>
      <h3 className='mt-10 h3'> Details </h3>
      <div className='category-section mt-30'>
        <div className='is-halfwidth'>
          <h4 className='h4'> Job Type* </h4>
          <RadioGroup
            name='jobType'
            label='jobType'
            className='is-display-block mt-10 radio-buttons'
            value={ newJobData.jobType }
            onChange={ setNewJobDataCB }
          >
            <div className='display-inline-flex'>
              <FormControlLabel
                value='fulltime'
                control={ <Radio size='small' /> }
                label='Full time'
                className='para'
              />
              <FormControlLabel
                value='parttime'
                control={ <Radio size='small' /> }
                label='Part time'
                className='para'
              />
              <FormControlLabel
                value='contract'
                control={ <Radio size='small' /> }
                label='Contract'
                className='para'
              />
            </div>
          </RadioGroup>

          <div className='duration-section mt-30'>
            <h4 className='h4'> Duration* </h4>
            <RadioGroup
              className='radio-buttons'
              name='durationType'
              value={ newJobData.durationType }
              onChange={ setDurationTypeCB }
            >
              <div className='display-inline-flex'>
                <FormControlLabel value='on-demand' control={ <Radio /> } label='On-demand' />
                <FormControlLabel
                  value='months'
                  control={ <Radio /> }
                />
                <TextField
                  margin='dense'
                  variant='outlined'
                  className='duration-field'
                  id='months'
                  type='number'
                  InputProps={ { inputProps: { min: 0, step: 1 } } }
                  name='duration'
                  value={ newJobData.durationMonths }
                  disabled={ !(newJobData.durationType === 'months') }
                  onChange={ setDurationMonthsCB }
                  required
                  error={ errors && !!errors.durationMonths }
                  helperText={ errors && errors.durationMonths ? errors.durationMonths.message : '' }
                />
                <p className='duration-label para mr-10'> Months </p>
                <FormControlLabel value='open-ended' control={ <Radio /> } label='Open-ended' />
              </div>
            </RadioGroup>
          </div>

          <h4 className='mt-30 mb-5 h4'> Languages(s) </h4>
          <FormControl variant='outlined' margin='dense' className='drop-down-bar'>
            <Select
              multiple
              margin='dense'
              variant='outlined'
              name='languages'
              value={ newJobData.languages.split(',') }
              onChange={ setLanguageCB }
            >
              {availableLanguages.map((language) => (
                <MenuItem key={ language.value } value={ language.value }>
                  {language.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </div>

        <div className='is-halfwidth'>
          <h4 className='h4'> Payment*  </h4>
          <div className='display-inline-flex'>
            <TextField
              margin='dense'
              variant='outlined'
              id='payAmount'
              type='number'
              InputProps={ { inputProps: { min: 0, step: 1 } } }
              className='duration-field'
              name='payAmount'
              placeholder='10'
              value={ newJobData.payAmount }
              onChange={ setNewJobDataCB }
              required
              error={ errors && !!errors.payAmount }
              helperText={ errors && errors.payAmount ? errors.payAmount.message : '' }
            />
            <p className='duration-label para'> $/hour </p>
          </div>

          <h4 className='h4 mt-30'> Experience Level </h4>
          <RadioGroup
            name='experienceType'
            value={ newJobData.experienceType }
            onChange={ setNewJobDataCB }
            label='experience'
            className='is-display-block mt-10 radio-buttons'
          >
            <div className='display-inline-flex'>
              <FormControlLabel
                value='entry'
                control={ <Radio size='small' /> }
                label='Entry'
                className='para'
              />
              <FormControlLabel
                value='intermediate'
                control={ <Radio size='small' /> }
                label='Intermediate'
                className='para'
              />
              <FormControlLabel
                value='expert'
                control={ <Radio size='small' /> }
                label='Expert'
                className='para'
              />
            </div>
          </RadioGroup>

        </div>
      </div>
    </div>
  )
}

NewJobDetails.defaultProps = {
  newJobData: {
    jobId: '',
    categoryId: '',
    categoryName: '',
    needed: 0,
    title: '',
    description: '',
    status: 'recruiting',
    jobType: 'contract',
    payAmount: 0,
    durationType: 'on-demand',
    durationMonths: 0,
    experienceType: 'entry',
    employmentType: 'freelancer',
    languages: 'english',
    jobSkillsData: {
      requiredSkills: [],
      bonusSkills: [ ],
    },
    jobCoursesData: {
      requiredCourses: [],
      bonusCourses: [ ],
    },
  },
}

NewJobDetails.propTypes = {
  newJobData: jobDetailsPropTypes,
  setNewJobData: PropTypes.func.isRequired,
  setNewJobDataCB: PropTypes.func.isRequired,
  errors: errorsPropTypes.isRequired,
}

export default React.memo(NewJobDetails)
