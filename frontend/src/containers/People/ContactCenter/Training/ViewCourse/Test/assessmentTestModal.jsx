import React, { useState } from 'react'
import PropTypes from 'prop-types'
import {
  Dialog, DialogTitle, DialogActions, IconButton, DialogContent, Button, LinearProgress,
} from '@material-ui/core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTimes } from '@fortawesome/free-solid-svg-icons'
import testDetails from './mockTestData'
import TestQuestion from './testQuestion'

const AssessmentTestModal = ({
  open, onClose,
}) => {
  const [ isTestStarted, setIsTestStarted ] = useState(false)
  const [ currentSection, setCurrentSection ] = useState(0)
  const [ answers, setAnswers ] = useState([])

  return (
    <Dialog
      disableScrollLock
      open={ open }
      className='custom-modal'
      fullWidth
      maxWidth={ !isTestStarted ? 'xs' : 'sm' }
    >
      <div className='header'>
        <DialogTitle>
          <h2 className='h2'>Assessment Test</h2>
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
        {!isTestStarted ? (
          <p className='para sz-lg'>
            By accomplishing this assessment test you can skip the content and finish the course immediately.
          </p>
        ) : (
          <>
            <div className='mb-20'>
              <div>
                <span className='para bold sz-lg'>
                  {`Section ${ currentSection + 1 } of ${ testDetails.length }: `}
                </span>
                <span className='para sz-lg'>{`${ testDetails[ currentSection ].title }`}</span>
              </div>
              <div>
                <LinearProgress
                  variant='determinate'
                  value={ `${ (currentSection * 100) / testDetails.length }` }
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
      </DialogContent>
      {!isTestStarted ? (
        <DialogActions className='modal-actions'>
          <Button
            className='button-primary-small'
            classes={ { label: 'primary-label' } }
            onClick={ () => setIsTestStarted(true) }
          >
            Start
          </Button>
        </DialogActions>
      ) : (
        <DialogActions className='modal-actions'>
          <Button
            color='secondary'
            className='cancel-button'
            onClick={ currentSection > 0
              ? () => setCurrentSection((state) => state - 1)
              : onClose }
          >
            Cancel
          </Button>
          <Button
            className='button-primary-small'
            classes={ { label: 'primary-label' } }
            onClick={ currentSection < testDetails.length - 1
              ? () => setCurrentSection((state) => state + 1)
              : () => null }
          >
            Continue
          </Button>
        </DialogActions>
      )}

    </Dialog>
  )
}

AssessmentTestModal.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
}

export default AssessmentTestModal
