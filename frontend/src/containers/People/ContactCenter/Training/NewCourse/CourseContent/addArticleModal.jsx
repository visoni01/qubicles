import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, Grid, TextField, Select,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes, faUpload } from '@fortawesome/free-solid-svg-icons'
import CKEditor from '@ckeditor/ckeditor5-react'
import ClassicEditor from '@ckeditor/ckeditor5-build-classic'
import { checkDisabledUnitSaveButton } from './helper'
import { unitPropType } from '../propTypes'

const AddArticleModal = ({
  open, onClose, onSubmit, unit, setUnitDetails, savedUnit, title,
}) => {
  const handleUnitTypeChange = useCallback((selectedType) => {
    setUnitDetails((current) => ({
      ...current,
      type: selectedType,
      details: '',
    }))
  }, [ setUnitDetails ])

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
          <h2 className='h2'>{title}</h2>
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
              <p className='para bold'>Title for this unit</p>
              <TextField
                className='is-fullwidth'
                value={ unit.title }
                onChange={ handleChangeTitle }
                margin='dense'
                variant='outlined'
              />
            </Grid>
            <Grid item xs={ 4 } sm={ 4 } md={ 4 } lg={ 4 } xl={ 4 }>
              <p className='para bold'>Choose what type of unit this is</p>
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
          { unit.type ? (
            <div>
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
                } }
              />
              )}
              {unit.type === 'Audio' && (
                <div className='mt-60 mb-40 is-fullwidth text-center'>
                  <Button
                    classes={ {
                      root: 'button-primary-large',
                      label: 'button-primary-large-label pl-10 pr-10',
                    } }
                    startIcon={ <FontAwesomeIcon icon={ faUpload } /> }
                  >
                    Upload Audio File
                  </Button>
                </div>
              )}
              {unit.type === 'Video' && (
                <div className='mt-60 mb-40 is-fullwidth text-center'>
                  <Button
                    classes={ {
                      root: 'button-primary-large',
                      label: 'button-primary-large-label pl-10 pr-10',
                    } }
                    startIcon={ <FontAwesomeIcon icon={ faUpload } /> }
                  >
                    Upload Video File
                  </Button>
                </div>
              )}
            </div>
          ) : (
            <h3 className='mt-30 mb-10 text-center is-fullwidth h3'>Please select content type</h3>
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
          onClick={ onSubmit }
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
