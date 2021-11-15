import { Divider, Grid, LinearProgress } from '@material-ui/core'
import React from 'react'
import { questions } from './testData'
import TestQuestionWithResult from './testQuestionWithResult'
import './styles.scss'

const TestResult = () => (
  <>
    <Grid container spacing={ 2 } justify='space-between' className='test-result-header mt-10'>
      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 4 } xl={ 4 }>
        <div className='is-flex result-inner'>
          <h4 className='h4'> Examiner Name </h4>
          <p className='para light pl-10'> James Decker </p>
        </div>
        <div className='is-flex result-inner mt-7'>
          <h4 className='h4'>  Grading Date  </h4>
          <p className='para light pl-10'>  02/17/21 03:42pm  </p>
        </div>
      </Grid>

      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 2 } xl={ 2 }>
        <div className='is-flex result-inner'>
          <h4 className='h4'> Result </h4>
          <p className='para light pl-10'> Passed </p>
        </div>
      </Grid>

      <Grid item xs={ 6 } sm={ 6 } md={ 6 } lg={ 4 } xl={ 4 }>
        <div className='is-flex is-between'>
          <h4 className='h4'> Total Correct Answers </h4>
          <p className='para light pl-10'> 5/10 </p>
        </div>
        <div className='mt-7'>
          <LinearProgress
            variant='determinate'
            value={ (5 * 100) / 10 }
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

    {questions?.map((question, index) => (
      <div key={ question.id }>
        <h3 className='h3 mt-30'>{`Question ${ index + 1 }`}</h3>
        <TestQuestionWithResult question={ question } />
      </div>
    ))}
  </>
)

export default TestResult
