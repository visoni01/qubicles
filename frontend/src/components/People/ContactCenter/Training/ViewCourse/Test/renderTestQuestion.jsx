import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import CheckboxTestQuestion from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/checkboxTestQuestion'
import MultipleChoiceTestQuestion from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/multipleChoiceTestQuestion'
import TextTestQuestion from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/textTestQuestion'
import { testQuestionPropType } from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/propTypes'
import DateTimeTestQuestion from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/dateTimeTestQuestion'
import ScaleTestQuestion from
  '../../../../../../containers/People/ContactCenter/Training/ViewCourse/Test/scaleTestQuestion'

const TestQuestion = ({
  question, answers, setAnswers, additionalAnswerFields,
}) => (
  <div className='test-question-section mb-20'>
    <div className='border-1 question-border pt-10 pb-20 pl-20 pr-20'>
      <Grid container justify='space-between' spacing={ 1 } alignItems='flex-start'>

        {/* Question text */}
        <Grid item xl={ 11 } lg={ 11 } md={ 11 } sm={ 11 } xs={ 11 }>
          <p className='para bold sz-lg mt-10 p-word-break'>{`${ question.questionText }`}</p>
        </Grid>

        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>

          {/* Multiple Choice question */}
          {question.questionType === 'multiple' && (
            <MultipleChoiceTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
              additionalAnswerFields={ additionalAnswerFields }
            />
          )}

          {/* Checkbox question */}
          {question.questionType === 'checkbox' && (
            <CheckboxTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
              additionalAnswerFields={ additionalAnswerFields }
            />
          )}

          {/* Text type question */}
          { [ 'paragraph', 'text' ].includes(question.questionType) && (
            <TextTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
              additionalAnswerFields={ additionalAnswerFields }
            />
          )}

          {/* Date Time question */}
          { question.questionType === 'date' && (
            <DateTimeTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
              additionalAnswerFields={ additionalAnswerFields }
            />
          )}

          {/* Scale question */}
          {question.questionType === 'scale' && (
            <ScaleTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
              additionalAnswerFields={ additionalAnswerFields }
            />
          )}
        </Grid>
      </Grid>
    </div>
  </div>
)

TestQuestion.defaultProps = {
  additionalAnswerFields: {},
}

TestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
  additionalAnswerFields: PropTypes.shape({}),
}

export default TestQuestion
