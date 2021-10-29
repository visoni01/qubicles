import React, { useCallback, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { Checkbox, FormControlLabel, FormGroup } from '@material-ui/core'
import _ from 'lodash'
import { answersPropTypes, testQuestionPropType } from './propTypes'

const CheckboxTestQuestion = ({
  question, answers, setAnswers, additionalAnswerFields,
}) => {
  const [ checkboxAnswersArray, setCheckboxAnswersArray ] = useState([])

  useEffect(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer && answer.checkboxAnswers) {
      setCheckboxAnswersArray(answer.checkboxAnswers)
    } else {
      setCheckboxAnswersArray([])
    }
  }, [ answers, question.id ])

  const handleAnswerChange = useCallback((e) => {
    const newAnswer = {
      ...additionalAnswerFields,
      questionId: question.id,
      questionType: question.questionType,
      answer: '',
      checkboxAnswers: [],
    }
    const answerIndex = _.findIndex(answers, [ 'questionId', question.id ])

    if (answerIndex !== -1 && answers[ answerIndex ].checkboxAnswers) {
      if (answers[ answerIndex ].checkboxAnswers.includes(e.target.value)) {
        newAnswer.checkboxAnswers = answers[ answerIndex ].checkboxAnswers.filter((value) => value !== e.target.value)
      } else {
        newAnswer.checkboxAnswers = [ ...answers[ answerIndex ].checkboxAnswers, e.target.value ]
      }
    } else {
      newAnswer.checkboxAnswers = [ e.target.value ]
    }

    if (newAnswer.checkboxAnswers && newAnswer.checkboxAnswers.length === 0) {
      setAnswers((state) => state.filter((answer) => answer.questionId !== newAnswer.questionId))
    } else {
      newAnswer.answer = JSON.stringify(newAnswer.checkboxAnswers)
      if (answerIndex === -1) {
        setAnswers((state) => ([
          ...state,
          newAnswer,
        ]))
      } else {
        setAnswers((state) => ([
          ...state.slice(0, answerIndex),
          newAnswer,
          ...state.slice(answerIndex + 1),
        ]))
      }
    }
  }, [ answers, question.id, question.questionType, setAnswers, additionalAnswerFields ])

  return (
    <FormGroup className='checkboxes'>
      {question.options.map((option) => (
        <div key={ option.id }>
          <FormControlLabel
            value={ option.value }
            label={ option.value }
            control={ (
              <Checkbox
                checked={ checkboxAnswersArray.includes(option.value) }
                onChange={ handleAnswerChange }
              />
            ) }
          />
        </div>
      ))}
    </FormGroup>
  )
}

CheckboxTestQuestion.defaultProps = {
  additionalAnswerFields: {},
}

CheckboxTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: answersPropTypes.isRequired,
  setAnswers: PropTypes.func.isRequired,
  additionalAnswerFields: PropTypes.shape({}),
}

export default CheckboxTestQuestion
