/* eslint-disable complexity */
import React, { useState, useCallback } from 'react'
import {
  Grid, TextField, Select, IconButton,
} from '@material-ui/core'
import PropTypes from 'prop-types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPen } from '@fortawesome/free-solid-svg-icons'
import MultipleChoiceQuestion from './Questions/multipleChoiceQuestion'
import TestQuestionOptions from './testQuestionOptions'
import { deleteQuestionFromTest, saveQuestionInTest, unSaveQuestionInTest } from '../helper'
import CheckboxQuestion from './Questions/checkboxQuestion'
import { testPropType, testQuestionPropType } from '../../propTypes'
import TextQuestion from './Questions/textQuestion'
import ScaleQuestion from './Questions/scaleQuestion'
import DateTimeQuestion from './Questions/dateTimeQuestion'

const TestQuestion = ({ question, testDetails, setTestDetails }) => {
  const [ questionDetails, setQuestionDetails ] = useState(question)

  const handleQuestionTypeChange = useCallback((e) => {
    e.persist()
    setQuestionDetails((current) => ({
      ...current,
      questionType: e.target.value,
      answerText: '',
      correctOption: '',
      scale: {
        minValue: -50, maxValue: 50, correctValue: 0, minRange: -100, maxRange: 100,
      },
      dateTime: {
        date: '',
        time: '',
        isDate: false,
        isTime: false,
      },
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
    const updatedQuestions = unSaveQuestionInTest({ test: testDetails, question: questionDetails })
    setTestDetails((current) => ({
      ...current,
      questions: updatedQuestions,
    }))
    setQuestionDetails((current) => ({ ...current, isSaved: false }))
  }, [ setTestDetails, testDetails, questionDetails ])

  const handleDeleteQuestion = useCallback(() => {
    const updatedQuestions = deleteQuestionFromTest({ test: testDetails, question })
    setTestDetails((current) => ({
      ...current,
      questions: updatedQuestions,
    }))
  }, [ setTestDetails, testDetails, question ])

  const handleSaveQuestion = useCallback(() => {
    const updatedQuestions = saveQuestionInTest({ test: testDetails, question: questionDetails })
    setTestDetails((current) => ({
      ...current,
      questions: updatedQuestions,
    }))
    setQuestionDetails((current) => ({ ...current, isSaved: true }))
  }, [ setTestDetails, testDetails, questionDetails ])

  return (
    <div className='test-question-section mb-20'>
      <div className='border-1 pt-10 pb-20 pl-20 pr-20'>
        <Grid container spacing={ 3 } alignItems='flex-start'>
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

          {/* Checkbox question */}
          {questionDetails.questionType === 'checkbox' && (
          <CheckboxQuestion
            questionDetails={ questionDetails }
            setQuestionDetails={ setQuestionDetails }
          />
          )}

          {/* Text type question */}
          { [ 'paragraph', 'text' ].includes(questionDetails.questionType) && (
          <TextQuestion
            questionDetails={ questionDetails }
            setQuestionDetails={ setQuestionDetails }
          />
          )}

          {/* Scale question */}
          {questionDetails.questionType === 'scale' && (
          <ScaleQuestion
            questionDetails={ questionDetails }
            setQuestionDetails={ setQuestionDetails }
          />
          )}

          {/* Date Time question */}
          {questionDetails.questionType === 'date' && (
          <DateTimeQuestion
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
  question: testQuestionPropType.isRequired,
  testDetails: testPropType.isRequired,
  setTestDetails: PropTypes.func.isRequired,
}

export default TestQuestion
