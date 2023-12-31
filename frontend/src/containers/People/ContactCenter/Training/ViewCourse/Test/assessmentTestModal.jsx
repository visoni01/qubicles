/* eslint-disable complexity */
import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, LinearProgress, CircularProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import _ from 'lodash'
import RenderTestQuestion from
  '../../../../../../components/People/ContactCenter/Training/ViewCourse/Test/renderTestQuestion'
import './styles.scss'
import TestCompleted from '../../../../../../components/People/ContactCenter/Training/ViewCourse/Test/testCompleted'
import { viewCourseRequestStart } from '../../../../../../redux-saga/redux/people'
import AssessmentTestSkeleton from
  '../../../../../../components/People/ContactCenter/SkeletonLoader/Training/assessmentTestSkeleton'
import { assessmentTestPropType } from './propTypes'
import ConfirmationModal from '../../../../../../components/CommonModal/confirmationModal'
import { REQUEST_TYPES } from '../../../../../../utils/constants'
import { ASSESSMENT_TEST } from '../../../../../../redux-saga/redux/constants'

const AssessmentTestModal = ({
  open, onClose, courseId, assessmentTest, isLoading, requestType,
}) => {
  const [ isTestStarted, setIsTestStarted ] = useState(false)
  const [ isTestCompleted, setIsTestCompleted ] = useState(false)
  const [ currentSection, setCurrentSection ] = useState(0)
  const [ answers, setAnswers ] = useState([])
  const [ openSubmitConfirmation, setOpenSubmitConfirmation ] = useState(false)
  const [ openCancelConfirmation, setOpenCancelConfirmation ] = useState(false)

  const dispatch = useDispatch()

  useEffect(() => {
    if (_.isEqual(requestType, REQUEST_TYPES.CREATE) && !isLoading) {
      setIsTestCompleted(true)
    }
  }, [ setIsTestCompleted, isLoading, requestType ])

  const getTotalQuestions = useCallback(() => (
    assessmentTest.reduce((total, section) => total + section.questions.length, 0)
  ), [ assessmentTest ])

  const handleStartTest = useCallback(() => {
    dispatch(viewCourseRequestStart({
      requestType: REQUEST_TYPES.FETCH,
      dataType: ASSESSMENT_TEST,
      courseId,
    }))
    setIsTestStarted(true)
  }, [ dispatch, courseId ])

  const handleSubmitTest = useCallback(() => {
    setOpenSubmitConfirmation(false)
    dispatch(viewCourseRequestStart({
      requestType: REQUEST_TYPES.CREATE,
      dataType: ASSESSMENT_TEST,
      courseId,
      questions: _.flatten(assessmentTest?.map((section) => section?.questions?.map((question) => {
        const questionAttempted = answers.find((answer) => answer.questionId === question.id)

        return {
          id: question.id,
          answer: questionAttempted ? questionAttempted.answer : '',
          questionType: question.questionType,
          sectionId: section.sectionId,
        }
      }))),
    }))
  }, [ dispatch, courseId, answers, assessmentTest ])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      className={ `custom-modal test-modal ${ !isTestStarted && 'auto-height' }` }
      fullWidth
      maxWidth={ !isTestStarted ? 'xs' : 'sm' }
    >
      <div className='header'>
        <DialogTitle>
          <div className='display-inline-flex align-items-center'>
            <div className={ `h2 mr-20 ${ !isTestStarted && 'ml-30' }` }> Assessment Test </div>
            {_.isEqual(requestType, REQUEST_TYPES.CREATE) && isLoading && <CircularProgress size={ 25 } />}
          </div>
        </DialogTitle>
        <DialogActions className='cross-button'>
          <IconButton
            className='is-size-6'
            onClick={ !isLoading && isTestStarted && !isTestCompleted
              ? () => setOpenCancelConfirmation(true) : onClose }
          >
            <FontAwesomeIcon className='custom-fa-icon pointer' icon={ faTimes } />
          </IconButton>
        </DialogActions>
      </div>
      <DialogContent>
        {!isTestStarted && (
          <p className='para sz-xl text-center mr-10 ml-10 mb-10'>
            By accomplishing this assessment test you can skip the content and finish the course immediately.
          </p>
        )}
        {((_.isEqual(requestType, REQUEST_TYPES.FETCH) && !isLoading) || _.isEqual(requestType, REQUEST_TYPES.CREATE))
          && isTestStarted && !isTestCompleted && assessmentTest && assessmentTest.length && (
          <>
            <div className='mb-20'>
              <div>
                <span className='para bold sz-lg'>
                  {`Section ${ currentSection + 1 } of ${ assessmentTest.length }: `}
                </span>
                <span className='para sz-lg'>{`${ assessmentTest[ currentSection ].title }`}</span>
              </div>
              <div className='mt-10'>
                <LinearProgress
                  variant='determinate'
                  value={ (currentSection * 100) / assessmentTest.length }
                  classes={ {
                    root: 'progress-root',
                    barColorPrimary: 'progress-bar-color',
                    colorPrimary: 'progress-color',
                  } }
                />
              </div>
            </div>
            <div>
              {assessmentTest[ currentSection ].questions.map((question) => (
                <RenderTestQuestion
                  key={ question.id }
                  question={ question }
                  answers={ answers }
                  setAnswers={ setAnswers }
                  additionalAnswerFields={ { sectionId: assessmentTest[ currentSection ].sectionId } }
                />
              ))}
            </div>
          </>
        )}
        {isTestStarted && _.isEqual(requestType, REQUEST_TYPES.FETCH) && isLoading && <AssessmentTestSkeleton />}
        {isTestCompleted && (
          <TestCompleted
            totalAnswered={ answers.length }
            totalQuestions={ getTotalQuestions() }
          />
        )}
      </DialogContent>
      <DialogActions className={ `${ !isTestStarted || isTestCompleted ? 'single-action' : 'modal-actions' }` }>
        {!isTestStarted && (
          <Button
            className='button-primary-small'
            classes={ { label: 'primary-label' } }
            onClick={ handleStartTest }
          >
            Start
          </Button>
        )}
        {isTestStarted && !isTestCompleted && (
          <>
            <Button
              color='secondary'
              className='cancel-button'
              onClick={ currentSection > 0
                ? () => setCurrentSection((state) => state - 1)
                : () => setOpenCancelConfirmation(true) }
              disabled={ isLoading }
            >
              { currentSection > 0 ? 'Back' : 'Cancel' }
            </Button>
            <Button
              className='button-primary-small'
              classes={ { label: 'primary-label' } }
              onClick={ currentSection < assessmentTest.length - 1
                ? () => setCurrentSection((state) => state + 1)
                : () => setOpenSubmitConfirmation(true) }
              disabled={ isLoading
                || _.findIndex(answers, { sectionId: assessmentTest[ currentSection ].sectionId }) === -1 }
            >
              { assessmentTest && assessmentTest.length && currentSection < assessmentTest.length - 1
                ? 'Continue'
                : 'Submit' }
            </Button>
          </>
        )}
        {isTestCompleted && (
          <Button
            className='button-primary-small'
            classes={ { label: 'primary-label' } }
            onClick={ onClose }
          >
            Close this window
          </Button>
        )}
      </DialogActions>

      {/* Submit Confirmation */}
      <ConfirmationModal
        open={ openSubmitConfirmation }
        confirmButtonText='Submit'
        message='You can submit the assessment test only once. Do you want to continue?'
        handleClose={ () => setOpenSubmitConfirmation(false) }
        handleConfirm={ handleSubmitTest }
      />

      {/* Exit Confirmation */}
      <ConfirmationModal
        open={ openCancelConfirmation }
        confirmButtonText='Yes'
        message='All answers will be lost. Do you still want to close the test?'
        handleClose={ () => setOpenCancelConfirmation(false) }
        handleConfirm={ onClose }
      />
    </Dialog>
  )
}

AssessmentTestModal.defaultProps = {
  assessmentTest: [],
}

AssessmentTestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  courseId: PropTypes.number.isRequired,
  assessmentTest: assessmentTestPropType,
  isLoading: PropTypes.bool.isRequired,
  requestType: PropTypes.string.isRequired,
}

export default AssessmentTestModal
