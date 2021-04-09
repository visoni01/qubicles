import React, { useState, useCallback } from 'react'
import {
  Grid, TextField, Select,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import MultipleChoiceQuestion from './Questions/multipleChoiceQuestion'
import TestQuestionOptions from './testQuestionOptions'

const TestQuestion = ({ question }) => {
  const [ questionDetails, setQuestionDetails ] = useState(question)

  const handleQuestionTypeChange = useCallback((e) => {
    e.persist()
    setQuestionDetails((current) => ({
      ...current,
      questionType: e.target.value,
    }))
  }, [])

  const handleDeleteQuestion = useCallback(() => {

  }, [])

  const handleSaveQuestion = useCallback(() => {

  }, [])

  return (
    <div className='test-question-section'>
      <div className='border-1 padding-20'>
        <Grid container justify='space-between' spacing={ 3 }>
          <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 8 } xs={ 12 }>
            <p className='para bold'>Your Question</p>
            <TextField
              className='is-fullwidth'
              margin='dense'
              variant='outlined'
              placeholder='Write your question here'
              multiline
            />
          </Grid>
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 12 }>
            <p className='para bold'>Question Type</p>
            <Select
              margin='dense'
              variant='outlined'
              value={ questionDetails.questionType }
              onChange={ handleQuestionTypeChange }
              native
              className='mt-7 is-fullwidth'
              placeholder='Please select question type'
            >
              {[
                'multiple', 'checkbox', 'paragraph', 'text', 'scale', 'date',
              ].map((questionType) => (
                <option key={ questionType } value={ questionType } className='para sz-xl'>
                  {questionType === 'multiple' && 'Multiple Choice'}
                  {questionType === 'checkbox' && 'Checkboxes'}
                  {questionType === 'paragraph' && 'Paragraph'}
                  {questionType === 'text' && 'Textfield'}
                  {questionType === 'scale' && 'Scale'}
                  {questionType === 'date' && 'Date/Time Picker'}
                </option>
              ))}
            </Select>
          </Grid>
          {questionDetails.questionType === 'multiple' && (
          <MultipleChoiceQuestion
            questionDetails={ questionDetails }
            setQuestionDetails={ setQuestionDetails }
          />
          )}
        </Grid>
        <TestQuestionOptions
          handleDeleteQuestion={ handleDeleteQuestion }
          handleSaveQuestion={ handleSaveQuestion }
        />
      </div>
    </div>
  )
}

TestQuestion.propTypes = {
  question: PropTypes.shape({
    id: PropTypes.number.isRequired,
    unitId: PropTypes.number.isRequired,
    questionType: PropTypes.string.isRequired,
    questionText: PropTypes.string.isRequired,
    answerText: PropTypes.string.isRequired,
    options: PropTypes.arrayOf(PropTypes.string).isRequired,
  }).isRequired,
}

export default TestQuestion
