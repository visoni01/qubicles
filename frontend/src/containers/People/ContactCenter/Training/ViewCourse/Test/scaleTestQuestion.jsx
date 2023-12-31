import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { Slider, TextField } from '@material-ui/core'
import { answersPropTypes, testQuestionPropType } from './propTypes'

const ScaleTestQuestion = ({
  question, answers, setAnswers, additionalAnswerFields,
}) => {
  const handleAnswerChange = useCallback((newValue) => {
    let newAnswerValue = newValue
    if (parseInt(newValue, 10) > parseInt(question.scale.maxRange, 10)) {
      newAnswerValue = question.scale.maxRange
    } else if (parseInt(newValue, 10) < parseInt(question.scale.minRange, 10)) {
      newAnswerValue = question.scale.minRange
    }

    const newAnswer = {
      ...additionalAnswerFields,
      questionId: question.id,
      questionType: question.questionType,
      answer: newAnswerValue.toString(),
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
  }, [ setAnswers, answers, question, additionalAnswerFields ])

  const getAnswerValue = useCallback(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer) {
      return parseInt(answer.answer, 10)
    }
    return null
  }, [ answers, question.id ])

  const getMarks = useCallback(() => {
    const totalRange = parseInt(question.scale.maxRange, 10) - parseInt(question.scale.minRange, 10)
    const markValue = totalRange / Math.min(10, totalRange)
    const marks = []
    let currentValue = parseInt(question.scale.minRange, 10) + parseInt(markValue, 10)
    while (currentValue < parseInt(question.scale.maxRange, 10)) {
      marks.push({
        value: currentValue,
        label: currentValue,
      })
      currentValue = parseInt(currentValue, 10) + parseInt(markValue, 10)
    }
    return marks
  }, [ question.scale.maxRange, question.scale.minRange ])

  return (
    <div className='display-inline-flex is-fullwidth align-items-center'>
      <Slider
        track={ false }
        valueLabelDisplay={ !_.isNull(getAnswerValue()) ? 'auto' : 'off' }
        classes={ {
          root: 'custom-slider-root',
          thumb: 'custom-slider-thumb',
          track: 'custom-slider-track',
          rail: 'custom-slider-rail',
          valueLabel: 'custom-slider-value-label',
          mark: 'custom-slider-mark',
          markLabel: 'custom-slider-mark-label',
        } }
        onChange={ (e, val) => handleAnswerChange(val) }
        value={ getAnswerValue() }
        min={ parseInt(question.scale.minRange, 10) }
        max={ parseInt(question.scale.maxRange, 10) }
        step={ 1 }
        marks={ getMarks() }
        aria-labelledby='discrete-slider-small-steps'
      />
      <div className='ml-20'>
        <TextField
          type='number'
          margin='dense'
          variant='outlined'
          value={ getAnswerValue() || '' }
          onChange={ (e) => handleAnswerChange(e.target.value) }
          InputProps={ {
            inputProps: {
              min: question.scale.minRange,
              max: question.scale.maxRange,
            },
          } }
        />
      </div>
    </div>
  )
}

ScaleTestQuestion.defaultProps = {
  additionalAnswerFields: {},
}

ScaleTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: answersPropTypes.isRequired,
  setAnswers: PropTypes.func.isRequired,
  additionalAnswerFields: PropTypes.shape({}),
}

export default ScaleTestQuestion
