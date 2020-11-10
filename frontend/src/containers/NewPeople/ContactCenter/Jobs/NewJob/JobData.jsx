import React, { useState, useCallback } from 'react'
import {
  Button, TextField, Select, FormControl, MenuItem,
} from '@material-ui/core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch } from 'react-redux'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import MyUploadAdapter from '../../../../../utils/uploadImage'
import '../styles.scss'

const NewJobData = ({
  newJobData,
  setNewJobData,
  jobFields,
  setNewJobDataCB,
}) => {
  // console.log('jobCategories in Newjobdata compo', jobCategories)
  const dispatch = useDispatch()
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const handleDescriptionData = useCallback((event, editor) => {
    // eslint-disable-next-line
    setNewJobData((jobData) => ({
      ...jobData,
      description: editor.getData(),
    }))
  }, [ setNewJobData ])

  const history = useHistory()
  return (
    <div className='custom-box new-job-root has-fullwidth'>
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
          <h3 className='h3'> Category* </h3>
          <div className='mt-10'>
            <FormControl variant='outlined' className='drop-down-bar'>
              <Select
                margin='dense'
                variant='outlined'
                // native
                name='categoryId'
                placeholder='Choose job category'
                onChange={ setNewJobDataCB }
              >
                {jobFields.jobCategories.map((category) => (
                  <MenuItem key={ category } value={ category.value }>
                    {category.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <h3 className='mt-30 h3'> Job Title* </h3>
          <div className='mt-10'>
            <FormControl variant='outlined' className='drop-down-bar'>
              <Select
                margin='dense'
                variant='outlined'
                id='title'
                name='title'
                placeholder='Title'
                onChange={ setNewJobDataCB }
              >
                {jobFields.jobTitles.map((title) => (
                  <MenuItem key={ title.value } value={ title.name }>
                    {title.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
        </div>
        <div className='is-halfwidth'>
          <h3 className='h3'> Needed* </h3>
          <div className='display-inline-flex '>
            <TextField
              margin='dense'
              id='agentNumber'
              name='needed'
              type='number'
              className='agent-field'
              variant='outlined'
              placeholder='20'
              onChange={ setNewJobDataCB }
              required
            />
            <h4 className='h4 agent-label'> Agents </h4>
          </div>
        </div>
      </div>

      <h3 className='mt-30 mb-10 h3'> Job Description* </h3>
      <CKEditor
        editor={ ClassicEditor }
        onChange={ handleDescriptionData }
        className='mt-10'
        name='description'
        onInit={ (editor) => {
          // eslint-disable-next-line
          editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new MyUploadAdapter(loader, setIsImageUploading, dispatch)
          }
        } }
      />
    </div>
  )
}

NewJobData.defaultProps = {
  jobFields: { jobCategories: [ 'Accounting', 'Client Service', 'Customer Service' ] },
}

NewJobData.propTypes = {
  newJobData: PropTypes.bool.isRequired,
  setNewJobData: PropTypes.func.isRequired,
  jobFields: PropTypes.arrayOf(PropTypes.string),
  setNewJobDataCB: PropTypes.func.isRequired,
}

export default NewJobData
