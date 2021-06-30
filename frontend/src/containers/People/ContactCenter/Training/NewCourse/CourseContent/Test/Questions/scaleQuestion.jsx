import React, { useCallback } from 'react'
import {
  Grid, TextField, Slider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { testQuestionPropType } from '../../../propTypes'

// eslint-disable-next-line complexity
const ScaleQuestion = ({
  questionDetails, setQuestionDetails,
}) => {
  const handleAnswerChange = useCallback((newValue) => {
    setQuestionDetails((current) => ({
      ...current,
      answerText: newValue.toString(),
    }))
  }, [ setQuestionDetails ])

  const setScaleRange = useCallback(({ newValue, type }) => {
    setQuestionDetails((current) => {
      let newScale = current.scale
      if (type === 'min') {
        newScale = { ...newScale, minRange: newValue }
      }
      if (type === 'max') {
        newScale = { ...newScale, maxRange: newValue }
      }
      return ({
        ...current,
        scale: newScale,
      })
    })
  }, [ setQuestionDetails ])

  const getMarks = useCallback(() => {
    const totalRange = parseInt(questionDetails.scale.maxRange, 10) - parseInt(questionDetails.scale.minRange, 10)
    const markValue = totalRange / Math.min(10, totalRange)
    const marks = []
    let currentValue = parseInt(questionDetails.scale.minRange, 10) + parseInt(markValue, 10)
    while (currentValue < parseInt(questionDetails.scale.maxRange, 10)) {
      marks.push({
        value: currentValue,
        label: currentValue,
      })
      currentValue = parseInt(currentValue, 10) + parseInt(markValue, 10)
    }
    return marks
  }, [ questionDetails.scale.maxRange, questionDetails.scale.minRange ])

  if (questionDetails.isSaved) {
    return (
      <div className='ml-10 pb-10 is-halfwidth'>
        <Slider
          track={ false }
          valueLabelDisplay='auto'
          classes={ {
            root: 'custom-slider-root',
            thumb: 'custom-slider-thumb',
            track: 'custom-slider-track',
            rail: 'custom-slider-rail',
            valueLabel: 'custom-slider-value-label',
            mark: 'custom-slider-mark',
            markLabel: 'custom-slider-mark-label',
          } }
          value={ !_.isEmpty(questionDetails.answerText) ? parseInt(questionDetails.answerText, 10) : null }
          min={ !_.isEmpty(questionDetails.scale.minRange) ? parseInt(questionDetails.scale.minRange, 10) : null }
          max={ !_.isEmpty(questionDetails.scale.maxRange) ? parseInt(questionDetails.scale.maxRange, 10) : null }
          step={ 1 }
          marks={ getMarks() }
          aria-labelledby='discrete-slider-small-steps'
        />
      </div>
    )
  }

  return (
    <>
      <Grid container item xl={ 8 } lg={ 8 } md={ 8 } sm={ 8 } xs={ 8 } justify='space-between'>
        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
          <p className='para light mb-10'>
            Please specify the range and set the correct number below
          </p>
          <p className='para bold'>Scale</p>
          <Slider
            track={ false }
            value={ !_.isEmpty(questionDetails.answerText) ? parseInt(questionDetails.answerText, 10) : null }
            min={ !_.isEmpty(questionDetails.scale.minRange) ? parseInt(questionDetails.scale.minRange, 10) : null }
            max={ !_.isEmpty(questionDetails.scale.maxRange) ? parseInt(questionDetails.scale.maxRange, 10) : null }
            step={ 1 }
            marks={ getMarks() }
            aria-labelledby='discrete-slider-small-steps'
            onChange={ (e, val) => handleAnswerChange(val) }
            valueLabelDisplay='auto'
            classes={ {
              root: 'custom-slider-root',
              thumb: 'custom-slider-thumb',
              track: 'custom-slider-track',
              rail: 'custom-slider-rail',
              valueLabel: 'custom-slider-value-label',
              mark: 'custom-slider-mark',
              markLabel: 'custom-slider-mark-label',
            } }
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 6 }>
          <TextField
            type='number'
            placeholder='Min Value'
            margin='dense'
            variant='outlined'
            value={ !_.isEmpty(questionDetails.scale.minRange) ? parseInt(questionDetails.scale.minRange, 10) : '' }
            onChange={ (e) => setScaleRange({ newValue: e.target.value, type: 'min' }) }
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 6 }>
          <TextField
            type='number'
            placeholder='Max Value'
            margin='dense'
            variant='outlined'
            value={ !_.isEmpty(questionDetails.scale.maxRange) ? parseInt(questionDetails.scale.maxRange, 10) : '' }
            onChange={ (e) => setScaleRange({ newValue: e.target.value, type: 'max' }) }
          />
        </Grid>

      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 4 }>
        <p className='para bold'>Right Answer</p>
        <TextField
          type='number'
          margin='dense'
          variant='outlined'
          value={ !_.isEmpty(questionDetails.answerText) ? parseInt(questionDetails.answerText, 10) : '' }
          onChange={ (e) => handleAnswerChange(e.target.value) }
          InputProps={ {
            inputProps: {
              min: questionDetails.scale.minRange,
              max: questionDetails.scale.maxRange,
            },
          } }
        />
      </Grid>
    </>
  )
}

ScaleQuestion.propTypes = {
  questionDetails: testQuestionPropType.isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
}

export default ScaleQuestion
