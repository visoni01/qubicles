/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, LinearProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import { useDispatch } from 'react-redux'
import RenderTestQuestion from './renderTestQuestion'
import './styles.scss'
import TestCompleted from './testCompleted'
import { viewCourseRequestStart } from '../../../../../../redux-saga/redux/people'
import AssessmentTestSkeleton from '../../Skeletons/assessmentTestSkeleton'
import { assessmentTestPropType } from './propTypes'

const AssessmentTestModal = ({
  open, onClose, courseId, assessmentTest, isLoading,
}) => {
  const [ isTestStarted, setIsTestStarted ] = useState(false)
  const [ isTestCompleted, setIsTestCompleted ] = useState(false)
  const [ currentSection, setCurrentSection ] = useState(0)
  const [ answers, setAnswers ] = useState([])
  const dispatch = useDispatch()

  const getTotalQuestions = useCallback(() => (
    assessmentTest.reduce((total, section) => total + section.questions.length, 0)
  ), [ assessmentTest ])

  const handleStartTest = useCallback(() => {
    dispatch(viewCourseRequestStart({
      requestType: 'FETCH',
      dataType: 'Assessment Test',
      courseId,
    }))
    setIsTestStarted(true)
  }, [ dispatch, courseId ])

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
          <div className={ `h2 mr-30 ${ !isTestStarted && 'ml-30' }` }>Assessment Test</div>
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
        {!isTestStarted && (
          <p className='para sz-xl text-center mr-10 ml-10 mb-10'>
            By accomplishing this assessment test you can skip the content and finish the course immediately.
          </p>
        )}
        {!isLoading && isTestStarted && !isTestCompleted && assessmentTest && assessmentTest.length && (
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
                />
              ))}
            </div>
          </>
        )}
        {(isTestStarted && isLoading) && (
          <AssessmentTestSkeleton />
        )}
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
                : onClose }
            >
              { currentSection > 0 ? 'Back' : 'Cancel' }
            </Button>
            <Button
              className='button-primary-small'
              classes={ { label: 'primary-label' } }
              onClick={ currentSection < assessmentTest.length - 1
                ? () => setCurrentSection((state) => state + 1)
                : () => setIsTestCompleted(true) }
              disabled={ isLoading }
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
}

export default AssessmentTestModal
