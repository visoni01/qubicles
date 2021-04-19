import React, { useCallback } from 'react'
import {
  Grid, TextField, Slider,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { testQuestionPropType } from '../../../propTypes'

const ScaleQuestion = ({
  questionDetails, setQuestionDetails,
}) => {
  const setScaleRange = useCallback((event, newValue) => {
    setQuestionDetails((current) => ({
      ...current,
      scale: { ...current.scale, minValue: newValue[ 0 ], maxValue: newValue[ 1 ] },
    }))
  }, [ setQuestionDetails ])

  const setScaleValue = useCallback(({ newValue, type }) => {
    setQuestionDetails((current) => {
      let newScale = current.scale
      if (type === 'min') {
        newScale = { ...newScale, minValue: parseInt(newValue, 10) }
      }
      if (type === 'max') {
        newScale = { ...newScale, maxValue: parseInt(newValue, 10) }
      }
      if (type === 'correct') {
        newScale = { ...newScale, correctValue: parseInt(newValue, 10) }
      }
      return ({
        ...current,
        scale: newScale,
      })
    })
  }, [ setQuestionDetails ])

  if (questionDetails.isSaved) {
    return (
      <div className='ml-10 pb-10 is-halfwidth'>
        <Slider
          valueLabelDisplay='auto'
          aria-labelledby='range-slider'
          classes={ {
            root: 'custom-slider-root',
            thumb: 'custom-slider-thumb',
          } }
          defaultValue={ [ -50, 50 ] }
          min={ questionDetails.scale.minRange }
          max={ questionDetails.scale.maxRange }
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
            value={ [ questionDetails.scale.minValue, questionDetails.scale.maxValue ] }
            min={ questionDetails.scale.minRange }
            max={ questionDetails.scale.maxRange }
            onChange={ setScaleRange }
            valueLabelDisplay='auto'
            aria-labelledby='range-slider'
            classes={ {
              root: 'custom-slider-root',
              thumb: 'custom-slider-thumb',
            } }
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 6 }>
          <TextField
            type='number'
            placeholder='Min Value'
            margin='dense'
            variant='outlined'
            value={ questionDetails.scale.minValue }
            onChange={ (e) => setScaleValue({ newValue: e.target.value, type: 'min' }) }
          />
        </Grid>
        <Grid item xl={ 6 } lg={ 6 } md={ 6 } sm={ 6 } xs={ 6 }>
          <TextField
            type='number'
            placeholder='Max Value'
            margin='dense'
            variant='outlined'
            value={ questionDetails.scale.maxValue }
            onChange={ (e) => setScaleValue({ newValue: e.target.value, type: 'max' }) }
          />
        </Grid>

      </Grid>
      <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 4 }>
        <p className='para bold'>Right Answer</p>
        <TextField
          type='number'
          margin='dense'
          variant='outlined'
          value={ questionDetails.scale.correctValue }
          onChange={ (e) => setScaleValue({ newValue: e.target.value, type: 'correct' }) }
          InputProps={ {
            inputProps: {
              min: questionDetails.scale.minValue,
              max: questionDetails.scale.maxValue,
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
