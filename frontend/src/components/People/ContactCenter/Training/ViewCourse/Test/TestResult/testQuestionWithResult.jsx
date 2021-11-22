import { Card, CardContent } from '@material-ui/core'
import _ from 'lodash'
import React from 'react'
import { testQuestionWithResultPropType } from './propTypes'
import CheckBoxQuestionWithResult from './Questions/checkBoxQuestionWithResult'
import MultipleChoiceQuestionWithResult from './Questions/multipleChoiceQuestionWithResult'
import TextQuestionWithResult from './Questions/textQuestionWithResult'
import ScaleQuestionWithResult from './Questions/scaleQuestionWithResult'
import DateTimeQuestionWithResult from './Questions/dateTimeQuestionWithResult'

// eslint-disable-next-line complexity
const TestQuestionWithResult = ({ question }) => (
  <Card
    variant='outlined'
    className='mt-10 pl-5'
    classes={ {
      root: `answer-card-root
        ${ (question.isCorrect && 'correct-answer')
        || (question.isCorrect === false && 'incorrect-answer')
        || (question.isCorrect === null && '') }`,
    } }
  >
    <CardContent>
      <p className='para bold mb-5'>{question.questionText}</p>

      {_.isEqual(question.questionType, 'multiple') && (
        <MultipleChoiceQuestionWithResult
          options={ question.options }
          isCorrect={ question.isCorrect }
          correctOption={ question.correctOption }
          userAnswer={ question.userAnswer }
        />
      )}

      {_.isEqual(question.questionType, 'checkbox') && (
        <CheckBoxQuestionWithResult
          options={ question.options }
          isCorrect={ question.isCorrect }
          correctOptions={ question.correctOptions }
          userOptions={ question.userOptions }
        />
      )}

      {[ 'paragraph', 'text' ].includes(question.questionType) && (
        <TextQuestionWithResult
          isCorrect={ question.isCorrect }
          answerText={ question.answerText }
          userAnswer={ question.userAnswer }
        />
      )}

      {question.questionType === 'scale' && (
        <ScaleQuestionWithResult
          isCorrect={ question.isCorrect }
          answerText={ question.answerText }
          userAnswer={ question.userAnswer }
          scale={ question.scale }
        />
      )}

      {question.questionType === 'date' && (
        <DateTimeQuestionWithResult
          isCorrect={ question.isCorrect }
          answerText={ question.answerText && JSON.parse(question.answerText) }
          userAnswer={ question.userAnswer && JSON.parse(question.userAnswer) }
        />
      )}
    </CardContent>
  </Card>
)

TestQuestionWithResult.propTypes = {
  question: testQuestionWithResultPropType.isRequired,
}

export default TestQuestionWithResult
