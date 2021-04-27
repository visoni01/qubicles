import React from 'react'
import { TextField } from '@material-ui/core'
import { testQuestionPropType } from './testQuestionPropType'

const TextTestQuestion = ({
  question,
}) => (
  <TextField
    className={ `${ question.questionType === 'paragraph' ? 'is-fullwidth' : '' }` }
    margin='dense'
    variant='outlined'
    multiline={ question.questionType === 'paragraph' }
    rows={ 6 }
  />
)

TextTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
}

export default TextTestQuestion
