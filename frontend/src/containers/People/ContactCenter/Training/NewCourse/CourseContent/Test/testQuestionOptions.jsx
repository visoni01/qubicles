import React from 'react'
import { Button } from '@material-ui/core'

const TestQuestionOptions = () => (
  <div className='display-inline-flex is-fullwidth justify-center'>
    <div className='margin-10'>
      <Button
        className='mr-20'
        classes={ {
          root: 'button-secondary-small-red',
          label: 'button-secondary-small-label',
        } }
      >
        Delete Question
      </Button>
    </div>
    <div className='margin-10'>
      <Button
        classes={ {
          root: 'button-secondary-small',
          label: 'button-secondary-small-label',
        } }
      >
        Save Question
      </Button>
    </div>

  </div>
)

export default TestQuestionOptions
