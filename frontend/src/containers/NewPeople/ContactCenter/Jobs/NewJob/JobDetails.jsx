import React, { useState, useCallback } from 'react'
import {
  TextField, Select, MenuItem,
  FormControl, RadioGroup,
  FormControlLabel, Radio,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import '../styles.scss'

const NewJobDetails = ({
  newJobData,
  setNewJobData,
  setNewJobDataCB,
}) => {
  const [ languages, setLanguages ] = useState([ 'english' ])

  const setLanguageCB = useCallback((event) => {
    setLanguages(event.target.value)
    const language = event.target.value.toString()
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      languages: language,
    }))
  }, [ setLanguages, setNewJobData ])

  const availableLanguages = [
    { name: 'English', value: 'english' },
    { name: 'French', value: 'french' },
    { name: 'Spanish', value: 'spanish' },
  ]

  const durationTypes = [
    { name: 'On demand', value: 'ondemand' },
    { name: 'Upto 1 month', value: 'upto1month' },
    { name: 'Upto 3 months', value: 'upto3months' },
    { name: 'Upto 6 months', value: 'upto6months' },
    { name: 'More than 6 months', value: 'morethan6months' },
  ]

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
            <FormControl variant='outlined' margin='dense' className='drop-down-bar'>
              <Select
                margin='dense'
                variant='outlined'
                name='durationType'
                value={ newJobData.durationType }
                onChange={ setNewJobDataCB }
              >
                {durationTypes.map((duration) => (
                  <MenuItem key={ duration.value } value={ duration.value }>
                    {duration.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
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
              onChange={ setNewJobDataCB }
              required
            />
            <p className='duration-label para'> $/hour </p>
          </div>

          <h4 className='h4 mt-30'> Experience Level </h4>
          <RadioGroup
            name='experienceType'
            onChange={ setNewJobDataCB }
            label='experience'
            className='is-display-block mt-10 radio-buttons'
          >
            <div className='display-inline-flex'>
              <FormControlLabel
                value='entrylevel'
                control={ <Radio size='small' /> }
                label='Entry'
                className='para'
              />
              <FormControlLabel
                value='intermediate'
                control={ <Radio size='small' /> }
                label='Mid'
                className='para'
              />
              <FormControlLabel
                value='expert'
                control={ <Radio size='small' /> }
                label='Senior'
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
  newJobData: PropTypes.bool.isRequired,
  setNewJobData: PropTypes.func.isRequired,
  setNewJobDataCB: PropTypes.func.isRequired,
}

export default NewJobDetails
