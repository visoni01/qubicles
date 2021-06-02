import React, { useCallback } from 'react'
import PropTypes from 'prop-types'
import _ from 'lodash'
import {
  RadioGroup, FormControlLabel, Radio,
} from '@material-ui/core'
import { answersPropTypes, testQuestionPropType } from './propTypes'

const MultipleChoiceTestQuestion = ({
  question, answers, setAnswers, additionalAnswerFields,
}) => {
  const handleAnswerChange = useCallback((e) => {
    const newAnswer = {
      ...additionalAnswerFields,
      questionId: question.id,
      questionType: question.questionType,
      answer: e.target.value,
    }
    const answerIndex = _.findIndex(answers, [ 'questionId', question.id ])
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
  }, [ answers, question.id, question.questionType, setAnswers, additionalAnswerFields ])

  const getAnswerValue = useCallback(() => {
    const answer = _.find(answers, [ 'questionId', question.id ])
    if (answer) {
      return answer.answer
    }
    return ''
  }, [ answers, question.id ])

  return (
    <RadioGroup
      className='radio-buttons'
      value={ getAnswerValue() }
      onChange={ handleAnswerChange }
    >
      {question.options.map((option) => (
        <div key={ option.id }>
          <FormControlLabel value={ option.value } label={ option.value } control={ <Radio /> } />
        </div>
      ))}
    </RadioGroup>
  )
}

MultipleChoiceTestQuestion.defaultProps = {
  additionalAnswerFields: {},
}

MultipleChoiceTestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: answersPropTypes.isRequired,
  setAnswers: PropTypes.func.isRequired,
  additionalAnswerFields: PropTypes.shape({}),
}

export default MultipleChoiceTestQuestion
