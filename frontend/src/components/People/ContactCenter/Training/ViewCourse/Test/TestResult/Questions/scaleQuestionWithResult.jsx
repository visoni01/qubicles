import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import { Slider } from '@material-ui/core'
import { scalePropType } from '../propTypes'
import './styles.scss'

const ScaleQuestionWithResult = ({
  isCorrect, answerText, userAnswer, scale,
}) => {
  const getMarks = useCallback(() => {
    const totalRange = scale.maxRange - scale.minRange
    const markValue = totalRange / Math.min(10, totalRange)
    const marks = []
    let currentValue = scale.minRange + markValue
    while (currentValue < scale.maxRange) {
      marks.push({
        value: currentValue,
        label: currentValue,
      })
      currentValue += markValue
    }
    return marks
  }, [ scale.maxRange, scale.minRange ])

  return (
    <Slider
      disabled
      track={ false }
      valueLabelDisplay='auto'
      classes={ {
        root: `custom-slider-root ${ isCorrect ? 'correct-parent' : 'wrong-parent' }`, // WIP
        thumb: `custom-slider-thumb ${ isCorrect ? 'correct-answer-color' : 'wrong-answer-color' }`,
        track: 'custom-slider-track',
        rail: 'custom-slider-rail',
        valueLabel: 'custom-slider-value-label',
        mark: 'custom-slider-mark',
        markLabel: 'custom-slider-mark-label',
      } }
      className='ml-5'
      value={ isCorrect ? userAnswer : [ userAnswer, answerText ] }
      min={ scale.minRange }
      max={ scale.maxRange }
      step={ 1 }
      marks={ getMarks() }
      aria-labelledby='discrete-slider-small-steps'
    />
  )
}

ScaleQuestionWithResult.propTypes = {
  isCorrect: PropTypes.bool.isRequired,
  answerText: PropTypes.string.isRequired,
  userAnswer: PropTypes.string.isRequired,
  scale: scalePropType.isRequired,
}

export default ScaleQuestionWithResult
