import React from 'react'
import { FormControlLabel, Radio, RadioGroup } from '@material-ui/core'
import PropTypes from 'prop-types'
import _ from 'lodash'
import { optionPropType, optionsPropType } from '../propTypes'
import './styles.scss'

const MultipleChoiceQuestionWithResult = ({
  options, correctOption, isCorrect, userAnswer,
}) => (
  <RadioGroup
    className='radio-buttons ml-5'
    defaultValue={ options.find((option) => _.isEqual(option.id, (isCorrect ? correctOption : userAnswer)))?.value }
  >
    {options.map((option) => (
      <div key={ option.id }>
        <FormControlLabel
          disabled
          label={ option.value }
          value={
            !isCorrect && _.isEqual(option.id, correctOption)
              ? options.find((item) => item.id === userAnswer)?.value
              : option.value
          }
          control={ (
            <Radio
              className={ `
                ${ _.isEqual(option.id, correctOption) ? 'correct-answer' : '' }
                ${ !isCorrect && _.isEqual(option.id, userAnswer) ? 'wrong-answer' : '' }
              ` }
            />
          ) }
        />
      </div>
    ))}
  </RadioGroup>
)

MultipleChoiceQuestionWithResult.propTypes = {
  options: optionsPropType.isRequired,
  correctOption: PropTypes.number.isRequired,
  isCorrect: PropTypes.bool.isRequired,
  userAnswer: optionPropType.isRequired,
}

export default MultipleChoiceQuestionWithResult
