import React, { useState, useCallback, useEffect } from 'react'
import {
  TextField, Select, MenuItem,
  FormControl, RadioGroup,
  FormControlLabel, Radio,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'
import { availableLanguages } from '../../constants'

const NewJobDetails = ({
  newJobData,
  setNewJobData,
  setNewJobDataCB,
}) => {
  const [ languages, setLanguages ] = useState([ 'english' ])

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

  useEffect(() => {

  }, [])

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
                label='Fulltime'
                className='para'
              />
              <FormControlLabel
                value='parttime'
                control={ <Radio size='small' /> }
                label='Parttime'
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
                  name='duration'
                  value={ newJobData.durationMonths }
                  disabled={ !(newJobData.durationType === 'months') }
                  onChange={ setDurationMonthsCB }
                  required
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
              value={ languages }
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
              className='duration-field'
              name='payAmount'
              placeholder='10'
              value={ newJobData.payAmount }
              onChange={ setNewJobDataCB }
              required
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

NewJobDetails.propTypes = {
  newJobData: PropTypes.shape(PropTypes.any).isRequired,
  setNewJobData: PropTypes.func.isRequired,
  setNewJobDataCB: PropTypes.func.isRequired,
}

export default React.memo(NewJobDetails)
