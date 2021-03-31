import React from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, Grid,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'

const TestQuestionModal = ({
  open, onSubmit, onClose,
}) => (
  <Dialog
    disableScrollLock
    open={ open }
    className='custom-modal'
    fullWidth
    maxWidth='sm'
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
          <Grid container justify='space-between'>
            <Grid item>
              <span className='para'>
                <b> Section 1 </b>
              </span>
            </Grid>
            <Grid item>
              <span className='para'>1 Unit</span>
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
}

export default TestQuestionModal
