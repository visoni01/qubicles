import React, { useCallback, useEffect, useState } from 'react'
import {
  Avatar, Button, Card, CardContent,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './styles.scss'

const AnswerValidationCard = ({
  candidatePic, candidateName, questionId, questionText, candidateAnswer, correctAnswer,
  validatedData, setValidatedData, isLoading,
}) => {
  const [ showReferenceAnswer, setShowReferenceAnswer ] = useState(false)
  const [ isCorrect, setIsCorrect ] = useState(null)

  const validateAnswer = useCallback((correct) => {
    const answerIndex = _.findIndex(validatedData, { questionId })
    if (answerIndex === -1) {
      setValidatedData((state) => [
        ...state,
        { questionId, correct },
      ])
    } else {
      setValidatedData((state) => [
        ...state.slice(0, answerIndex),
        { questionId, correct },
        ...state.slice(answerIndex + 1),
      ])
    }
    setIsCorrect(correct)
  }, [ questionId, setValidatedData, validatedData ])

  useEffect(() => {
    const validatedAnswerIndex = _.findIndex(validatedData, { questionId })
    if (!_.isEqual(validatedAnswerIndex, -1)) {
      setIsCorrect(validatedData[ validatedAnswerIndex ].correct)
    }
  }, [ questionId, validatedData ])

  return (
    <Card
      variant='outlined'
      classes={ {
        root: `answer-validation-card-root ${ (isCorrect && 'correct-answer')
          || (isCorrect === false && 'incorrect-answer') || (isCorrect === null && '') }`,
      } }
    >
      <CardContent classes={ { root: 'card-content-root' } }>
        <div className='h4'>
          {questionText}
        </div>
        <div className='display-inline-flex align-items-start is-fullwidth mt-10 mb-20'>
          <Avatar className='user-pic' alt={ candidateName } src={ candidatePic } />
          <p className='para answer-text'>
            {candidateAnswer}
          </p>
        </div>
        {showReferenceAnswer && (
        <div className='mb-20'>
          <p className='para reference-answer-text'>
            {correctAnswer}
          </p>
        </div>
        )}
        <div className='display-inline-flex is-fullwidth justify-end'>
          <Button
            className='validation-button'
            classes={ {
              root: 'button-primary-small',
              label: 'button-primary-small-label',
            } }
            disabled={ isLoading }
            onClick={ () => setShowReferenceAnswer((state) => !state) }
          >
            {`${ showReferenceAnswer ? 'Hide' : 'Show' } Reference Answer`}
          </Button>
          <Button
            className='validation-button'
            classes={ {
              root: 'incorrect-button',
              label: 'button-primary-small-label',
            } }
            onClick={ () => validateAnswer(false) }
            disabled={ isCorrect === false || isLoading }
          >
            Incorrect
          </Button>
          <Button
            className='validation-button'
            classes={ {
              root: 'correct-button',
              label: 'button-primary-small-label',
            } }
            onClick={ () => validateAnswer(true) }
            disabled={ isCorrect || isLoading }
          >
            Correct
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

AnswerValidationCard.propTypes = {
  candidateName: PropTypes.string.isRequired,
  candidatePic: PropTypes.string.isRequired,
  setValidatedData: PropTypes.func.isRequired,
  questionId: PropTypes.number.isRequired,
  candidateAnswer: PropTypes.string.isRequired,
  questionText: PropTypes.string.isRequired,
  correctAnswer: PropTypes.string.isRequired,
  validatedData: PropTypes.arrayOf(PropTypes.shape({
    questionId: PropTypes.number,
    correct: PropTypes.bool,
  })).isRequired,
  isLoading: PropTypes.bool.isRequired,
}

export default AnswerValidationCard
