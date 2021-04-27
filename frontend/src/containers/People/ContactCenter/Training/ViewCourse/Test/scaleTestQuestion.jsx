import React from 'react'
import { Slider } from '@material-ui/core'
import { testQuestionPropType } from './testQuestionPropType'

const ScaleTestQuestion = ({
  question,
}) => (
  <Slider
    value={ [ question.scale.minRange, question.scale.maxRange ] }
    min={ question.scale.minRange }
    max={ question.scale.maxRange }
    valueLabelDisplay='auto'
    aria-labelledby='range-slider'
    classes={ {
      root: 'custom-slider-root',
      thumb: 'custom-slider-thumb',
    } }
  />
)

ScaleTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
}

export default ScaleTestQuestion
