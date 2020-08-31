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
import { addJob, getJobFields } from '../../../redux-saga/redux/people/actions'
import People from '../../../redux-saga/service/people'

const JobModal = ({
  open, handleClose, onSubmit, modalFields,
}) => {
  const dispatch = useDispatch()
  const { jobFields } = useSelector((state) => state.jobCategories)
  const [ jobData, setJobData ] = useState(modalFields)

  useEffect(() => {
    dispatch(getJobFields())
  }, [ dispatch ])

  const handleChange = useCallback((event) => {
    event.persist()
    // eslint-disable-next-line
    setJobData((jobData) => ({ ...jobData, [event.target.name]: event.target.value }))
  }, [ setJobData ])

  const handleCancelButton = () => {
    handleClose()
    setJobData(modalFields)
  }

  const handleSubmit = () => {
    dispatch(addJob(jobData))
    handleCancelButton()
  }

  return (
    <Dialog open={ open } onClose={ handleClose } classes={ { paper: 'group-modal' } }>
      <DialogTitle className='text-align-center'>New Job</DialogTitle>
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
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  )
}

JobModal.defaultProps = {
  modalFields: {
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
  },
}

JobModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  modalFields: PropTypes.shape({
    title: PropTypes.string,
    description: PropTypes.string,
    categoryId: PropTypes.number,
    positionId: PropTypes.number,
    jobType: PropTypes.string,
    employmentType: PropTypes.string,
    durationType: PropTypes.string,
    experienceType: PropTypes.string,
    locationType: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    country: PropTypes.string,
  }),
}

export default JobModal
