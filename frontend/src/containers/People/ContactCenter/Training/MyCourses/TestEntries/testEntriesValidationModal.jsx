import {
  Avatar,
  Button,
  CircularProgress,
  Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
} from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import AnswerValidationCard from './answerValidationCard'
import { testEntriesRequestStart } from '../../../../../../redux-saga/redux/people'

const TestEntriesValidation = ({
  open, setOpen, candidateName, candidatePic, candidateId, sectionId, testEntryAnswers, courseId,
  isLoading, dataType,
}) => {
  const dispatch = useDispatch()
  const [ validatedData, setValidatedData ] = useState([])

  const handleClose = useCallback(() => {
    setValidatedData([])
    setOpen(false)
  }, [ setOpen ])

  const handleDone = useCallback(() => {
    dispatch(testEntriesRequestStart({
      requestType: 'UPDATE',
      dataType: 'Validate Answers',
      courseId,
      sectionId,
      candidateId,
      validatedData,
    }))
  }, [ dispatch, courseId, sectionId, candidateId, validatedData ])

  useEffect(() => {
    if (!testEntryAnswers && open) {
      dispatch(testEntriesRequestStart({
        requestType: 'FETCH',
        dataType: 'Test Entry Answers',
        candidateId,
        sectionId,
        courseId,
      }))
    }
  }, [ dispatch, testEntryAnswers, candidateId, sectionId, courseId, open ])

  useEffect(() => {
    if (_.isEqual(dataType, 'Validate Answers') && !isLoading) {
      setValidatedData([])
    }
  }, [ dataType, isLoading ])

  return (
    <Dialog
      open={ open }
      onClose={ handleClose }
      fullWidth
      maxWidth='sm'
      className='custom-modal validation-modal-root'
    >
      <div className='header'>
        <DialogTitle>
          <div className='h2 mr-30'>
            Validation
            {isLoading && <CircularProgress size={ 25 } />}
          </div>
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
        <div className='display-inline-flex align-items-center is-fullwidth mt-10 mb-20'>
          <Avatar className='user-pic' alt={ candidateName } src={ candidatePic } />
          <p className='h3 user-name'>{candidateName}</p>
        </div>
        <Grid container spacing={ 3 }>
          {testEntryAnswers && testEntryAnswers.length > 0 && testEntryAnswers.map((testEntryAnswer) => (
            <Grid item xs={ 12 } key={ testEntryAnswer.questionId }>
              <AnswerValidationCard
                candidatePic={ candidatePic }
                candidateName={ candidateName }
                validatedData={ validatedData }
                setValidatedData={ setValidatedData }
                { ...testEntryAnswer }
              />
            </Grid>
          ))}
        </Grid>
      </DialogContent>
      <DialogActions className='modal-actions validation-modal-actions'>
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
          disabled={ _.isEmpty(validatedData) || isLoading }
          onClick={ handleDone }
        >
          Done
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TestEntriesValidation.defaultProps = {
  testEntryAnswers: undefined,
}

TestEntriesValidation.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
  sectionId: PropTypes.number.isRequired,
  courseId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dataType: PropTypes.string.isRequired,
  testEntryAnswers: PropTypes.arrayOf(PropTypes.shape({
    questionId: PropTypes.number,
    candidateAnswer: PropTypes.string,
    questionText: PropTypes.string,
    questionType: PropTypes.string,
    correctAnswer: PropTypes.string,
  })),
}

export default TestEntriesValidation
