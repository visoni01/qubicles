import React from 'react'
import PropTypes from 'prop-types'
import { Grid, LinearProgress } from '@material-ui/core'
import { TestDoneIcon } from '../../../../../../assets/images/training'

const TestCompleted = ({
  totalAnswered, totalQuestions,
}) => (
  <div>
    <div className='mb-20'>
      <div className='para bold sz-lg'>
        {`Questions answered ${ totalAnswered }/${ totalQuestions }`}
      </div>
      <div className='mt-10'>
        <LinearProgress
          variant='determinate'
          value={ `${ (totalAnswered * 100) / totalQuestions }` }
          classes={ {
            root: 'progress-root',
            barColorPrimary: 'progress-bar-color',
            colorPrimary: 'progress-color',
          } }
        />
      </div>
    </div>
    <div className='mt-50'>
      <Grid container justify='center' direction='column' spacing={ 3 }>
        <Grid item className='align-self-center'>
          <TestDoneIcon />
        </Grid>
        <Grid item className='align-self-center'>
          <h2 className='h2'>Well Done!</h2>
        </Grid>
        <Grid item className='align-self-center'>
          <p className='para sz-xl text-center ml-30 mr-30'>
            Some of the answers like free text entries may require a manual check from the course creator.
            You will be notified regarding your results within 1-2 working days.
          </p>
        </Grid>
      </Grid>
    </div>
  </div>
)

TestCompleted.propTypes = {
  totalAnswered: PropTypes.number.isRequired,
  totalQuestions: PropTypes.number.isRequired,
}

export default TestCompleted
