import React, { useState, useCallback, useEffect } from 'react'
import {
  Button, TextField, FormControl,
} from '@material-ui/core'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { useHistory } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { Autocomplete } from '@material-ui/lab'
import ROUTE_PATHS from '../../../../../routes/routesPath'
import MyUploadAdapter from '../../../../../utils/uploadImage'
import '../styles.scss'
import Loader from '../../../../../components/loaders/circularLoader'

const NewJobData = ({
  newJobData,
  setNewJobData,
  jobFields,
  setNewJobDataCB,
}) => {
  const dispatch = useDispatch()
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const [ inputValue, setInputValue ] = useState({
    categoryInput: '',
    titleInput: '',
  })
  const { jobDetails } = useSelector((state) => state.newJobDetails)

  // useEffect(() => {
  //   console.log(' jobDetails in jobData ====>>>>>', jobDetails)
  //   if (!_.isEmpty(jobId)) {
  //     // dispatch(newJobDetailsFetchStart({ jobId }))
  //     setNewJobData((currentNewJobData) => ({
  //       ...currentNewJobData,
  //       ...jobDetails,
  //     }))
  //   }
  // })

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
          onClick={ () => history.push(ROUTE_PATHS.PEOPLE_JOBS_TAB) }
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
              <Autocomplete
                getOptionSelected={ (option) => option.value }
                inputValue={ inputValue.categoryInput }
                clearOnBlur
                noOptionsText='no matches found'
                onInputChange={ (event, value) => setInputValue((state) => ({ ...state, categoryInput: value })) }
                // value={ newJobData.categoryId }
                onChange={ (event, currentValue) => {
                  if (!_.isEmpty(currentValue)) {
                    setNewJobData((jobData) => ({
                      ...jobData,
                      categoryId: currentValue.value,
                    }))
                  }
                } }
                options={ jobFields.jobCategories }
                getOptionLabel={ (option) => option.name }
                renderInput={ (params) => (
                  <TextField
                    { ...params }
                    margin='dense'
                    variant='outlined'
                  />
                ) }
                renderOption={ (option) => <span className='para light'>{option.name}</span> }
              />
            </FormControl>
          </div>

          <h3 className='mt-30 h3'> Job Title* </h3>
          <div className='mt-10'>
            <FormControl variant='outlined' className='drop-down-bar'>
              <Autocomplete
                getOptionSelected={ (option) => option.name }
                inputValue={ inputValue.titleInput }
                clearOnBlur
                noOptionsText='no matches found'
                // value={ newJobData.title }
                onInputChange={ (event, value) => setInputValue((state) => ({ ...state, titleInput: value })) }
                onChange={ (event, currentValue) => {
                  if (!_.isEmpty(currentValue)) {
                    setNewJobData((jobData) => ({
                      ...jobData,
                      title: currentValue.name,
                    }))
                  }
                } }
                options={ jobFields.jobTitles }
                getOptionLabel={ (option) => option.name }
                renderInput={ (params) => (
                  <TextField
                    { ...params }
                    margin='dense'
                    variant='outlined'
                  />
                ) }
                renderOption={ (option) => <span className='para light'>{option.name}</span> }
              />
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
              value={ newJobData.needed }
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
        data={ newJobData.description }
        onInit={ (editor) => {
          // eslint-disable-next-line
          editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
            return new MyUploadAdapter(loader, setIsImageUploading, dispatch)
          }
        } }
      />
      <Loader
        displayLoaderManually={ isImageUploading }
        enableOverlay={ false }
        size={ 50 }
      />
    </div>
  )
}

NewJobData.defaultProps = {
  jobFields: { jobCategories: [ 'Accounting', 'Client Service', 'Customer Service' ] },
}

NewJobData.propTypes = {
  // eslint-disable-next-line react/forbid-prop-types
  newJobData: PropTypes.object.isRequired,
  setNewJobData: PropTypes.func.isRequired,
  jobFields: PropTypes.arrayOf(PropTypes.string),
  setNewJobDataCB: PropTypes.func.isRequired,
}

export default React.memo(NewJobData)
