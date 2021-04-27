import React from 'react'
import {
  Checkbox,
  FormControlLabel, FormGroup,
} from '@material-ui/core'
import { testQuestionPropType } from './testQuestionPropType'

const CheckboxTestQuestion = ({
  question,
}) => (
  <FormGroup
    className='checkboxes'
  >
    {question.options.map((option) => (
      <div key={ option.id } className='answer-radio'>
        <FormControlLabel
          value={ option.value }
          label={ option.value }
          control={ (
            <Checkbox />
          ) }
        />
      </div>
    ))}
  </FormGroup>
)

CheckboxTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
}

export default CheckboxTestQuestion
