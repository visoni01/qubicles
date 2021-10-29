import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import TestQuestion from './testQuestion'
import { addQuestionToTest, checkDisabledSaveTestButton, checkDisabledAddQuestionButton } from '../helper'
import { testPropType } from '../../propTypes'

const TestQuestionModal = ({
  open, onSubmit, onClose, testDetails, setTestDetails,
}) => {
  const handleAddQuestionButton = useCallback(() => {
    const updatedTest = addQuestionToTest({ test: testDetails })
    setTestDetails(updatedTest)
  }, [ setTestDetails, testDetails ])

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
          <div className='h2'> Questions </div>
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
        {testDetails.questions.map((question) => (
          <TestQuestion
            key={ question.id }
            question={ question }
            setTestDetails={ setTestDetails }
            testDetails={ testDetails }
          />
        ))}
        <div className='mt-10 mb-10'>
          <Button
            className='wide-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            onClick={ handleAddQuestionButton }
            disabled={ checkDisabledAddQuestionButton({ unit: testDetails }) }
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
          disabled={ checkDisabledSaveTestButton({ unit: testDetails }) }
        >
          Save
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TestQuestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  testDetails: testPropType.isRequired,
  setTestDetails: PropTypes.func.isRequired,

}

export default TestQuestionModal
