import React from 'react'
import { Grid, TextField } from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { testQuestionPropType } from '../../../propTypes'

const TextQuestion = ({ questionDetails, setQuestionDetails }) => {
  if (questionDetails.isSaved) {
    return (
      <div className='ml-10 pb-10'>
        <FontAwesomeIcon icon={ faArrowRight } />
        <span className='ml-10 para sz-lg'>{questionDetails.answerText}</span>
      </div>
    )
  }

  const handleAnswerChange = (e) => {
    e.persist()
    setQuestionDetails((current) => ({ ...current, answerText: e.target.value }))
  }

  return (
    <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>
      <p className='para bold'>
        {questionDetails.questionType === 'paragraph' && 'Paragraph'}
        {questionDetails.questionType === 'text' && 'TextField'}
      </p>
      <TextField
        className={ `${ questionDetails.questionType === 'paragraph' ? 'is-fullwidth' : '' }` }
        margin='dense'
        variant='outlined'
        multiline={ questionDetails.questionType === 'paragraph' }
        rows={ 6 }
        value={ questionDetails.answerText }
        onChange={ (e) => handleAnswerChange(e) }
        placeholder={ `${ questionDetails.questionType === 'text'
          ? 'Short Textfield Answer'
          : 'Test participants will have this text field to give an answer' }` }
      />
    </Grid>
  )
}

TextQuestion.propTypes = {
  questionDetails: testQuestionPropType.isRequired,
  setQuestionDetails: PropTypes.func.isRequired,
}

export default TextQuestion
