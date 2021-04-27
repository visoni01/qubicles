import React from 'react'
import {
  RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core'
import { testQuestionPropType } from './testQuestionPropType'

const MultipleChoiceTestQuestion = ({
  question,
}) => (
  <RadioGroup
    className='radio-buttons'
  >
    {question.options.map((option) => (
      <div key={ option.id } className='answer-radio'>
        <FormControlLabel value={ option.value } label={ option.value } control={ <Radio /> } />
      </div>
    ))}
  </RadioGroup>
)

MultipleChoiceTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
}

export default MultipleChoiceTestQuestion
