import { Grid } from '@material-ui/core'
import React from 'react'
import PropTypes from 'prop-types'
import CheckboxTestQuestion from './checkboxTestQuestion'
import MultipleChoiceTestQuestion from './multipleChoiceTestQuestion'
import TextTestQuestion from './textTestQuestion'
import testQuestionPropType from './testQuestionPropType'
// WIP Scale Question
// import ScaleTestQuestion from './scaleTestQuestion'

const TestQuestion = ({
  question, answers, setAnswers,
}) => (
  <div className='test-question-section mb-20'>
    <div className='border-1 question-border pt-10 pb-20 pl-20 pr-20'>
      <Grid container justify='space-between' spacing={ 1 } alignItems='flex-start'>

        {/* Question text */}
        <Grid item xl={ 11 } lg={ 11 } md={ 11 } sm={ 11 } xs={ 11 }>
          <p className='para bold sz-lg mt-10'>{`${ question.questionText }`}</p>
        </Grid>

        <Grid item xl={ 12 } lg={ 12 } md={ 12 } sm={ 12 } xs={ 12 }>

          {/* Multiple Choice question */}
          {question.questionType === 'multiple' && (
            <MultipleChoiceTestQuestion
              question={ question }
              answers={ answers }
              setAnswers={ setAnswers }
            />
          )}

          {/* Checkbox question */}
          {question.questionType === 'checkbox' && (
          <CheckboxTestQuestion
            question={ question }
            answers={ answers }
            setAnswers={ setAnswers }
          />
          )}

          {/* Text type question */}
          { [ 'paragraph', 'text' ].includes(question.questionType) && (
          <TextTestQuestion
            question={ question }
            answers={ answers }
            setAnswers={ setAnswers }
          />
          )}

          {/* Scale question */}
          {/* WIP Scale Question */}
          {/* {question.questionType === 'scale' && (
          <ScaleTestQuestion
            question={ question }
            answers={ answers }
            setAnswers={ setAnswers }
          />
          )} */}
        </Grid>

      </Grid>
    </div>
  </div>
)

TestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
  answers: PropTypes.arrayOf(PropTypes.any).isRequired,
  setAnswers: PropTypes.func.isRequired,
}

export default TestQuestion
