import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, Grid, TextField, Select,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TestQuestionModal = ({
  open, onSubmit, onClose, unit,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    className='custom-modal'
    fullWidth
    maxWidth='md'
  >
    <div className='header'>
      <DialogTitle>
        <h2 className='h2'>Questions</h2>
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
      <div className='list-sections border-1'>
        <div className='list-item'>
          <Grid container justify='space-between' spacing={ 3 }>
            <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
              <p className='para bold'>Your Question</p>
              <TextField
                className='is-fullwidth'
                margin='dense'
                variant='outlined'
                placeholder='Write your question here'
                multiline
              />
            </Grid>
            <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 12 }>
              <p className='para bold'>Question Type</p>
              <Select
                margin='dense'
                variant='outlined'
                native
                className='mt-7 is-fullwidth'
                placeholder='Please select question type'
              >
                {[
                  'Multiple Choice', 'Check Boxes', 'Paragraph', 'TextField', 'Scale',
                ].map((questionType) => (
                  <option key={ questionType } value={ questionType } className='para sz-xl'>
                    {questionType}
                  </option>
                ))}
              </Select>
            </Grid>
          </Grid>
        </div>
      </div>
      <div className='mt-10 mb-10'>
        <Button
          className='wide-button'
          classes={ {
            root: 'button-secondary-small',
            label: 'button-secondary-small-label',
          } }
        >
          Add Question
        </Button>
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
      >
        Save
      </Button>
    </DialogActions>
  </Dialog>
)

TestQuestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  unit: PropTypes.shape({
    unitId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unitNum: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,
    length: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  }).isRequired,
}

export default TestQuestionModal
