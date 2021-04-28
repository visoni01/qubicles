/* eslint-disable complexity */
import React, { useCallback, useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, LinearProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import testDetails from './mockTestData'
import TestQuestion from './testQuestion'
import './styles.scss'
import TestCompleted from './testCompleted'

const AssessmentTestModal = ({
  open, onClose,
}) => {
  const [ isTestStarted, setIsTestStarted ] = useState(false)
  const [ isTestCompleted, setIsTestCompleted ] = useState(false)
  const [ currentSection, setCurrentSection ] = useState(0)
  const [ answers, setAnswers ] = useState([])

  const getTotalQuestions = useCallback(() => (
    testDetails.reduce((total, section) => total + section.test.questions.length, 0)
  ), [ ])

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
        {isTestStarted && !isTestCompleted && (
          <>
            <div className='mb-20'>
              <div>
                <span className='para bold sz-lg'>
                  {`Section ${ currentSection + 1 } of ${ testDetails.length }: `}
                </span>
                <span className='para sz-lg'>{`${ testDetails[ currentSection ].title }`}</span>
              </div>
              <div className='mt-10'>
                <LinearProgress
                  variant='determinate'
                  value={ `${ (currentSection * 100) / testDetails.length }` }
                  classes={ {
                    root: 'progress-root',
                    barColorPrimary: 'progress-bar-color',
                    colorPrimary: 'progress-color',
                  } }
                />
              </div>
            </div>
            <div>
              {testDetails[ currentSection ].test.questions.map((question) => (
                <TestQuestion
                  key={ question.id }
                  question={ question }
                  answers={ answers }
                  setAnswers={ setAnswers }
                />
              ))}
            </div>
          </>
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
            onClick={ () => setIsTestStarted(true) }
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
              onClick={ currentSection < testDetails.length - 1
                ? () => setCurrentSection((state) => state + 1)
                : () => setIsTestCompleted(true) }
            >
              { currentSection < testDetails.length - 1 ? 'Continue' : 'Submit' }
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

AssessmentTestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AssessmentTestModal
