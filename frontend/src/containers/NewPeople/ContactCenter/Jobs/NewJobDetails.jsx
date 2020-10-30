import React, { useState, useCallback } from 'react'
import {
  TextField, Select,
  FormControl, InputLabel, RadioGroup,
  FormControlLabel, Radio, InputBase,
} from '@material-ui/core'
import './styles.scss'

const NewJobDetails = () => {
  const [ newJobDetails, setNewJobDetails ] = useState({
    jobType: '',
    payment: '',
    duration: '',
    experience: '',
    location: '',
    languages: '',
  })

  const setNewJobDetailsCB = useCallback((event) => {
    const { name, value } = event.target
    setNewJobDetails((currentNewJobDetails) => ({
      ...currentNewJobDetails,
      [ name ]: value,
    }))
  }, [ ])

  const availableLanguages = [ 'English', 'French', 'Spanish' ]

  return (
    <div className='box new-job-root job-details-root has-fullwidth'>
      <h3 className='mt-10 h3'> Details </h3>
      <div className='category-section mt-30'>
        <div className='is-halfwidth'>
          <h4 className='h4'> Job Type* </h4>
          <RadioGroup
            name='jobType'
            label='jobType'
            className='is-display-block mt-10 radio-buttons'
            onChange={ setNewJobDetailsCB }
          >
            <div className='display-inline-flex'>
              <FormControlLabel
                value='public'
                control={ <Radio size='small' /> }
                label='Public'
                className='para'
              />
              <FormControlLabel
                value='private'
                control={ <Radio size='small' /> }
                label='Private'
                className='para'
              />
            </div>
          </RadioGroup>

          <div className='duration-section mt-30'>
            <h4 className='h4'> Duration* </h4>
            <RadioGroup
              className='radio-buttons'
              name='duration'
              onChange={ setNewJobDetailsCB }
            >
              <div className='display-inline-flex'>
                <FormControlLabel value='on-demand' control={ <Radio /> } label='On-demand' />
                <FormControlLabel value='months' control={ <Radio /> } />
                <TextField
                  margin='dense'
                  variant='outlined'
                  className='duration-field'
                  id='duration'
                  type='number'
                  name='duration'
                  onChange={ setNewJobDetailsCB }
                  required
                />
                <p className='duration-label para mr-10'> Months </p>
                <FormControlLabel value='open-ended' control={ <Radio /> } label='Open-ended' />
              </div>
            </RadioGroup>
          </div>

          <h4 className='mt-30 h4'> Location </h4>
          <TextField
            margin='dense'
            id='location'
            className='locatiom'
            variant='outlined'
            name='location'
            onChange={ setNewJobDetailsCB }
            placeholder='Any (Remote)'
            required
          />
        </div>

        <div className='is-halfwidth'>
          <h4 className='h4'> Payment*  </h4>
          <div className='display-inline-flex mt-5'>
            <TextField
              margin='dense'
              id='payment'
              type='number'
              className='duration-field'
              name='payment'
              onChange={ setNewJobDetailsCB }
              variant='outlined'
              required
            />
            <p className='duration-label para'> $/hour </p>
          </div>

          <h4 className='h4 mt-30'> Experience Level </h4>
          <RadioGroup
            name='experience'
            onChange={ setNewJobDetailsCB }
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
                value='mid'
                control={ <Radio size='small' /> }
                label='Mid'
                className='para'
              />
              <FormControlLabel
                value='senior'
                control={ <Radio size='small' /> }
                label='Senior'
                className='para'
              />
            </div>
          </RadioGroup>

          <h4 className='mt-30 h4'> Languages(s) </h4>
          <FormControl variant='outlined' className='drop-down-bar'>
            <InputLabel>Languages</InputLabel>
            <Select
              native
              name='languages'
              onChange={ setNewJobDetailsCB }
              label='Languages'
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
    </div>
  )
}

export default NewJobDetails
