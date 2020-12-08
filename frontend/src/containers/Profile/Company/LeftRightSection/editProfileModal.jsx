import React, {
  useRef, useCallback, useState,
} from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogActions, DialogContent, DialogTitle,
  IconButton, Button, TextareaAutosize, Grid,
  FormControl, Select,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faPlus } from '@fortawesome/free-solid-svg-icons'
import '../styles.scss'
import { useSelector, useDispatch } from 'react-redux'
import { good } from '../../../../assets/images/avatar'
import { updateCompanyTitleSummaryStart } from '../../../../redux-saga/redux/actions'

const EditProfileModal = ({
  open, handleClose,
}) => {
  const fileInput = useRef()
  const [ fileSrc, setFileSrc ] = useState('')
  const { settings, isLoading } = useSelector((state) => state.companyProfileSettings)
  const [ title, setTitle ] = useState(settings.title)
  const [ summary, setSummary ] = useState(settings.summary)

  const dispatch = useDispatch()

  const handleUpdateTitle = useCallback((e) => {
    const data = e.target.value
    setTitle(data)
  }, [])

  const handleUpdateSummary = useCallback((e) => {
    const data = e.target.value
    setSummary(data)
  }, [])

  const onSubmit = useCallback(() => {
    dispatch(updateCompanyTitleSummaryStart({
      title,
      summary,
    }))
  })

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
            <span className='upload-button'>
              <FontAwesomeIcon icon={ faPlus } />
              {/* <input
                type='file'
                className='position-absolute'
                id='photo-input'
                accept='image/*'
                ref={ fileInput }
              /> */}
            </span>
            <img
              id='upload-preview'
              src={ fileSrc || good }
              data-demo-src='assets/img/avatars/avatar-w.png'
              alt=''
            />
            <form
              id='profile-pic-dz'
              className='dropzone is-hidden'
              action='/'
            />
          </div>
        </div>
        <h3 className='h3 mb-10'>
          Company Title
        </h3>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 1 }
            placeholder='Title'
            defaultValue={ title }
            onChange={ handleUpdateTitle }
          />
        </div>
        <h3 className='h3 mt-20 mb-10'>
          Bio
        </h3>
        <div className='input-box'>
          <TextareaAutosize
            aria-label='minimum height'
            autoComplete='off'
            rowsMin={ 6 }
            defaultValue={ summary }
            onChange={ handleUpdateSummary }
            placeholder='Add a short description about your company'
          />
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
          onClick={ handleClose }
        >
          Cancel
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          onClick={ onSubmit }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

EditProfileModal.defaultProps = {

}

EditProfileModal.propTypes = {
  open: PropTypes.bool.isRequired,
  handleClose: PropTypes.func.isRequired,

}

export default EditProfileModal
