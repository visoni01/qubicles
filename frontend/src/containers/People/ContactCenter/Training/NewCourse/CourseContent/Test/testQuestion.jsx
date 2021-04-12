import React, { useState, useCallback } from 'react'
import {
  Grid, TextField, Select, IconButton,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import MultipleChoiceQuestion from './Questions/multipleChoiceQuestion'
import TestQuestionOptions from './testQuestionOptions'
import { deleteQuestionFromTest, saveQuestionInTest } from '../helper'

const TestQuestion = ({ question, unitDetails, setUnitDetails }) => {
  const [ questionDetails, setQuestionDetails ] = useState(question)

  const handleQuestionTypeChange = useCallback((e) => {
    e.persist()
    setQuestionDetails((current) => ({
      ...current,
      questionType: e.target.value,
    }))
  }, [ ])

  const handleQuestionTextChange = useCallback((e) => {
    e.persist()
    setQuestionDetails((current) => ({
      ...current,
      questionText: e.target.value,
    }))
  }, [ ])

  const handleEditQuestion = useCallback(() => {
    setQuestionDetails((current) => ({
      ...current,
      isSaved: false,
    }))
  }, [ ])

  const handleDeleteQuestion = useCallback(() => {
    const updatedQuestions = deleteQuestionFromTest({ unit: unitDetails, question })
    setUnitDetails((current) => ({
      ...current,
      questions: updatedQuestions,
    }))
  }, [ setUnitDetails, unitDetails, question ])

  const handleSaveQuestion = useCallback(() => {
    const updatedQuestions = saveQuestionInTest({ unit: unitDetails, question: questionDetails })
    setUnitDetails((current) => ({
      ...current,
      questions: updatedQuestions,
    }))
    setQuestionDetails((current) => ({ ...current, isSaved: true }))
  }, [ setUnitDetails, unitDetails, questionDetails ])

  return (
    <div className='test-question-section mb-20'>
      <div className='border-1 pt-10 pb-20 pl-20 pr-20'>
        <Grid container justify='space-between' spacing={ 3 } alignItems='flex-start'>
          {/* Question Text */}
          {!questionDetails.isSaved && (
          <Grid item xl={ 8 } lg={ 8 } md={ 8 } sm={ 8 } xs={ 12 }>
            <p className='para bold mt-10'>Your Question</p>
            <TextField
              className='is-fullwidth'
              margin='dense'
              variant='outlined'
              placeholder='Write your question here'
              multiline
              value={ questionDetails.questionText }
              onChange={ (e) => handleQuestionTextChange(e) }
            />
          </Grid>
          )}

          {/* Question Type */}
          {!questionDetails.isSaved && (
          <Grid item xl={ 4 } lg={ 4 } md={ 4 } sm={ 4 } xs={ 12 }>
            <p className='para bold mt-10'>Question Type</p>
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
          )}

          {/* Question text on saved */}
          {questionDetails.isSaved && (
          <Grid item xl={ 11 } lg={ 11 } md={ 11 } sm={ 11 } xs={ 11 }>
            <p className='para bold sz-lg mt-10'>{`${ question.questionText }`}</p>
          </Grid>
          )}

          {/* Question text on saved */}
          {questionDetails.isSaved && (
          <Grid item xl={ 1 } lg={ 1 } md={ 1 } sm={ 1 } xs={ 1 }>
            <IconButton
              onClick={ handleEditQuestion }
              classes={ {
                root: 'pt-5 pb-5 pl-5 pr-5',
              } }
            >
              <FontAwesomeIcon
                icon={ faPen }
                className='custom-fa-icon sz-sm'
              />
            </IconButton>
          </Grid>
          )}

          {/* Multiple Choice question */}
          {questionDetails.questionType === 'multiple' && (
          <MultipleChoiceQuestion
            questionDetails={ questionDetails }
            setQuestionDetails={ setQuestionDetails }
          />
          )}

        </Grid>
        {!questionDetails.isSaved && (
        <TestQuestionOptions
          questionDetails={ questionDetails }
          handleDeleteQuestion={ handleDeleteQuestion }
          handleSaveQuestion={ handleSaveQuestion }
        />
        )}
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
  unitDetails: PropTypes.shape({
    unitId: PropTypes.number.isRequired,
    title: PropTypes.string.isRequired,
    unitNum: PropTypes.string.isRequired,
    sectionId: PropTypes.number.isRequired,
    questions: PropTypes.arrayOf(PropTypes.any).isRequired,
    length: PropTypes.number.isRequired,
    isEmpty: PropTypes.bool.isRequired,
  }).isRequired,
  setUnitDetails: PropTypes.func.isRequired,
}

export default TestQuestion
