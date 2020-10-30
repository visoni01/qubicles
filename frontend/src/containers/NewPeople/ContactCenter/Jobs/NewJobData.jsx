import React, { useState, useCallback } from 'react'
import {
  Button, TextField, Select, FormControl, InputLabel,
} from '@material-ui/core'
import { faChevronLeft, faChevronDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from 'react-router-dom'
import MyUploadAdapter from '../../../../utils/uploadImage'
import './styles.scss'
import ROUTE_PATHS from '../../../../routes/routesPath'

const NewJobData = () => {
  const [ newJobData, setNewJobData ] = useState({
    jobCategory: '',
    agentCount: '',
    jobTitle: '',
    jobDescription: '',
  })

  const setNewJobDataCB = useCallback((event) => {
    const { name, value } = event.target
    setNewJobData((currentNewJobData) => ({
      ...currentNewJobData,
      [ name ]: value,
    }))
  }, [ ])

  const availableCategories = [ 'Customer Service', 'Phone Calling', 'Email Support', 'Active Sales', 'Agent Support' ]

  const history = useHistory()
  return (
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
          <div className='mt-10'>
            <FormControl variant='outlined' className='drop-down-bar'>
              <InputLabel margin='dense' variant='outlined'>Choose job category</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                // IconComponent={ () => (<FontAwesomeIcon icon={ faChevronDown } />) }
                native
                name='jobCategory'
                placeholder='Choose job category'
                label='Choose job category'
                onChange={ setNewJobDataCB }
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
              name='agentCount'
              type='number'
              className='agent-field'
              variant='outlined'
              onChange={ setNewJobDataCB }
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
        name='jobTitle'
        fullWidth
        variant='outlined'
        placeholder='Title'
        onChange={ setNewJobDataCB }
        required
      />

      <h3 className='mt-30 mb-10 h3'> Job Description </h3>
      <CKEditor
        editor={ ClassicEditor }
        className='mt-10'
        name='JobDescription'
      />
    </div>
  )
}

export default NewJobData
