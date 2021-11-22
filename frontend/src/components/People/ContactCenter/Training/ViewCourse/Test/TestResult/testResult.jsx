import React from 'react'
import { Divider, Grid, LinearProgress } from '@material-ui/core'
import PropTypes from 'prop-types'
import TestQuestionWithResult from './testQuestionWithResult'
import { testQuestionWithResultPropType } from './propTypes'
import { formatDate } from '../../../../../../../utils/common'
import './styles.scss'

const TestResult = ({ testResult, creatorName }) => (
  <>
    <Grid container spacing={ 2 } justify='space-between' className='test-result-header mt-10'>
      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 4 } xl={ 4 } className='test-result-inner'>
        <div className='is-flex result-inner'>
          <h4 className='h4'> Examiner Name </h4>
          <p className='para light pl-10'>{creatorName}</p>
        </div>
        <div className='is-flex result-inner mt-7'>
          <h4 className='h4'>  Grading Date  </h4>
          <p className='para light pl-10'>
            {testResult.gradingDate && formatDate(testResult.gradingDate, 'MM-DD-YY hh:mm A')}
          </p>
        </div>
      </Grid>

      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 2 } xl={ 2 }>
        <div className='is-flex result-inner'>
          <h4 className='h4'> Result </h4>
          <p className='para light pl-10'>{testResult.result}</p>
        </div>
      </Grid>

      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 4 } xl={ 4 }>
        <div className='is-flex is-between'>
          <h4 className='h4'> Total Correct Answers </h4>
          <p className='para light pl-10'>
            {`${ testResult.correctAnswers }/${ testResult.questions?.length }`}
          </p>
        </div>
        <div className='mt-7'>
          <LinearProgress
            variant='determinate'
            value={ (testResult.correctAnswers * 100) / testResult.questions?.length }
            classes={ {
              root: 'progress-root',
              barColorPrimary: 'progress-bar-color',
              colorPrimary: 'progress-color',
            } }
          />
        </div>
      </Grid>
    </Grid>

    <Divider className='divider mti-20' />

    {testResult.questions?.map((question, index) => (
      <div key={ question.id }>
        <h3 className='h3 mt-30'>{`Question ${ index + 1 }`}</h3>
        <TestQuestionWithResult question={ question } />
      </div>
    ))}
  </>
)

TestResult.propTypes = {
  testResult: PropTypes.shape({
    gradingDate: PropTypes.string.isRequired,
    result: PropTypes.string.isRequired,
    correctAnswers: PropTypes.number.isRequired,
    questions: testQuestionWithResultPropType.isRequired,
  }).isRequired,
  creatorName: PropTypes.string.isRequired,
}

export default TestResult
