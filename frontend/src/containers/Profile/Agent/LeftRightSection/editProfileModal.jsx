import React, {
  useCallback, useState, useEffect, useRef,
} from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Button, Grid,
  Select, Avatar, Switch, Box, TextField, FormControlLabel, Radio, RadioGroup,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux'
import _ from 'lodash'
import {
  uploadProfileImageStart,
  resetAgentProfileSettingsFlags,
  resetUploadProfileImage,
  agentProfileSettingsApiStart,
} from '../../../../redux-saga/redux/actions'
import Loader from '../../../../components/loaders/circularLoader'
import { defaultUser } from '../../../../assets/images/avatar'

const EditProfileModal = ({
  open, handleClose, agentInfo,
}) => {
  const [ profileInfo, setProfileInfo ] = useState(agentInfo)
  const { success, isLoading, requestType } = useSelector((state) => state.agentDetails)
  const { uploadSuccess, uploadingImage } = useSelector((state) => state.uploadProfileImage)
  const fileInput = useRef()
  const dispatch = useDispatch()

  // updating title
  const handleUpdateTitle = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      title: data,
    }))
  }, [])

  // updating summary
  const handleUpdateSummary = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      summary: data,
    }))
  }, [])

  // updating highestEducation
  const handleHighestEducation = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      highestEducation: data,
    }))
  }, [])

  // updating yearsOfExperience
  const handleWorkExperience = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      yearsOfExperience: data,
    }))
  }, [])

  // updating hourlyRate
  const handleHourlyRate = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      hourlyRate: data,
    }))
  }, [])

  // updating preferredJob
  const handlePreferredJob = useCallback((e) => {
    const data = e.target.value
    setProfileInfo((state) => ({
      ...state,
      preferredJob: data,
    }))
  }, [])

  // updating remoteJobs
  const handleRemoteJobs = useCallback((e) => {
    const data = e.target.checked
    setProfileInfo((state) => ({
      ...state,
      remoteJobs: data,
    }))
  }, [])

  // updating onVacation
  const handleOnVacation = useCallback((e) => {
    const data = e.target.checked
    setProfileInfo((state) => ({
      ...state,
      onVacation: data,
    }))
  }, [])

  // updating profileVisible
  const handleProfileVisible = useCallback((e) => {
    const data = e.target.checked
    setProfileInfo((state) => ({
      ...state,
      profileVisible: data,
    }))
  }, [])

  const handleCancel = useCallback(() => {
    setProfileInfo(agentInfo)
    handleClose()
  }, [ agentInfo, handleClose ])

  useEffect(() => {
    setProfileInfo(agentInfo)
  }, [ agentInfo ])

  // to preview selected image
  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files[ 0 ]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setProfileInfo((state) => ({
        ...state,
        profilePic: reader.result,
      }))
    }
  }, [])

  const handleChooseFile = () => {
    fileInput.current.click()
  }

  const handleDelete = () => {
    fileInput.current.value = ''
    setProfileInfo((state) => ({
      ...state,
      profilePic: null,
    }))
  }

  useEffect(() => {
    if ((success && requestType === 'UPDATE') || uploadSuccess) {
      if (success) {
        dispatch(resetAgentProfileSettingsFlags())
      }
      if (uploadSuccess) {
        dispatch(resetUploadProfileImage())
      }
      handleClose()
    }
  }, [ success, uploadSuccess, requestType, dispatch, handleClose ])

  const onSubmit = useCallback(() => {
    const uploadImage = {
      file: fileInput.current.files && fileInput.current.files[ 0 ],
    }
    if (!_.isEqual(profileInfo, agentInfo)) {
      dispatch(agentProfileSettingsApiStart({
        updatedDataType: 'Agent Info',
        updatedData: {
          title: profileInfo.title,
          summary: profileInfo.summary,
          highestEducation: profileInfo.highestEducation,
          yearsOfExperience: profileInfo.yearsOfExperience,
          hourlyRate: profileInfo.hourlyRate,
          preferredJob: profileInfo.preferredJob,
          remoteJobs: profileInfo.remoteJobs,
          onVacation: profileInfo.onVacation,
          profileVisible: profileInfo.profileVisible,
          profilePic: profileInfo.profilePic,
        },
        requestType: 'UPDATE',
      }))
    }
    if (profileInfo.profilePic !== agentInfo.profilePic) {
      dispatch(uploadProfileImageStart(uploadImage))
    }
  }, [ dispatch, agentInfo, profileInfo ])

  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ handleCancel }
      fullWidth
      maxWidth='md'
      classes={ { paper: 'editProfile-modal' } }
      className='custom-modal'
    >
      <div className='header'>
        <DialogTitle>
          <div className='h2'>Edit Profile</div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleCancel }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <h3 className='h3 mb-10'>
          Profile Picture
        </h3>
        <div className='photo-upload'>
          <div className='preview'>
            <Avatar className='profile-pic-preview' alt='' src={ profileInfo.profilePic || defaultUser } />
            {profileInfo.profilePic && (
              <span className='close-button'>
                <IconButton onClick={ handleDelete }>
                  <FontAwesomeIcon icon={ faTimes } />
                </IconButton>
              </span>
            )}
            <div>
              { uploadingImage && (
              <Loader
                className='add-status-loader'
                displayLoaderManually
                enableOverlay={ false }
                size={ 30 }
              />
              )}
            </div>
          </div>
        </div>
        <div className='choose-image'>
          <Button
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            className='choose-file-button'
            onClick={ handleChooseFile }
          >
            Choose Image
          </Button>
          <input
            type='file'
            className='position-absolute'
            id='photo-input'
            accept='image/*'
            ref={ fileInput }
            onChange={ handleFileInputChange }
          />
        </div>
        <h3 className='h3 mb-10'>
          Job Title
        </h3>
        {!isLoading && (
          <TextField
            className='is-fullwidth'
            autoComplete='off'
            variant='outlined'
            margin='dense'
            placeholder='Title'
            defaultValue={ profileInfo.title }
            onChange={ handleUpdateTitle }
          />
        )}
        <h3 className='h3 mt-20 mb-10'>
          Bio
        </h3>
        {!isLoading && (
          <div className='mb-20'>
            <TextField
              className='is-fullwidth'
              autoComplete='off'
              variant='outlined'
              margin='dense'
              multiline
              rows={ 10 }
              defaultValue={ profileInfo.summary }
              onChange={ handleUpdateSummary }
              placeholder='Add a short description about your company'
            />
          </div>
        )}
        <Grid container spacing={ 2 } justify='space-between'>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
            <h4 className='h4'> Years of experience </h4>
            <TextField
              className='is-fullwidth'
              type='number'
              variant='outlined'
              margin='dense'
              inputProps={ { min: 0 } }
              placeholder='Eg. 3+ years'
              defaultValue={ profileInfo.yearsOfExperience }
              onChange={ handleWorkExperience }
            />
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
            <h4 className='h4 mb-10'> Highest level of education </h4>
            <Select
              className='is-fullwidth'
              native
              margin='dense'
              variant='outlined'
              defaultValue={ profileInfo.highestEducation }
              onChange={ handleHighestEducation }
            >
              {[ 'High school or equivalent',
                'Technical or occupational certificate',
                'Associate degree',
                'Some college coursework completed',
                'Bachelor\'s degree',
                'Master\'s degree',
                'Doctorate',
                'Professional',
              ].map((education) => (
                <option key={ education } value={ education } className='para sz-xl'>
                  {education}
                </option>
              ))}
            </Select>
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } sm={ 12 } xs={ 12 } className='display-inline-flex'>
            <p
              className='para bold margin-auto ml-5'
            >
              Make profile visible for employers when they search for talent.
            </p>
            <Switch
              className='switches'
              color='primary'
              defaultChecked={ profileInfo.profileVisible }
              onChange={ handleProfileVisible }
            />
          </Grid>
          <Grid item xl={ 12 } lg={ 12 } sm={ 12 } xs={ 12 }>
            <Box className='custom-box'>
              <Grid container spacing={ 2 } justify='space-between'>
                <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
                  <h4 className='h4'> Your hourly rate </h4>
                  <div className='display-inline-flex'>
                    <TextField
                      margin='dense'
                      inputProps={ { min: 0 } }
                      placeholder='Eg.10'
                      type='number'
                      variant='outlined'
                      className='hourly-rate-input'
                      defaultValue={ profileInfo.hourlyRate }
                      onChange={ handleHourlyRate }
                    />
                    <p className='para bold ml-10 margin-auto'>$/hr</p>
                  </div>
                </Grid>
                <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
                  <h4 className='h4'> Your preferred type of job</h4>
                  <RadioGroup
                    className='radio-buttons mt-10'
                    defaultValue={ profileInfo.preferredJob }
                    onChange={ handlePreferredJob }
                  >
                    <div className='display-inline-flex'>
                      <FormControlLabel
                        value='employment'
                        control={ <Radio /> }
                        label='Employment'
                      />
                      <FormControlLabel
                        value='freelancer'
                        control={ <Radio /> }
                        label='Freelancer'
                      />
                    </div>
                  </RadioGroup>
                </Grid>
                <Grid
                  item
                  xl={ 6 }
                  lg={ 6 }
                  sm={ 6 }
                  xs={ 6 }
                  className='display-inline-flex mt-10'
                >
                  <p
                    className='para bold margin-auto ml-5'
                  >
                    Looking for remote jobs only
                  </p>
                  <Switch
                    className='switches'
                    color='primary'
                    defaultChecked={ profileInfo.remoteJobs }
                    onChange={ handleRemoteJobs }
                  />
                </Grid>
                <Grid
                  item
                  xl={ 6 }
                  lg={ 6 }
                  sm={ 6 }
                  xs={ 6 }
                  className='display-inline-flex mt-10'
                >
                  <p
                    className='para bold margin-auto ml-5'
                  >
                    On vacation
                  </p>
                  <Switch
                    className='switches'
                    color='primary'
                    defaultChecked={ profileInfo.onVacation }
                    onChange={ handleOnVacation }
                  />
                </Grid>
              </Grid>
            </Box>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ handleCancel }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ onSubmit }
          disabled={ _.isEqual(profileInfo, agentInfo) }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}
EditProfileModal.defaultProps = {
  agentInfo: {
    profilePic: null,
    title: '',
    summary: '',
    highestEducation: '',
    yearsOfExperience: 0,
    hourlyRate: 0,
    preferredJob: null,
    remoteJobs: false,
    onVacation: false,
    profileVisible: true,
  },
}

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  agentInfo: PropTypes.shape({
    title: PropTypes.string,
    summary: PropTypes.string,
    profilePic: PropTypes.string,
    highestEducation: PropTypes.string,
    yearsOfExperience: PropTypes.number,
    hourlyRate: PropTypes.number,
    preferredJob: PropTypes.string,
    remoteJobs: PropTypes.bool,
    onVacation: PropTypes.bool,
    profileVisible: PropTypes.bool,
  }),
}

export default EditProfileModal
