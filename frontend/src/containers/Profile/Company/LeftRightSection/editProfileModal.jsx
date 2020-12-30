import React, {
  useCallback, useState, useEffect, useRef,
} from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Button, TextareaAutosize, Grid,
  FormControl, Select, Avatar,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import '../styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import {
  uploadProfileImageStart,
  updateCompanyProfileSettingsApiStart,
  resetUpdateProfileSettingsFlags,
  resetUploadProfileImage,
} from '../../../../redux-saga/redux/actions'
import Loader from '../../../../components/loaders/circularLoader'
import { defaultUser } from '../../../../assets/images/avatar'

const EditProfileModal = ({
  open, handleClose, companyInfo,
}) => {
  const { isUpdateSuccess, isUpdateLoading } = useSelector((state) => state.clientDetails)
  const [ title, setTitle ] = useState(companyInfo.title)
  const [ summary, setSummary ] = useState(companyInfo.summary)
  const [ fileSrc, setFileSrc ] = useState(companyInfo.profilePic)

  const fileInput = useRef()
  const dispatch = useDispatch()

  // updating title
  const handleUpdateTitle = useCallback((e) => {
    const data = e.target.value
    setTitle(data)
  }, [])

  // updating summary
  const handleUpdateSummary = useCallback((e) => {
    const data = e.target.value
    setSummary(data)
  }, [])

  const handleCancel = useCallback(() => {
    setTitle(companyInfo.title)
    setSummary(companyInfo.summary)
    handleClose()
  }, [ companyInfo, handleClose ])

  useEffect(() => {
    setTitle(companyInfo.title)
    setSummary(companyInfo.summary)
    setFileSrc(companyInfo.profilePic)
  }, [ companyInfo ])

  const { uploadSuccess, uploadingImage } = useSelector((state) => state.uploadProfileImage)

  // to preview selected image
  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files[ 0 ]
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onloadend = () => {
      setFileSrc(
        reader.result,
      )
    }
    // eslint-disable-next-line
  }, [])

  const handleChooseFile = () => {
    fileInput.current.click()
  }

  const handleDelete = () => {
    fileInput.current.value = ''
    setFileSrc(null)
  }

  useEffect(() => {
    if (isUpdateSuccess || uploadSuccess) {
      if (isUpdateSuccess) {
        dispatch(resetUpdateProfileSettingsFlags())
      }
      if (uploadSuccess) {
        dispatch(resetUploadProfileImage())
      }
      handleClose()
    }
  }, [ isUpdateSuccess, uploadSuccess, dispatch, handleClose ])

  const onSubmit = useCallback(() => {
    const uploadImage = {
      file: fileInput.current.files && fileInput.current.files[ 0 ],
    }
    if (title !== companyInfo.title || summary !== companyInfo.summary) {
      dispatch(updateCompanyProfileSettingsApiStart({
        updatedDataType: 'Company Info',
        updatedData: {
          title,
          summary,
        },
      }))
    }
    if (fileSrc !== companyInfo.profilePic) {
      dispatch(uploadProfileImageStart(uploadImage))
    }
  }, [ dispatch, title, summary, companyInfo, fileSrc ])

  return (
    <Dialog
      scroll='body'
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      classes={ { paper: 'editProfile-modal' } }
      className='custom-modal'
    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Edit Profile</h2>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ handleClose }
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
            <Avatar className='profile-pic-preview' alt='' src={ fileSrc || defaultUser } />
            {fileSrc && (
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
          Company Title
        </h3>
        <div className='input-box'>
          {!isUpdateLoading && (
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 1 }
            placeholder='Title'
            defaultValue={ title }
            onChange={ handleUpdateTitle }
          />
          )}
        </div>
        <h3 className='h3 mt-20 mb-10'>
          Bio
        </h3>
        <div className='input-box'>
          {!isUpdateLoading && (
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 6 }
            defaultValue={ summary }
            onChange={ handleUpdateSummary }
            placeholder='Add a short description about your company'
          />
          )}
        </div>
        <h3 className='h3  mt-20 mb-10'>
          Primary Contacts
        </h3>
        <Grid container spacing={ 2 } justify='space-between'>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
            <h4 className='h4'> Billing </h4>
            <FormControl variant='outlined' margin='dense' className='drop-down-bar'>
              <Select
                multiple
                margin='dense'
                variant='outlined'
                name='billing'
                value='Terry Garret'
              />
            </FormControl>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
            <h4 className='h4'> Administrative </h4>
            <FormControl variant='outlined' margin='dense' className='drop-down-bar'>
              <Select
                multiple
                margin='dense'
                variant='outlined'
                name='billing'
                value={ [ 'Chad Green' ] }
              />
            </FormControl>
          </Grid>
          <Grid item xl={ 6 } lg={ 6 } sm={ 6 } xs={ 6 }>
            <h4 className='h4'> Technical </h4>
            <FormControl variant='outlined' margin='dense' className='drop-down-bar'>
              <Select
                multiple
                margin='dense'
                variant='outlined'
                name='billing'
                value={ [ 'Janice Fox' ] }
              />
            </FormControl>
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
          disabled={
            !(title !== companyInfo.title
              || summary !== companyInfo.summary
              || fileSrc !== companyInfo.profilePic
            )
          }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,
  companyInfo: PropTypes.shape({
    title: PropTypes.string.isRequired,
    summary: PropTypes.string.isRequired,
    profilePic: PropTypes.string.isRequired,
  }).isRequired,
}

export default EditProfileModal
