import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { TextField } from '@material-ui/core'
import { testQuestionPropType } from './propTypes'

const TextTestQuestion = ({
  question, answers, setAnswers,
}) => {
  const handleAnswerChange = useCallback((e) => {
    const newAnswer = {
      questionId: question.id,
      questionType: question.questionType,
      answer: e.target.value,
    }

    if (!newAnswer.answer) {
      setAnswers((state) => state.filter((answer) => answer.questionId !== newAnswer.questionId))
    } else {
      const answerIndex = _.findIndex(answers, [ 'questionId', question.id ])
      if (answerIndex === -1) {
        setAnswers((state) => ([
          ...state,
          newAnswer,
        ]))
      } else {
        setAnswers((state) => ([
          ...state.slice(0, answerIndex),
          newAnswer,
          ...state.slice(answerIndex + 1),
        ]))
      }
    }
  }, [ answers, question.id, question.questionType, setAnswers ])

  const getAnswerValue = useCallback(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer) {
      return answer.answer
    }
    return ''
  }, [ answers, question.id ])

  return (
    <TextField
      className={ `${ question.questionType === 'paragraph' ? 'is-fullwidth' : '' }` }
      margin='dense'
      variant='outlined'
      multiline={ question.questionType === 'paragraph' }
      rows={ 6 }
      value={ getAnswerValue() }
      onChange={ handleAnswerChange }
    />
  )
}

TextTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
}

export default TextTestQuestion
