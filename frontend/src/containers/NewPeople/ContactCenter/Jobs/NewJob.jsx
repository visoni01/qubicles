import React, { useState, useCallback } from 'react'
import {
  Grid, Button, TextField, Select,
  FormControl, MenuItem, RadioGroup,
  FormControlLabel, Radio, InputBase,
  InputLabel,
} from '@material-ui/core'
import {
  faChevronLeft, faSearch,
} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from 'react-router-dom'
import MyUploadAdapter from '../../../../utils/uploadImage'
import Actions from './Actions'
import { newNavBar } from '../../../../hoc/navbar'
import './styles.scss'
import ROUTE_PATHS from '../../../../routes/routesPath'
import JobApplicationActions from './JobApplicationActions'

const NewJob = () => {
  const [ jobCategory, setJobCategory ] = useState('')
  const [ selectedCategory, setCategory ] = useState('')

  const setJobCategoryCB = useCallback((event) => {
    setJobCategory(event.target.value)
  }, [])

  const availableCategories = [ 'Customer Service', 'Phone Calling', 'Email Support', 'Active Sales', 'Agent Support' ]
  const availableSkills = [ 'Skill 1', 'Skill 2', 'Skill 3', 'Skill 4' ]
  const availableLanguages = [ 'English', 'French', 'Spanish' ]

  const setCategoryCB = useCallback((e) => {
    setCategory(e.target.value)
  }, [])

  const history = useHistory()

  return (
    <Grid container spacing={ 3 }>
      <Grid item xl={ 9 } lg={ 9 } md={ 9 } sm={ 8 }>
        <div className='box new-job-root has-fullwidth'>
          <div className='mb-20'>
            <Button
              classes={ {
                root: 'MuiButtonBase-root button-primary-small',
                label: 'MuiButton-label button-primary-small-label',
              } }
              onClick={ () => history.push(ROUTE_PATHS.NEW_PEOPLE) }
            >
              <FontAwesomeIcon icon={ faChevronLeft } className='mr-10' />
              Back
            </Button>
          </div>
          <h2 className='h2 '> New Job Post</h2>
          <div className='category-section mt-20'>
            <div className='is-halfwidth'>
              <h3 className='h3'> Category </h3>
              <div>
                <FormControl variant='outlined' className='drop-down-bar'>
                  <InputLabel>Choose category</InputLabel>
                  <Select
                    native
                    label='Choose category'
                    onChange={ setCategoryCB }
                  >
                    <option aria-label='None' value='' />
                    {availableCategories.map((skill) => (
                      <option key={ skill } value={ skill }>
                        {skill}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              </div>

            </div>
            <div className='is-halfwidth'>
              <h3 className='h3'> Needed </h3>
              <div className='display-inline-flex '>
                <TextField
                  margin='dense'
                  id='agentNumber'
                  type='number'
                  className='agent-field'
                  variant='outlined'
                  required
                />
                <h4 className='h4 agent-label'> Agents </h4>
              </div>
            </div>
          </div>

          <h3 className='mt-30 h3'> Job Title</h3>
          <TextField
            margin='dense'
            id='jobTitle'
            fullWidth
            variant='outlined'
            placeholder='Title'
            required
          />

          <h3 className='mt-30 h3'> Job Description</h3>
          <CKEditor
            editor={ ClassicEditor }
            className='mt-5'
          />
        </div>

        <div className='box new-job-root job-requirements-root has-fullwidth'>
          <h3 className='mt-10 h3'> Requirements </h3>
          <div className='category-section mt-30'>
            <div className='is-halfwidth'>
              <div>
                <h4 className='h4'> Required Skills </h4>
                <FormControl variant='outlined' className='drop-down-bar'>
                  <InputLabel>Required Skills</InputLabel>
                  <Select
                    native
                    label='Required Skills'
                    onChange={ setCategoryCB }
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
              <div>
                <h4 className='mt-30 h4'> Required Courses</h4>
                <div className='new-input-search'>
                  <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
                  <InputBase
                    placeholder='Search Courses'
                    className='input-field'
                  />
                </div>
              </div>
            </div>
            <div className='is-halfwidth'>
              <div>
                <h4 className='h4 '> Bonus Skills </h4>
                <FormControl variant='outlined' className='drop-down-bar'>
                  <InputLabel>Bonus Skills</InputLabel>
                  <Select
                    native
                    label='Bonus Skills'
                    onChange={ setCategoryCB }
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
              <div>
                <h4 className='mt-30 h4'> Bonus Courses</h4>
                <div className='new-input-search'>
                  <FontAwesomeIcon icon={ faSearch } className='ml-10 mr-10 fontawesome-icon' />
                  <InputBase
                    placeholder='Search Courses'
                    className='input-field'
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className='box new-job-root job-details-root has-fullwidth'>
          <h3 className='mt-10 h3'> Details </h3>
          <div className='category-section mt-30'>
            <div className='is-halfwidth'>
              <h4 className='h4'> Job Type* </h4>
              <RadioGroup
                name='permission'
                label='Permission'
                className='is-display-block mt-10 radio-buttons'
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
                >
                  <div className='display-inline-flex'>
                    <FormControlLabel value='on-demand' control={ <Radio /> } label='On-demand' />
                    <FormControlLabel value='months' control={ <Radio /> } />
                    {/* <InputBase
                      placeholder='Eg 15'
                      className='filter-input'
                      type='number'
                      // value={ duration }
                      // onChange={ setDurationCB }
                    />
                    <span className='input-label'>
                      Months
                    </span> */}
                    <TextField
                      margin='dense'
                      id='duration'
                      type='number'
                      className='duration-field'
                      variant='outlined'
                      required
                    />
                    <p className='duration-label para'> Months </p>
                    <FormControlLabel value='open-ended' control={ <Radio /> } label='Open-ended' />
                  </div>
                </RadioGroup>
              </div>

              <h4 className='mt-30 h4'> Location </h4>
              <TextField
                margin='dense'
                id='jobTitle'
                className='locatiom'
                variant='outlined'
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
                  variant='outlined'
                  required
                />
                <p className='duration-label para'> $/hour </p>
              </div>

              <h4 className='h4 mt-30'> Experience Level </h4>
              <RadioGroup
                name='permission'
                label='Permission'
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
                  label='Languages'
                  onChange={ setCategoryCB }
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

      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 4 }>
        <JobApplicationActions />
      </Grid>
    </Grid>
  )
}

export default newNavBar(NewJob)
