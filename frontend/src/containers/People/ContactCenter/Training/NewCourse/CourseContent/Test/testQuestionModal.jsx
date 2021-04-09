import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import TestQuestion from './testQuestion'
import { addQuestionToTest } from '../helper'

const TestQuestionModal = ({
  open, onSubmit, onClose, unitDetails, setUnitDetails,
}) => {
  const handleAddQuestionButton = useCallback(() => {
    const updatedUnit = addQuestionToTest({ unit: unitDetails })
    setUnitDetails(updatedUnit)
  }, [ setUnitDetails, unitDetails ])

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
        {unitDetails.questions.map((question) => (
          <TestQuestion
            key={ question.id }
            question={ question }
            setUnitDetails={ setUnitDetails }
            unitDetails={ unitDetails }
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
}

TestQuestionModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onClose: PropTypes.func.isRequired,
  unitDetails: PropTypes.shape({
    unitId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unitNum: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,
    length: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  }).isRequired,
  setUnitDetails: PropTypes.func.isRequired,

}

export default TestQuestionModal
