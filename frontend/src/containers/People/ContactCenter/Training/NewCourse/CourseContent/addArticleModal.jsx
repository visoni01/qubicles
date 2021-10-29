/* eslint-disable jsx-a11y/media-has-caption */
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, Grid, TextField, Select,
} from '@material-ui/core'
import { useDispatch, useSelector } from 'react-redux'
import _ from 'lodash'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { checkDisabledUnitSaveButton } from './helper'
import { unitPropType } from '../propTypes'
import { DeleteIcon, UploadIcon } from '../../../../../../assets/images/training'
import MediaPlayer from '../../ViewCourse/mediaPlayer'
import { trainingCourseRequestStart, resetTrainingCourseReducerFlags } from '../../../../../../redux-saga/redux/people'
import { acceptedAudioFormats, acceptedVideoFormats, maxVideoFileSize } from '../../../constants'
import { showErrorMessage } from '../../../../../../redux-saga/redux/utils'
import MyUploadAdapter from '../../../../../../utils/uploadImage'
import Loader from '../../../../../loaders/circularLoader'
import { REQUEST_TYPES } from '../../../../../../utils/constants'

// eslint-disable-next-line complexity
const AddArticleModal = ({
  open, onClose, onSubmit, unit, setUnitDetails, savedUnit, title,
}) => {
  const [ isImageUploading, setIsImageUploading ] = useState(false)
  const [ currentFileUrl, setCurrentFileUrl ] = useState('')
  const [ currentFileName, setCurrentFileName ] = useState('')

  const { currentFileUrl: uploadedFileUrl, dataType } = useSelector((state) => state.trainingCourse)

  const dispatch = useDispatch()

  useEffect(() => {
    if (uploadedFileUrl && [ 'Audio', 'Video' ].includes(dataType)) {
      setUnitDetails((current) => ({
        ...current,
        details: uploadedFileUrl,
      }))
      setCurrentFileUrl(uploadedFileUrl)
    }
  }, [ dataType, setUnitDetails, uploadedFileUrl ])

  const handleUnitTypeChange = useCallback((selectedType) => {
    setUnitDetails((current) => ({
      ...current,
      type: selectedType,
      details: '',
    }))
    setCurrentFileUrl('')
    setCurrentFileName('')
    dispatch(resetTrainingCourseReducerFlags())
  }, [ setUnitDetails, dispatch ])

  const handleChangeArticleText = useCallback((selectedValue) => {
    setUnitDetails((current) => ({
      ...current,
      details: selectedValue,
    }))
  }, [ setUnitDetails ])

  const handleChangeTitle = useCallback((e) => {
    e.persist()
    setUnitDetails((current) => ({
      ...current,
      title: e.target.value,
    }))
  }, [ setUnitDetails ])

  const uploadMediaFile = useCallback((videoUrl) => {
    dispatch(trainingCourseRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: unit.type,
      fileUrl: videoUrl,
    }))
  }, [ dispatch, unit.type ])

  const handleFileInputChange = useCallback((event) => {
    event.preventDefault()
    const file = event.target.files && event.target.files[ 0 ]
    const reader = new FileReader()

    if (file) {
      if (file.size > maxVideoFileSize) {
        dispatch(showErrorMessage({ msg: 'File size should not be greater than 100 MB!' }))
        return
      }

      const videoUrl = URL.createObjectURL(file)

      reader.onloadend = () => {
        setCurrentFileUrl(videoUrl)
        setCurrentFileName(file.name)
        uploadMediaFile(videoUrl)
      }

      if (event.target.files[ 0 ]) {
        reader.readAsDataURL(file)
      }

      // eslint-disable-next-line no-param-reassign
      event.target.value = ''
    }
  }, [ uploadMediaFile, dispatch ])

  const handleDelete = useCallback(() => {
    setCurrentFileUrl('')
    setCurrentFileName('')
    dispatch(resetTrainingCourseReducerFlags())
    setUnitDetails((current) => ({
      ...current,
      details: '',
    }))
  }, [ dispatch, setUnitDetails ])

  const handleSave = useCallback(() => {
    setCurrentFileUrl('')
    setCurrentFileName('')
    dispatch(resetTrainingCourseReducerFlags())
    onSubmit()
  }, [ onSubmit, dispatch ])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      className='custom-modal'
      fullWidth
      maxWidth='md'
    >
      <div className='header'>
        <DialogTitle>
          <div className='h2'>{title}</div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ onClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        <div className='mb-10 is-fullwidth'>
          <Grid container justify='space-between' alignItems='center' spacing={ 3 }>
            <Grid item xs={ 8 } sm={ 8 } md={ 8 } lg={ 8 } xl={ 8 }>
              <p className='para bold'> Title for this unit </p>
              <TextField
                className='is-fullwidth'
                value={ unit.title }
                onChange={ handleChangeTitle }
                margin='dense'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={ 4 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
              <p className='para bold'> Choose what type of unit this is </p>
              <Select
                margin='dense'
                variant='outlined'
                native
                className='mt-7 is-fullwidth'
                onChange={ (e) => handleUnitTypeChange(e.target.value) }
                value={ unit.type }
              >
                {[ 'Article', 'Video', 'Audio' ].map((questionType) => (
                  <option key={ questionType } value={ questionType } className='para sz-xl'>
                    {questionType}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
        <div>
          {unit.type ? (
            <div>
              {/* Article */}
              {unit.type === 'Article' && (
                <CKEditor
                  editor={ ClassicEditor }
                  data={ unit.details }
                  onChange={ (event, editor) => handleChangeArticleText(editor.getData()) }
                  onInit={ (editor) => {
                    editor.editing.view.change((writer) => {
                      writer.setStyle(
                        'height',
                        '350px',
                        editor.editing.view.document.getRoot(),
                      )
                    })
                    editor.setData(unit.details)
                    // eslint-disable-next-line
                    editor.plugins.get('FileRepository').createUploadAdapter = function (loader) {
                      return new MyUploadAdapter(loader, setIsImageUploading, dispatch)
                    }
                  } }
                />
              )}

              {/* Audio File */}
              {unit.type === 'Audio' && (
                <>
                  {(_.isEqual(dataType, 'Audio') && !_.isEqual(uploadedFileUrl, currentFileUrl))
                  || (_.isEmpty(unit.details) && _.isEmpty(currentFileUrl)) ? (
                    <div className='mt-60 mb-40 is-fullwidth text-center'>
                      <Button
                        classes={ {
                          root: 'button-primary-large',
                          label: 'button-primary-large-label pl-10 pr-10',
                        } }
                        startIcon={ <UploadIcon /> }
                        onClick={ () => document.getElementById('unit-audio').click() }
                      >
                        Upload Audio File
                      </Button>
                    </div>
                    ) : (
                      <div className='mt-60'>
                        <div className='is-flex is-center pl-50 pr-50'>
                          <MediaPlayer source={ currentFileUrl || unit.details } type='audio' />
                        </div>
                        <div className='is-flex is-center mt-20 custom-svg-icon color-red'>
                          <p className='para pt-10'>{currentFileName || 'Delete this file'}</p>
                          <IconButton className='align-items-center pt-10 ml-5' onClick={ handleDelete }>
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    )}
                </>
              )}

              {/* Video File */}
              {unit.type === 'Video' && (
                <>
                  {(_.isEqual(dataType, 'Video') && !_.isEqual(uploadedFileUrl, currentFileUrl))
                  || (_.isEmpty(unit.details) && _.isEmpty(currentFileUrl)) ? (
                    <div className='mt-60 mb-40 is-fullwidth text-center'>
                      <Button
                        classes={ {
                          root: 'button-primary-large',
                          label: 'button-primary-large-label pl-10 pr-10',
                        } }
                        startIcon={ <UploadIcon /> }
                        onClick={ () => document.getElementById('unit-video').click() }
                      >
                        Upload Video File
                      </Button>
                    </div>
                    ) : (
                      <div className='mt-30'>
                        <div className='video-container'>
                          <MediaPlayer source={ currentFileUrl || unit.details } type='video' />
                        </div>
                        <div className='is-flex is-center mt-20'>
                          <p className='para pt-10'>{currentFileName || 'Delete this file'}</p>
                          <IconButton
                            className='align-items-center pt-10 ml-5 custom-svg-icon color-red'
                            onClick={ handleDelete }
                          >
                            <DeleteIcon />
                          </IconButton>
                        </div>
                      </div>
                    )}
                </>
              )}
            </div>
          ) : (
            <h3 className='mt-30 mb-10 text-center is-fullwidth h3'> Please select content type </h3>
          )}
          <input
            type='file'
            id='unit-video'
            className='position-absolute'
            accept={ acceptedVideoFormats.join(',') }
            onChange={ handleFileInputChange }
            style={ { display: 'none' } }
          />
          <input
            type='file'
            id='unit-audio'
            className='position-absolute'
            accept={ acceptedAudioFormats.join(',') }
            onChange={ handleFileInputChange }
            style={ { display: 'none' } }
          />
          {isImageUploading && (
            <Loader
              displayLoaderManually={ isImageUploading }
              size={ 50 }
            />
          )}
        </div>
      </DialogContent>
      <DialogActions className='modal-actions'>
        <Button
          color='secondary'
          className='cancel-button'
          onClick={ onClose }
        >
          Cancel
        </Button>
        <Button
          className='button-primary-small'
          classes={ { label: 'primary-label' } }
          onClick={ handleSave }
          disabled={ checkDisabledUnitSaveButton({ savedUnit, updatedUnit: unit }) }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

AddArticleModal.propTypes = {
  title: PropTypes.string.isRequired,
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  unit: unitPropType.isRequired,
  savedUnit: unitPropType.isRequired,
  setUnitDetails: PropTypes.func.isRequired,
}

export default AddArticleModal
