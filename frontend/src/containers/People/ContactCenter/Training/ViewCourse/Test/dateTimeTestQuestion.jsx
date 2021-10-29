import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { TextField } from '@material-ui/core'
import _ from 'lodash'
import { answersPropTypes, testQuestionPropType } from './propTypes'

const DateTimeTestQuestion = ({
  question, answers, setAnswers, additionalAnswerFields,
}) => {
  const [ dateTimeAnswerObject, setDateTimeAnswerObject ] = useState({})

  useEffect(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer && answer.dateTimeAnswer) {
      setDateTimeAnswerObject(answer.dateTimeAnswer)
    } else {
      setDateTimeAnswerObject({})
    }
  }, [ answers, question.id ])

  const handleAnswerChange = useCallback(({ type, val }) => {
    const newAnswer = {
      ...additionalAnswerFields,
      questionId: question.id,
      questionType: question.questionType,
      answer: '',
      dateTimeAnswer: {},
    }
    const answerIndex = _.findIndex(answers, [ 'questionId', question.id ])

    if (answerIndex !== -1 && answers[ answerIndex ].dateTimeAnswer) {
      newAnswer.dateTimeAnswer = {
        ...answers[ answerIndex ].dateTimeAnswer,
        [ type ]: val,
      }
    } else {
      newAnswer.dateTimeAnswer = { [ type ]: val }
    }

    if ((!newAnswer.dateTimeAnswer.date || newAnswer.dateTimeAnswer.date === '')
    && (!newAnswer.dateTimeAnswer.time || newAnswer.dateTimeAnswer.time === '')) {
      setAnswers((state) => state.filter((answer) => answer.questionId !== newAnswer.questionId))
    } else {
      newAnswer.answer = JSON.stringify(newAnswer.dateTimeAnswer)
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
  }, [ answers, question.id, question.questionType, setAnswers, additionalAnswerFields ])

  return (
    <>
      {question && question.dateTime && question.dateTime.isDate && (
        <TextField
          margin='dense'
          variant='outlined'
          type='date'
          className='date-time'
          value={ dateTimeAnswerObject.date ? dateTimeAnswerObject.date : '' }
          onChange={ (e) => handleAnswerChange({ type: 'date', val: e.target.value }) }
        />
      )}
      {question && question.dateTime && question.dateTime.isTime && (
        <TextField
          margin='dense'
          variant='outlined'
          type='time'
          value={ dateTimeAnswerObject.time ? dateTimeAnswerObject.time : '' }
          onChange={ (e) => handleAnswerChange({ type: 'time', val: e.target.value }) }
        />
      )}
    </>
  )
}

DateTimeTestQuestion.defaultProps = {
  additionalAnswerFields: {},
}

DateTimeTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: answersPropTypes.isRequired,
  setAnswers: PropTypes.func.isRequired,
  additionalAnswerFields: PropTypes.shape({}),
}

export default DateTimeTestQuestion
