import React, { useState, useCallback, useEffect } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Checkbox,
  Button,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import {
  jobTypes, employmentType, durationTypes, experienceTypes, locationTypes,
} from '../constants'
import { addJob, getJobFields, updateJob } from '../../../redux-saga/redux/people/actions'
import { jobDetailsFetchStart } from '../../../redux-saga/redux/actions'
import People from '../../../redux-saga/service/people'

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
  }, [ dispatch, isEdit, open, jobId, success ])

  useEffect(() => {
    if (open && !isEdit) {
      setJobData(initialJobDetails)
    }
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
      <DialogTitle className='text-align-center'>
        {isEdit ? 'Update Job' : 'New Job'}
      </DialogTitle>
      <DialogContent>
        <form className='mb-10'>
          <TextField
            margin='dense'
            name='title'
            fullWidth
            variant='outlined'
            label='Title'
            value={ jobData.title }
            onChange={ handleChange }
          />
          <TextField
            margin='dense'
            name='description'
            fullWidth
            variant='outlined'
            label='Description'
            value={ jobData.description }
            onChange={ handleChange }
            multiline
            rows={ 4 }
          />
          <div className='pt-10 pb-10'>
            <FormControl className='people-job-select mr-10-per'>
              <InputLabel margin='dense' variant='outlined'>Job category</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Job category'
                name='categoryId'
                value={ jobData.categoryId }
                fullWidth
                onChange={ handleChange }
                className='people-job-select'
              >
                <MenuItem value=''>
                  <strong>Job category</strong>
                </MenuItem>
                {jobFields.jobCategories && jobFields.jobCategories.map((category) => <MenuItem value={ category.value } key={ category.name }>{category.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className='people-job-select'>
              <InputLabel margin='dense' variant='outlined'>Job title</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Job title'
                name='positionId'
                value={ jobData.positionId }
                fullWidth
                className='people-job-select'
                onChange={ handleChange }
              >
                <MenuItem value=''>
                  <strong>Job title</strong>
                </MenuItem>
                {jobFields.jobTitles && jobFields.jobTitles.map((title) => (
                  <MenuItem value={ title.value } key={ title.name }>{title.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='pt-10 pb-10'>
            <FormControl className='people-job-select mr-10-per'>
              <InputLabel margin='dense' variant='outlined'>Job type</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Job type'
                name='jobType'
                value={ jobData.jobType }
                fullWidth
                onChange={ handleChange }
                className='people-job-select'
              >
                <MenuItem value=''>
                  <strong>Job type</strong>
                </MenuItem>
                {jobTypes.map((job) => <MenuItem value={ job.value } key={ job.name }>{job.name}</MenuItem>)}
              </Select>
            </FormControl>
            <FormControl className='people-job-select'>
              <InputLabel margin='dense' variant='outlined'>Employment type</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Employment type'
                name='employmentType'
                value={ jobData.employmentType }
                fullWidth
                className='people-job-select'
                onChange={ handleChange }
              >
                <MenuItem value=''>
                  <strong>Employment type</strong>
                </MenuItem>
                {employmentType.map((employment) => (
                  <MenuItem value={ employment.value } key={ employment.name }>{employment.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div className='pt-10 pb-10'>
            <FormControl className='people-job-select mr-10-per'>
              <InputLabel margin='dense' variant='outlined'>Duration type</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Duration type'
                name='durationType'
                value={ jobData.durationType }
                fullWidth
                onChange={ handleChange }
                className='people-job-select'
              >
                <MenuItem value=''>
                  <strong>Duration type</strong>
                </MenuItem>
                {durationTypes.map((duration) => (
                  <MenuItem value={ duration.value } key={ duration.name }>{duration.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl className='people-job-select'>
              <InputLabel margin='dense' variant='outlined'>Experience type</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                label='Experience type'
                name='experienceType'
                value={ jobData.experienceType }
                fullWidth
                className='people-job-select'
                onChange={ handleChange }
              >
                <MenuItem value=''>
                  <strong>Experience type</strong>
                </MenuItem>
                {experienceTypes.map((experience) => (
                  <MenuItem value={ experience.value } key={ experience.name }>{experience.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>
          <div>
            <FormControl className='people-job-select mr-10-per' margin='dense'>
              <InputLabel margin='dense' variant='outlined'>Location type</InputLabel>
              <Select
                margin='dense'
                variant='outlined'
                name='locationType'
                label='Location type'
                value={ jobData.locationType }
                fullWidth
                onChange={ handleChange }
                className='people-job-select'
              >
                <MenuItem value=''>
                  <strong>Location type</strong>
                </MenuItem>
                {locationTypes.map((location) => (
                  <MenuItem value={ location.value } key={ location.name }>{location.name}</MenuItem>
                ))}
              </Select>
            </FormControl>
            <TextField
              margin='dense'
              variant='outlined'
              label='City'
              name='city'
              value={ jobData.city }
              className='people-job-select'
              onChange={ handleChange }
            />
          </div>
          <div className='pt-10'>
            <TextField
              margin='dense'
              variant='outlined'
              label='State'
              name='state'
              value={ jobData.state }
              className='people-job-select mr-10-per'
              onChange={ handleChange }
            />
            <TextField
              margin='dense'
              variant='outlined'
              label='Country'
              name='country'
              value={ jobData.country }
              className='people-job-select'
              onChange={ handleChange }
            />
          </div>
        </form>
      </DialogContent>
      <DialogActions>
        <Button onClick={ handleCancelButton } color='primary' className='primary-button'>
          Cancel
        </Button>
        <Button onClick={ handleSubmit } color='primary' className='primary-button'>
          {isEdit ? 'Update' : 'Submit'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

JobModal.defaultProps = {
  isEdit: false,
  jobId: '',
}

JobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isEdit: PropTypes.bool,
  jobId: PropTypes.number,
}

export default JobModal
