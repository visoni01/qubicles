import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Grid, TextField } from '@material-ui/core'
import _ from 'lodash'
import testQuestionPropType from './testQuestionPropType'

const DateTimeTestQuestion = ({
  question, answers, setAnswers,
}) => {
  const [ dateTimeAnswerObject, setDateTimeAnswerObject ] = useState({})

  // const getDateAndTime = useCallback(({ type }) => question.dateTime[ type ], [ question ])

  // const setDateAndTime = useCallback(({ type, val }) => {
  //   setQuestionDetails((current) => ({
  //     ...current,
  //     dateTime: { ...current.dateTime, [ type ]: val },
  //   }))
  // }, [ setQuestionDetails ])

  const handleAnswerChange = useCallback(({ type, val }) => {
    const newAnswer = {
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
  }, [ answers, question.id, question.questionType, setAnswers ])

  useEffect(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer && answer.dateTimeAnswer) {
      setDateTimeAnswerObject(answer.dateTimeAnswer)
    } else {
      setDateTimeAnswerObject([])
    }
  }, [ answers, question.id ])

  return (
    <>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
        {question && question.dateTime && question.dateTime.isDate && (
        <TextField
          className='is-fullwidth'
          margin='dense'
          variant='outlined'
          type='date'
          defaultValue={ dateTimeAnswerObject.date }
          onChange={ (e) => handleAnswerChange({ type: 'date', val: e.target.value }) }
        />
        )}
      </Grid>
      <Grid item xl={ 3 } lg={ 3 } md={ 3 } sm={ 3 } xs={ 3 }>
        {question && question.dateTime && question.dateTime.isTime && (
        <TextField
          className='is-fullwidth'
          margin='dense'
          variant='outlined'
          type='time'
          defaultValue={ dateTimeAnswerObject.time }
          onChange={ (e) => handleAnswerChange({ type: 'time', val: e.target.value }) }
        />
        )}
      </Grid>
    </>
  )
}

DateTimeTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
}

export default DateTimeTestQuestion
