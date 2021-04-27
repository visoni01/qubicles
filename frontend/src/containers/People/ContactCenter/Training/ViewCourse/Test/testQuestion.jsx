import { Grid } from '@material-ui/core'
import React from 'react'
import CheckboxTestQuestion from './checkboxTestQuestion'
import MultipleChoiceTestQuestion from './multipleChoiceTestQuestion'
import ScaleTestQuestion from './scaleTestQuestion'
import { testQuestionPropType } from './testQuestionPropType'
import TextTestQuestion from './textTestQuestion'

const TestQuestion = ({ question }) => (
  <div className='test-question-section mb-20'>
    <div className='border-1 pt-10 pb-20 pl-20 pr-20'>
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
            />
          )}

          {/* Checkbox question */}
          {question.questionType === 'checkbox' && (
          <CheckboxTestQuestion
            question={ question }
          />
          )}

          {/* Text type question */}
          { [ 'paragraph', 'text' ].includes(question.questionType) && (
          <TextTestQuestion
            question={ question }
          />
          )}

          {/* Scale question */}
          {question.questionType === 'scale' && (
          <ScaleTestQuestion
            question={ question }
          />
          )}
        </Grid>

      </Grid>
    </div>
  </div>
)

TestQuestion.propTypes = {
  question: testQuestionPropType.isRequired,
}

export default TestQuestion
