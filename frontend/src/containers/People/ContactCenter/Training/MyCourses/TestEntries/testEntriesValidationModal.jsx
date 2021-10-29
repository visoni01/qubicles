/* eslint-disable complexity */
import {
  Avatar, Button, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton,
} from '@material-ui/core'
import React, { useCallback, useEffect, useState } from 'react'
import _ from 'lodash'
import { useDispatch } from 'react-redux'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import AnswerValidationCard from './answerValidationCard'
import { testEntriesRequestStart } from '../../../../../../redux-saga/redux/people'
import TestEntriesValidationSkeleton from
  '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/testEntriesValidationSkeleton'
import { REQUEST_TYPES } from '../../../../../../utils/constants'
import { TEST_ENTRY_ANSWERS, VALIDATE_ANSWERS } from '../../../../../../redux-saga/redux/constants'

const TestEntriesValidation = ({
  open, setOpen, candidateName, candidatePic, candidateId, sections, courseId, testType,
  isLoading, dataType,
}) => {
  const dispatch = useDispatch()
  const [ validatedData, setValidatedData ] = useState([])
  const [ currentSectionIndex, setCurrentSectionIndex ] = useState(0)

  const handleClose = useCallback(() => {
    setValidatedData([])
    setCurrentSectionIndex(0)
    setOpen(false)
  }, [ setOpen ])

  const handleDone = useCallback(() => {
    dispatch(testEntriesRequestStart({
      requestType: REQUEST_TYPES.UPDATE,
      dataType: VALIDATE_ANSWERS,
      courseId,
      candidateId,
      validatedData,
      testType,
    }))
  }, [ dispatch, courseId, candidateId, validatedData, testType ])

  useEffect(() => {
    if (!sections && open) {
      dispatch(testEntriesRequestStart({
        requestType: REQUEST_TYPES.FETCH,
        dataType: TEST_ENTRY_ANSWERS,
        candidateId,
        courseId,
        testType,
      }))
    }
  }, [ dispatch, sections, candidateId, courseId, open, testType ])

  useEffect(() => {
    if (_.isEqual(dataType, VALIDATE_ANSWERS) && !isLoading) {
      setValidatedData([])
      setCurrentSectionIndex(0)
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
            {_.isEqual(dataType, VALIDATE_ANSWERS) && isLoading && (
              <CircularProgress size={ 25 } className='ml-10' />
            )}
          </div>
          <div className='display-inline-flex align-items-center is-fullwidth mt-20'>
            <Avatar className='user-pic' alt={ candidateName } src={ candidatePic } />
            <p className='h3 user-name'>{candidateName}</p>
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
      <DialogContent className='no-padding-top'>
        {sections && sections[ currentSectionIndex ] && (
        <h3 className='h3 mb-20'>
          {`Section ${ sections[ currentSectionIndex ].sectionNum }: ${ sections[ currentSectionIndex ].sectionTitle }`}
        </h3>
        )}
        {_.isEqual(dataType, TEST_ENTRY_ANSWERS) && isLoading && (
          <TestEntriesValidationSkeleton />
        )}
        {(!isLoading || _.isEqual(dataType, VALIDATE_ANSWERS)) && (
          <Grid container spacing={ 3 }>
            {sections && sections.length > 0 && sections[ currentSectionIndex ]
            && sections[ currentSectionIndex ].questions.map((question) => (
              <Grid item xs={ 12 } key={ question.questionId }>
                <AnswerValidationCard
                  candidatePic={ candidatePic }
                  candidateName={ candidateName }
                  validatedData={ validatedData }
                  setValidatedData={ setValidatedData }
                  { ...question }
                  isLoading={ isLoading }
                />
              </Grid>
            ))}
          </Grid>
        )}
      </DialogContent>
      <DialogActions className='modal-actions validation-modal-actions'>
        <Button
          classes={ {
            root: 'button-secondary-small-red',
            label: 'button-secondary-small-label',
          } }
          onClick={ sections && _.isEqual(currentSectionIndex, 0)
            ? handleClose
            : () => setCurrentSectionIndex((state) => state - 1) }
          disabled={ isLoading }
        >
          {sections && _.isEqual(currentSectionIndex, 0) ? 'Cancel' : 'Back'}
        </Button>
        <Button
          classes={ {
            root: 'button-primary-small',
            label: 'button-primary-small-label',
          } }
          disabled={ isLoading || !sections
             || (_.isEqual(currentSectionIndex, sections.length - 1) && _.isEmpty(validatedData)) }
          onClick={ sections && _.isEqual(currentSectionIndex, sections.length - 1)
            ? handleDone
            : () => setCurrentSectionIndex((state) => state + 1) }
        >
          {sections && _.isEqual(currentSectionIndex, sections.length - 1) ? 'Done' : 'Next'}
        </Button>
      </DialogActions>
    </Dialog>
  )
}

TestEntriesValidation.defaultProps = {
  sections: null,
}

TestEntriesValidation.propTypes = {
  open: PropTypes.bool.isRequired,
  setOpen: PropTypes.func.isRequired,
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
  candidateId: PropTypes.number.isRequired,
  testType: PropTypes.string.isRequired,
  courseId: PropTypes.number.isRequired,
  isLoading: PropTypes.bool.isRequired,
  dataType: PropTypes.string.isRequired,
  sections: PropTypes.arrayOf(PropTypes.shape({
    sectionId: PropTypes.number,
    sectionNum: PropTypes.number,
    sectionTitle: PropTypes.string,
    questions: PropTypes.arrayOf(PropTypes.shape({
      questionId: PropTypes.number,
      candidateAnswer: PropTypes.string,
      questionText: PropTypes.string,
      questionType: PropTypes.string,
      correctAnswer: PropTypes.string,
    })),
  })),
}

export default TestEntriesValidation
