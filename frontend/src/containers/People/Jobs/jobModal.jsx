import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  IconButton,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import {
  jobTypes, employmentType, durationTypes, experienceTypes, locationTypes,
} from '../constants'
import { addJob, getJobFields, updateJob } from '../../../redux-saga/redux/people/actions'
import { jobDetailsFetchStart } from '../../../redux-saga/redux/actions'

const initialJobDetails = {
  jobId: '',
  title: '',
  description: '',
  categoryId: '',
  positionId: '',
  jobType: 'contract',
  employmentType: 'freelancer',
  durationType: 'ondemand',
  experienceType: 'entrylevel',
  locationType: 'remote',
  city: '',
  state: '',
  country: '',
}

const InputField = (name, label, value, onChange, rest) => (
  <TextField
    margin='dense'
    name={ name }
    fullWidth
    required
    variant='outlined'
    label={ label }
    value={ value }
    onChange={ onChange }
    { ...rest }
  />
)

const SelectField = (label, name, value, handleChange, menuItems, formClass) => (
  <FormControl className={ `people-job-select ${ formClass }` }>
    <InputLabel margin='dense' variant='outlined'>{label}</InputLabel>
    <Select
      margin='dense'
      variant='outlined'
      label={ label }
      name={ name }
      value={ value }
      fullWidth
      onChange={ handleChange }
      className='people-job-select'
    >
      <MenuItem value=''>
        <strong>{label}</strong>
      </MenuItem>
      {menuItems.map((item) => <MenuItem value={ item.value } key={ item.name }>{item.name}</MenuItem>)}
    </Select>
  </FormControl>
)

const JobModal = ({
  open, handleClose, onSubmit, isEdit, jobId,
}) => {
  const dispatch = useDispatch()
  const { jobFields, jobDetails, success } = useSelector((state) => state.jobDetails)
  const [ jobData, setJobData ] = useState(initialJobDetails)

  useEffect(() => {
    if (open) {
      // Fetching jod's details by id.
      if (isEdit && jobDetails.jobId !== jobId) {
        dispatch(jobDetailsFetchStart({ jobId }))
      }

      // Fetching job fields i.e. job categories and titles to select.
      if (!(jobFields.jobTitles && jobFields.jobTitles.length)) {
        dispatch(getJobFields())
      }

      // Updating job's details in the modal to update job's details.
      if (success) {
        setJobData(jobDetails)
      }
    }
    // eslint-disable-next-line
  }, [ dispatch, isEdit, open, jobId, success ])

  useEffect(() => {
    if (open && !isEdit) {
      setJobData(initialJobDetails)
    }
    // eslnt-disable-next-line
  }, [ open, isEdit ])

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setJobData((jobData) => ({ ...jobData, [event.target.name]: event.target.value }))
  }, [ setJobData ])

  const handleCancelButton = () => {
    handleClose()
    setJobData(initialJobDetails)
  }

  const handleSubmit = () => {
    if (!isEdit) {
      dispatch(addJob(jobData))
    } else {
      dispatch(updateJob(jobData))
    }
    handleCancelButton()
  }

  return (
    <Dialog open={ open } onClose={ handleClose } classes={ { paper: 'group-modal' } }>
      <div className='is-flex'>
        <DialogTitle className='text-align-center width-full'>
          {isEdit ? 'Update Job' : 'New Job'}
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton className='is-size-6' onClick={ handleClose }>
            <FontAwesomeIcon icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <form className='mb-10'>
          {InputField(
            'title', 'Title', jobData.title, handleChange,
          )}
          {InputField(
            'description', 'Description', jobData.description, handleChange, { multiline: 'true', rows: 4 },
          )}
          <div className='pt-10 pb-10'>
            {SelectField(
              'Job category', 'categoryId', jobData.categoryId, handleChange, jobFields.jobCategories, 'mr-4-per',
            )}
            {SelectField(
              'Job title', 'positionId', jobData.positionId, handleChange, jobFields.jobTitles,
            )}
          </div>
          <div className='pt-10 pb-10'>
            {SelectField(
              'Job type', 'jobType', jobData.jobType, handleChange, jobTypes, 'mr-4-per',
            )}
            {SelectField(
              'Employment type', 'employmentType', jobData.employmentType, handleChange, employmentType,
            )}
          </div>
          <div className='pt-10 pb-10'>
            {SelectField(
              'Duration type', 'durationType', jobData.durationType, handleChange, durationTypes, 'mr-4-per',
            )}
            {SelectField(
              'Experience type', 'experienceType', jobData.experienceType, handleChange, experienceTypes,
            )}
          </div>
          <div>
            {SelectField(
              'Location type', 'locationType', jobData.locationType, handleChange, locationTypes, 'mr-4-per mt-8',
            )}
            {InputField(
              'city', 'City', jobData.city, handleChange, { className: 'people-job-text' },
            )}
          </div>
          <div className='pt-6'>
            {InputField(
              'state', 'State', jobData.state, handleChange, { className: 'people-job-text mr-4-per' },
            )}
            {InputField(
              'country', 'Country', jobData.country, handleChange, { className: 'people-job-text' },
            )}
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          onClick={ handleCancelButton }
          className='custom-button-primary'
          classes={ { label: 'custom-button-label-hover' } }
        >
          Cancel
        </Button>
        <Button
          onClick={ handleSubmit }
          className='custom-button-primary'
          classes={ { label: 'custom-button-label-hover' } }
        >
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

JobModal.defaultProps = {
  isEdit: false,
  jobId: 0,
  onSubmit(e) {
    e.preventDefault()
  },
}

JobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func,
  isEdit: PropTypes.bool,
  jobId: PropTypes.number,
}

export default JobModal
